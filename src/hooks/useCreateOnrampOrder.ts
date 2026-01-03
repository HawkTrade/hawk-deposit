import { useState } from "react";
import { toast } from "sonner";

export default function useCreateOnrampOrder() {
  const [loading, setLoading] = useState(false);

  async function createOrder(amount: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/onramp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          email: "demos+onramp-existing-user@crossmint.com",
          wallet: "0xDB9B936373f859Ce8C580Bbc35b0Eab89cA9fd70",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.data || "Failed to create order");
      }

      const data: CreateOrderResponse = await response.json();
      return data;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      console.error(e);
      toast.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createOrder, loading };
}
