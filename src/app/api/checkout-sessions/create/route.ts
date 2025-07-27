import getStripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data: {
      planId: number;
      amount: number;
      currency: "usd";
      productName: string;
    } = await request.json();

    const stripe = getStripe();

    console.log(
      "url",
      `${request.headers.get("origin")}/success`,
      request.nextUrl.origin,
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: data.currency,
            product_data: {
              name: data.productName,
            },
            unit_amount: data.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&planId=${data.planId}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating payment session:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
