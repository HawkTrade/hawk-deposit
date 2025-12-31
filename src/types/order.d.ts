type Order = {
  status: OnrampStatus;
  error: string | null;
  totalUsd: string | null;
  effectiveAmount: string | null;
  txId: string | null;
};

type CreateOrderRequest = {
  amount: string;
  receiptEmail: string;
  walletAddress: string;
  paymentMethod: string;
};

type CreateOrderResponse = {
  order: {
    orderId: string;
    payment: {
      status: string;
      preparation: {
        kyc?: PersonaConfig;
        checkoutcomPaymentSession?: string;
        checkoutcomPublicKey?: string;
      };
      receiptEmail: string;
      currency: string;
      method: string;
    };
    lineItems: Array<{
      quote: {
        totalPrice: {
          amount: string;
        };
        quantityRange: {
          lowerBound: string;
          upperBound: string;
        };
      };
    }>;
    quote: {
      status: string;
      quotedAt: string; // Date string
      expiresAt: string; // Date string
      totalPrice: {
        amount: string;
        currency: string;
      };
    };
    locale: string;
    phase: string;
  };
  clientSecret: string;
};

type GetOrderResponse = {
  orderId: string;
  phase: string;
  payment: {
    status: string;
    preparation: {
      checkoutcomPaymentSession?: string;
      checkoutcomPublicKey?: string;
    };
  };
  lineItems: Array<{
    quote?: {
      quantityRange?: {
        lowerBound?: string;
        upperBound?: string;
      };
    };
    delivery: {
      status: string;
      txId: string;
    };
  }>;
};

type ApiErrorResponse = {
  error: string;
  details?: any;
};

type PersonaConfig = {
  templateId: string;
  referenceId: string;
  environmentId: string;
};
