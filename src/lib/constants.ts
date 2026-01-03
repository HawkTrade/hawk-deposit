import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { CreditCard } from "@/components/icons/LucideReact";

const getDeviceType = (): "apple" | "android" | "other" => {
  if (typeof window === "undefined") return "other";
  const platform = (window as any).Telegram?.WebApp?.platform;
  if (platform === "ios") return "apple";
  if (platform === "android") return "android";
  // Fallback to user agent
  const ua = navigator.userAgent;
  if (ua.includes("iPhone") || ua.includes("iPad") || ua.includes("iPod")) return "apple";
  if (ua.includes("Android")) return "android";
  return "other";
};

// Mock data
const USDC_PRICE = 1.0;
const PRESET_AMOUNTS = [50, 100, 500, 1500];

type Currency = "USD" | "EUR" | "CNY";

const CURRENCY_CONFIG = {
  USD: { symbol: "$", rate: 1.0, label: "USD" },
  EUR: { symbol: "€", rate: 1.09, label: "EUR" }, // 1 EUR = 1.09 USD
  CNY: { symbol: "¥", rate: 0.14, label: "CNY" }, // 1 CNY = 0.14 USD
};

type PaymentOption = {
  name: string;
  icon: React.ComponentType<{ className?: string }> | null;
};

const PAYMENT_OPTIONS: Record<string, PaymentOption[]> = {
  apple: [
    { name: "Apple Pay", icon: AppleIcon },
    { name: "Card", icon: CreditCard },
  ],
  android: [
    { name: "Google Pay", icon: GoogleIcon },
    { name: "Card", icon: CreditCard },
  ],
  other: [{ name: "Card", icon: CreditCard }],
};

export { CURRENCY_CONFIG, PAYMENT_OPTIONS, PRESET_AMOUNTS, USDC_PRICE, getDeviceType };
export type { Currency, PaymentOption };
