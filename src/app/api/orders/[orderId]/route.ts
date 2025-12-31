import { NextResponse } from "next/server";

const CROSSMINT_SERVER_KEY = process.env.CROSSMINT_SERVER_KEY;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  try {
    if (!CROSSMINT_SERVER_KEY) {
      return NextResponse.json(
        {
          error: "Server misconfiguration: CROSSMINT_SERVER_KEY missing",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://staging.crossmint.com/api/2022-06-09/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CROSSMINT_SERVER_KEY,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch order", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected error fetching order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
