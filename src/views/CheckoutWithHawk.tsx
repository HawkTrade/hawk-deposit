import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { ChevronDown, Info } from "@/components/icons/LucideReact";
import { Keypad } from "@/components/Keypad";
import { PNButton } from "@/components/ui/button";
import { CURRENCY_CONFIG, getDeviceType, PAYMENT_OPTIONS, PRESET_AMOUNTS, USDC_PRICE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Currency } from "@/lib/constants";
import type { ComponentType, Dispatch, SetStateAction } from "react";
import { createElement, useState } from "react";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  amount: string;
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
  handleKeyPress: (key: string) => void;
  handleDelete: () => void;
  handlePresetClick: (val: number) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
}

export default function CheckoutWithHawkView({ amount, currency, loading, ...handlers }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const { handleKeyPress, handleDelete, handlePresetClick, handleSubmit, setCurrency } = handlers;

  const parsedAmount = parseFloat(amount) || 0;
  const deviceType = getDeviceType();

  const estimatedOutput = parsedAmount * CURRENCY_CONFIG[currency].rate * USDC_PRICE;

  const currentSymbol = CURRENCY_CONFIG[currency].symbol;
  const isValidAmount = parsedAmount > 0;
  const paymentOptions = PAYMENT_OPTIONS[deviceType];
  const Icon = paymentOptions[0].icon as ComponentType<{ className?: string }>;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start font-sans selection:bg-zinc-800 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[55vh] pointer-events-none overflow-hidden">
        <BackgroundAnimation />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black" />

        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zinc-800/20 blur-[120px] rounded-full mix-blend-screen opacity-30" />
      </div>

      <div className="w-full max-w-md min-h-screen flex flex-col relative px-6 pt-8 pb-6 z-10">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Hawk" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div className="flex items-center p-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md gap-1">
            {Object.keys(CURRENCY_CONFIG).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c as Currency)}
                className={cn(
                  "px-4 py-1.5 text-xs font-medium rounded-full transition-all",
                  currency === c ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                )}
                disabled={loading}
              >
                {c === "CNY" ? "元" : c}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center min-h-[180px]">
          <div className="text-center space-y-2">
            <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">Deposit Amount</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl md:text-6xl font-light tracking-tight text-zinc-600">{currentSymbol}</span>
              <span
                className={cn(
                  "text-6xl md:text-7xl font-normal tracking-tight",
                  amount ? "bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent" : "text-zinc-700"
                )}
              >
                {amount
                  ? parseFloat(amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {PRESET_AMOUNTS.map((val) => (
            <button
              key={val}
              onClick={() => handlePresetClick(val)}
              disabled={loading}
              className="py-2 px-4 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 text-sm font-medium hover:border-zinc-700 hover:text-white transition-all active:scale-95"
            >
              {currentSymbol}
              {val}
            </button>
          ))}
        </div>

        <div className="mb-6 border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-900/10">
          <button
            className="w-full flex justify-between items-center px-5 py-3.5 bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 transition-colors group"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="text-xs font-medium flex items-center gap-2">
              <Info size={14} />
              Transaction Details
            </span>
            <div className={`transform transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}>
              <ChevronDown size={14} />
            </div>
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-3 border-t border-zinc-900/50 pt-3 bg-zinc-900/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Network Fee</span>
                    <span className="text-zinc-300">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">You Receive</span>
                    <span className="text-white flex items-center gap-1.5">
                      <img
                        src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                        alt="USDC"
                        className="w-4 h-4 rounded-full"
                      />
                      {estimatedOutput.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      <span className="text-zinc-500">USDC</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">To</span>
                    <span className="text-zinc-300">0xdb9b...fd70</span>
                  </div>

                  <div className="pt-2 mt-2">
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">Payment Method</p>
                    <div className="flex flex-col gap-2">
                      {paymentOptions.map((option) => (
                        <button
                          key={option.name}
                          className="w-full flex items-center justify-center p-3 rounded-xl border border-zinc-700 bg-zinc-900 text-white gap-2 cursor-default"
                        >
                          {option.icon && <option.icon className="h-4 w-auto" />}
                          <span className="text-xs font-medium">{option.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pb-6">
          <Keypad onKeyPress={handleKeyPress} onDelete={handleDelete} disabled={loading} />
        </div>

        <div className="mt-auto pt-2">
          <PNButton
            disabled={!isValidAmount || loading}
            loading={loading}
            prefixIcon={<Icon className="h-4" />}
            className={cn(
              isValidAmount ? "bg-white text-black hover:bg-zinc-100" : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
            )}
            onClick={handleSubmit}
          >
            {isValidAmount ? (
              <span>
                Pay {currentSymbol}
                {amount}
              </span>
            ) : (
              "Enter Amount"
            )}
          </PNButton>

          <p className="mt-4 text-center text-[10px] text-zinc-700">
            Powered by <span className="font-serif italic text-zinc-500">hawk.trade</span>
          </p>
        </div>
      </div>
    </div>
  );
}
