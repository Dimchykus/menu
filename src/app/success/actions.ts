"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getStripe from "@/lib/stripe";
import {
  checkIfPaymentExists,
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
    return {
      notFound: true,
    };
  }

  try {
    const paymentExists = await checkIfPaymentExists(sessionId);

    if (paymentExists) {
      return {
        notFound: true,
      };
    }
    const stripe = getStripe();
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    if (stripeSession.payment_status === "paid") {
      const productName =
        stripeSession.line_items?.data[0]?.description || "Unknown";

      const subscriptionType = await getSubscriptionTypeById(Number(planId));

      const endDate = calculateSubscriptionEndDate(subscriptionType?.duration);

      if (!subscriptionType || !endDate) {
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
        subscriptionTypeId: subscriptionType.id,
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
