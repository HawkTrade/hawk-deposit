interface MemeCheckoutPayload {
  clientSecret: string;
  order: MemeOrder;
}

interface MemeOrder {
  orderId: string;
  phase: "payment";
  locale: string;
  lineItems: LineItem[];
  quote: OrderQuote;
  payment: Payment;
}

interface LineItem {
  chain: "solana";
  metadata: LineItemMetadata;
  quote: LineItemQuote;
  delivery: Delivery;
  executionMode: "exact-in";
  maxSlippageBps: string;
  executionParams: ExecutionParams;
}

interface LineItemMetadata {
  name: string;
  description: string;
  imageUrl: string;
}

interface LineItemQuote {
  status: "valid";
  charges: {
    unit: Money;
  };
  totalPrice: Money;
  quantityRange: QuantityRange;
}

interface Money {
  amount: string;
  currency: "usd";
}

interface QuantityRange {
  lowerBound: string;
  upperBound: string;
}

interface Delivery {
  status: "awaiting-payment";
  recipient: Recipient;
}

interface Recipient {
  locator: string;
  walletAddress: string;
}

interface ExecutionParams {
  mintHash: string;
  mode: "exact-in";
  amount: string;
  maxSlippageBps: string;
}

interface OrderQuote {
  status: "valid";
  quotedAt: string;
  expiresAt: string;
  totalPrice: Money;
}

interface Payment {
  status: OnrampStatus;
  method: string;
  currency: "usd";
  preparation: PaymentPreparation;
  receiptEmail: string;
}

interface PaymentPreparation {
  checkoutcomPaymentSession: CheckoutComPaymentSession;
  checkoutcomPublicKey: string;
}

interface CheckoutComPaymentSession {
  id: string;
  payment_session_secret: string;
  payment_session_token: string;
}
