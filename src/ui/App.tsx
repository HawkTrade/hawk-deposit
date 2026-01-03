import { useState } from "react";
import { CheckoutComEmbedded } from "./Checkout.Com";
import CheckoutWithHawkView from "@/views/CheckoutWithHawk";
import type { Currency } from "@/lib/constants";

export default function CheckoutWithHawk() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<string>("");
  const [validAmount, setValidAmount] = useState<string | null>(null);

  const handleKeyPress = (key: string) => {
    if (key === "." && amount.includes(".")) return;
    if (amount.length > 8) return; // Max length
    if (key === "." && amount === "") {
      setAmount("0.");
      return;
    }
    setAmount((prev) => {
      if (prev === "0" && key !== ".") return key;
      return prev + key;
    });
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
  };

  async function handleSubmit() {
    console.log("Submit clicked with amount:", amount);
    setValidAmount(amount);
  }

  if (validAmount) {
    return <CheckoutComEmbedded amount={validAmount} />;
  }

  return (
    <CheckoutWithHawkView
      amount={amount}
      currency={currency}
      setCurrency={setCurrency}
      handleKeyPress={handleKeyPress}
      handleDelete={handleDelete}
      handlePresetClick={handlePresetClick}
      handleSubmit={handleSubmit}
      loading={false}
    />
  );
}
