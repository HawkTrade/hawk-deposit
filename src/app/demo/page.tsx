"use client";

import { useState } from "react";
import { Page } from "@/components/Page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OnrampCheckout from "@/ui/onramp";
import {
  validateEmail,
  validateEthereumAddress,
  validateAmount,
} from "@/lib/validators";

export default function Home() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const [orderData, setOrderData] = useState<CreateOrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(orderData);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!validateEmail(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!validateEthereumAddress(walletAddress)) {
        throw new Error("Please enter a valid Ethereum address (0x...)");
      }

      if (!validateAmount(amount)) {
        throw new Error(
          "Amount must be a number greater than 0 and less than 1000"
        );
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "demos+onramp-existing-user@crossmint.com",
          amount,
          wallet: walletAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.details || errorData.data || "Failed to create order"
        );
      }

      const data: CreateOrderResponse = await response.json();
      setOrderData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (orderData?.order) {
    return (
      <Page back={false}>
        <OnrampCheckout
          orderId={orderData.order.orderId}
          clientSecret={orderData.clientSecret}
          receiptEmail={email}
        />
      </Page>
    );
  }

  return (
    <Page back={false}>
      <div className="max-w-[450px] w-full mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Create Order</h1>

        <Input
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
        />

        <Input
          label="Amount"
          placeholder="100"
          value={amount}
          onChange={setAmount}
        />

        <Input
          label="Wallet Address"
          placeholder="0x..."
          value={walletAddress}
          onChange={setWalletAddress}
        />

        {error && (
          <div className="text-red-600 p-3 rounded bg-red-50">{error}</div>
        )}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating Order..." : "Create Order"}
        </Button>
      </div>
    </Page>
  );
}
