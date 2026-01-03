import { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import useCreateMemeOrder from "@/hooks/useCreateMemeOrder";
import { toast } from "sonner";

export function CheckoutComEmbedded({ amount }: { amount: string }) {
  const { createOrder, data, loading } = useCreateMemeOrder();
  const [isCheckoutReady, setIsCheckoutReady] = useState(false);

  useEffect(() => {
    async function initiateOrder() {
      console.log("Creating order", Date.now());

      try {
        await createOrder(amount);
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    }

    initiateOrder();
  }, [amount]);

  useEffect(() => {
    if (data == null) {
      return;
    }
    const order = data.order;
    console.log("Order data:", data, Date.now());

    const initializeCheckout = async () => {
      try {
        if (typeof window.CheckoutWebComponents !== "function") {
          console.error("CheckoutWebComponents not loaded properly");
          // Retry after a short delay
          setTimeout(initializeCheckout, 1000);
          return;
        }

        const checkout = await window.CheckoutWebComponents({
          appearance: {
            colorBorder: "#FFFFFF",
            colorAction: "#060735",
            borderRadius: ["8px", "50px"],
          },
          publicKey: order.payment.preparation.checkoutcomPublicKey,
          environment: "sandbox", // Change to "live" for production
          locale: "en-US",
          paymentSession: order.payment.preparation.checkoutcomPaymentSession,
          cors: {
            mode: "no-cors",
            credentials: "same-origin",
          },
          onReady: () => {
            toast.info("Flow is ready");
            setIsCheckoutReady(true);
          },
          onPaymentCompleted: (_: unknown, paymentResponse: object) => {
            toast.success("Payment completed successfully");
            console.log("Payment completed with ID:", "id" in paymentResponse && paymentResponse.id);
          },
          onChange: (_: unknown) => {
            console.log("Payment component changed");
          },
          onError: (_: unknown, error: unknown) => {
            toast.error("Payment error occurred");
            console.error("Payment error:", error);
          },
        });

        const flowComponent = checkout.create("flow");
        const container = document.getElementById("flow-container");
        if (container) {
          flowComponent.mount(container);
        }
      } catch (error) {
        console.error("Error initializing checkout:", error);
      }
    };

    // Initialize checkout when the script is loaded and payment session exists
    const scriptElement = document.querySelector('script[src*="checkout-web-components"]');
    if (scriptElement) {
      console.log("Script element found:", scriptElement);
      console.log("Script element connected:", scriptElement.isConnected);
      initializeCheckout();
    }
  }, [data]);

  if (!data || loading) {
    return (
      <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] mx-auto px-6 md:px-10">
        <div className="bg-white p-6 md:p-10 rounded-lg">
          <div className="flex flex-col items-center justify-center py-10">
            <Spinner />
            <p className="text-muted-foreground mt-4">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] mx-auto px-6 md:px-10">
      <div className="bg-white p-6 md:p-10 rounded-lg">
        <Script
          src="https://checkout-web-components.checkout.com/index.js"
          strategy="afterInteractive"
          onLoad={() => {
            toast.info("Checkout.com script loaded");
          }}
          onError={(e) => {
            toast.error("Error loading Checkout.com script");
            console.error("Error loading Checkout.com script:", e);
          }}
        />
        <div className="grow">
          <div id="flow-container" className="w-full"></div>
        </div>
        {isCheckoutReady && (
          <div className="text-center mt-4 text-sm" style={{ color: "rgb(102, 102, 102)" }}>
            <p>
              By continuing, you accept{" "}
              <Image src="/logo.png" alt="hawk.trade" width={16} height={16} className="inline-block mx-1" />
              <a
                href="https://hawk.trade/legal/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-800"
              >
                hawk.trade`s terms
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Add this to your global declarations
declare global {
  interface Window {
    CheckoutWebComponents: unknown;
  }
}
