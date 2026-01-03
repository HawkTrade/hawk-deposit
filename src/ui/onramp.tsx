"use client";

import {
  CrossmintProvider,
  CrossmintEmbeddedCheckout,
  useCrossmintCheckout,
  CrossmintCheckoutProvider,
} from "@crossmint/client-sdk-react-ui";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  orderId: string;
  clientSecret: string;
  receiptEmail: string;
}

const clientApiKey = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_KEY!;

export default function OnrampCheckout({ orderId, clientSecret, receiptEmail }: Props) {
  return (
    <main className="py-5 px-3">
      <CrossmintProvider apiKey={clientApiKey}>
        <CrossmintCheckoutProvider>
          <div style={{ maxWidth: "450px", width: "100%", margin: "auto" }}>
            <CrossmintEmbeddedCheckout
              orderId={orderId}
              clientSecret={clientSecret}
              payment={{
                receiptEmail,
                crypto: { enabled: false },
                fiat: { enabled: true },
                defaultMethod: "fiat",
              }}
            />
            <CheckoutStatus />
          </div>
        </CrossmintCheckoutProvider>
      </CrossmintProvider>
    </main>
  );
}

function CheckoutStatus() {
  const { order } = useCrossmintCheckout();

  useEffect(() => {
    let id: string | number;
    switch (order?.phase) {
      case "completed":
        id = toast.success("Purchase complete!");
        break;
      case "delivery":
        id = toast.loading("Delivering your Tokens...");
        break;
      case "payment":
        id = toast.loading("Processing payment...");
        break;
      case "quote":
        id = toast.loading("Preparing your order...");
        break;
      default:
        break;
    }

    return () => {
      if (id !== undefined) {
        toast.dismiss(id);
      }
    };
  }, [order?.phase]);

  return <></>;
}
