"use client";

import {
  CrossmintProvider,
  CrossmintEmbeddedCheckout,
  useCrossmintCheckout,
  CrossmintCheckoutProvider,
} from "@crossmint/client-sdk-react-ui";

interface Props {
  orderId: string;
  clientSecret: string;
  receiptEmail: string;
}

const clientApiKey = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_KEY!;

export default function OnrampCheckout({
  orderId,
  clientSecret,
  receiptEmail,
}: Props) {
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

  if (!order) {
    return <div>Loading...</div>;
  }

  switch (order.phase) {
    case "completed":
      return <div>Purchase complete!</div>;
    case "delivery":
      return <div>Delivering your Tokens...</div>;
    case "payment":
      return <div>Processing payment...</div>;
    case "quote":
      return <div>Preparing your order...</div>;
  }
}
