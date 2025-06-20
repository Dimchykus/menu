import { getUser } from "@/lib/actions/auth";
import { loadStripe } from "@stripe/stripe-js/pure";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const handleCheckout = async (
  planId: number,
  amount: number,
  productName: string,
) => {
  try {
    await getUser();

    const stripe = await loadStripe(
      "pk_test_51RaugwGdmQIWpFFJnjOAZoLwi0rzfnHNbglniyrA2EmAM7A4JoTL0aZ5zbngOXl7lipUzETXDH3fwQf9tXah7qo100UzfMiCch",
    );

    if (!stripe) {
      throw new Error("Stripe is not loaded");
    }

    const response = await fetch(`${baseUrl}/api/checkout-sessions/create`, {
      method: "POST",
      body: JSON.stringify({
        planId,
        amount,
        currency: "usd",
        productName,
      }),
    });
    const session = await response.json();

    await stripe?.redirectToCheckout({
      sessionId: session.sessionId,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Not logged in") {
        redirect("/signin");
      }

      console.error("Error in handleCheckout", error.message);
    } else {
      console.error("Error in handleCheckout", error);
    }
  }
};
