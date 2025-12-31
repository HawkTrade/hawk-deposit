"use client";

import { Page } from "@/components/Page";
import CheckoutWithHawk from "@/ui/App";

export default function Home() {
  return (
    <Page back={false}>
      <CheckoutWithHawk />
    </Page>
  );
}
