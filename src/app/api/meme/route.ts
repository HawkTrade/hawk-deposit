import { type NextRequest, NextResponse } from "next/server";

const CROSSMINT_SERVER_KEY = process.env.CROSSMINT_SERVER_KEY;
const tokenId = "solana:7EivYFyNfgGj8xbUymR7J4LuxUHLKRzpLaERHLvi7Dgu";

export async function POST(request: NextRequest) {
  try {
    if (!CROSSMINT_SERVER_KEY) {
      throw new Error("Missing Crossmint server API key");
    }
    const { email, wallet, amount } = await request.json();

    const response = await fetch("https://staging.crossmint.com/api/2022-06-09/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CROSSMINT_SERVER_KEY,
      },
      body: JSON.stringify({
        lineItems: [
          {
            tokenLocator: tokenId,
            executionParameters: {
              mode: "exact-in",
              amount: amount,
              maxSlippageBps: "500",
            },
          },
        ],
        payment: {
          method: "checkoutcom-flow",
          receiptEmail: email,
        },
        recipient: {
          walletAddress: wallet,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Crossmint API error: ${data.message || "Unknown error"}`);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error creating meme order:", error);
    return NextResponse.json(
      {
        data: "Failed to create meme order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
