"use client";

import { Page } from "@/components/Page";
import CheckoutWithHawk from "@/ui/App";
import OnrampCheckout from "@/ui/onramp";
import { useState } from "react";

export default function Home() {
  const [orderData, setOrderData] = useState<CreateOrderResponse | null>(null);

  if (orderData?.order) {
    return (
      <Page back={false}>
        <OnrampCheckout
          orderId={orderData.order.orderId}
          clientSecret={orderData.clientSecret}
          receiptEmail="demos+onramp-existing-user@crossmint.com"
        />
      </Page>
    );
  }

  return (
    <Page back={false}>
      <CheckoutWithHawk setOrderData={setOrderData} />
    </Page>
  );
}
