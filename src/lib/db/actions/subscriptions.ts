"use server";

import { db } from "../index";
import {
  SubscriptionInsert,
  subscriptionTable,
  subscriptionTypeTable,
} from "../schema/subscription";
import { eq, desc, gt, and } from "drizzle-orm";

export const getSubscriptionTypes = async () => {
  const subscriptions = await db.select().from(subscriptionTypeTable);

  return subscriptions;
};

export const getSubscriptionTypeById = async (id: number) => {
  const subscription = await db
    .select()
    .from(subscriptionTypeTable)
    .where(eq(subscriptionTypeTable.id, id));

  return subscription[0] || null;
};

export const createSubscription = async (
  subscriptionData: SubscriptionInsert,
) => {
  try {
    const [subscription] = await db
      .insert(subscriptionTable)
      .values(subscriptionData)
      .returning();

    return subscription;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

export const getUserActiveSubscription = async (userId: number) => {
  const subscriptions = await db
    .select()
    .from(subscriptionTable)
    .where(eq(subscriptionTable.userId, userId))
    .orderBy(desc(subscriptionTable.createdAt))
    .limit(1);

  return subscriptions[0];
};

export const hasActiveSubscription = async (
  userId: number,
): Promise<boolean> => {
  const activeSubscriptions = await db
    .select()
    .from(subscriptionTable)
    .where(
      and(
        eq(subscriptionTable.userId, userId),
        gt(subscriptionTable.endDate, new Date()),
        eq(subscriptionTable.paymentStatus, "paid"),
      ),
    )
    .limit(1);

  return activeSubscriptions.length > 0;
};
