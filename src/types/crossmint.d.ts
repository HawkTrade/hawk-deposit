type OnrampStatus =
  | "not-created"
  | "creating-order"
  | "requires-kyc"
  | "polling-kyc"
  | "awaiting-payment"
  | "polling-payment"
  | "delivering"
  | "success"
  | "payment-failed"
  | "manual-kyc"
  | "rejected-kyc"
  | "error";
