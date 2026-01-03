import { useState } from "react";
import { toast } from "sonner";

export default function useCreateMemeOrder() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MemeCheckoutPayload | null>(null);

  async function createOrder(amount: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/meme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          email: "demos+onramp-existing-user@crossmint.com",
          wallet: "A3EPE57GWfxXiD26w5GR7oLBbE2K6JQf9irUtPuZ9Goh",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.data || "Failed to create meme order");
      }

      const data: MemeCheckoutPayload = await response.json();
      setData(data);
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      console.error(e);
      toast.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createOrder, loading, data };
}
