"use client";

import {
  CrossmintProvider,
  CrossmintEmbeddedCheckout,
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
    <CrossmintProvider apiKey={clientApiKey}>
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
      </div>
    </CrossmintProvider>
  );
}
