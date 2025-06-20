"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";
import {
  createSubscription,
  getSubscriptionTypeById,
} from "@/lib/db/actions/subscriptions";
import { calculateSubscriptionEndDate } from "@/utils/subscription";

export const handleSaveSubscription = async (
  sessionId: string,
  planId: string,
) => {
  const session = await auth();

  if (!session?.user?.userId) {
    redirect("/signin");
  }

  if (typeof sessionId !== "string") {
    console.log("sessionId is not a string");

    return {
      notFound: true,
    };
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    console.log("stripeSession", stripeSession);

    // Only save to DB if payment was successful
    if (stripeSession.payment_status === "paid") {
      const productName =
        stripeSession.line_items?.data[0]?.description || "Unknown";

      const subscriptionType = await getSubscriptionTypeById(Number(planId));

      const endDate = calculateSubscriptionEndDate(subscriptionType?.duration);

      if (!subscriptionType || !endDate) {
        console.log("subscriptionType or endDate is not found");

        return {
          notFound: true,
        };
      }

      await createSubscription({
        userId: session.user!.userId,
        paymentId: stripeSession.id,
        paymentStatus: stripeSession.payment_status,
        paymentMethod: stripeSession.payment_method_types[0],
        paymentAmount: stripeSession.amount_total || 0,
        paymentCurrency: stripeSession.currency || "usd",
        paymentDate: new Date(stripeSession.created * 1000), // Convert Unix timestamp
        paymentType: productName,
        endDate,
      });
    }

    return {
      props: {
        stripeSession,
      },
    };
  } catch (error) {
    console.error("Error processing payment success:", error);
    return {
      notFound: true,
    };
  }
};
