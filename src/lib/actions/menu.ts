"use server";

import { db } from "@/lib/db";
import {
  subscriptionTable,
  subscriptionTypeTable,
  subscriptionTypeAbilitiesTable,
} from "@/lib/db/schema/subscription";
import {
  restaurantTable,
  menuTable,
  menuCategoryTable,
  dishTable,
} from "@/lib/db/schema/menu";
import { getUser } from "@/lib/actions/auth";
import { eq, and, count, gt } from "drizzle-orm";

export type EntityType = "restaurant" | "menu" | "category" | "dish" | "table";

export interface SubscriptionLimitError {
  success: false;
  error: string;
  limit: number;
  current: number;
}

export interface SubscriptionLimitSuccess {
  success: true;
}

export type SubscriptionLimitResult =
  | SubscriptionLimitError
  | SubscriptionLimitSuccess;

/**
 * Checks if a user can create a new entity based on their subscription limits
 * @param entityType - The type of entity to check: 'restaurant', 'menu', 'category', 'dish', or 'table'
 * @returns Promise<SubscriptionLimitResult> - Success or error with limit details
 */
export async function checkSubscriptionLimit(
  entityType: EntityType,
): Promise<SubscriptionLimitResult> {
  try {
    const user = await getUser();

    // Get user's active subscription with abilities
    const userSubscription = await db
      .select({
        subscriptionId: subscriptionTable.id,
        subscriptionTypeId: subscriptionTable.subscriptionTypeId,
        endDate: subscriptionTable.endDate,
        paymentStatus: subscriptionTable.paymentStatus,
        maxRestaurants: subscriptionTypeAbilitiesTable.maxRestaurants,
        maxMenus: subscriptionTypeAbilitiesTable.maxMenus,
        maxMenuCategories: subscriptionTypeAbilitiesTable.maxMenuCategories,
        maxDishes: subscriptionTypeAbilitiesTable.maxDishes,
        maxTables: subscriptionTypeAbilitiesTable.maxTables,
      })
      .from(subscriptionTable)
      .innerJoin(
        subscriptionTypeTable,
        eq(subscriptionTable.subscriptionTypeId, subscriptionTypeTable.id),
      )
      .innerJoin(
        subscriptionTypeAbilitiesTable,
        eq(
          subscriptionTypeTable.subscriptionTypeAbilitiesId,
          subscriptionTypeAbilitiesTable.id,
        ),
      )
      .where(
        and(
          eq(subscriptionTable.userId, user.userId),
          gt(subscriptionTable.endDate, new Date()),
          eq(subscriptionTable.paymentStatus, "paid"),
        ),
      )
      .limit(1);

    // If no active subscription, deny creation
    if (!userSubscription || userSubscription.length === 0) {
      return {
        success: false,
        error:
          "No active subscription found. Please subscribe to create new content.",
        limit: 0,
        current: 0,
      };
    }

    const subscription = userSubscription[0];

    // Get current counts and check limits based on entity type
    switch (entityType) {
      case "restaurant": {
        const limit = subscription.maxRestaurants;
        if (limit === null) {
          return { success: true }; // Unlimited
        }

        const [currentCount] = await db
          .select({ count: count() })
          .from(restaurantTable)
          .where(eq(restaurantTable.userId, user.userId));

        if (currentCount.count >= limit) {
          return {
            success: false,
            error: `Restaurant limit reached. Your plan allows ${limit} restaurant${
              limit === 1 ? "" : "s"
            }.`,
            limit,
            current: currentCount.count,
          };
        }
        break;
      }

      case "menu": {
        const limit = subscription.maxMenus;
        if (limit === null) {
          return { success: true }; // Unlimited
        }

        // Count menus for all user's restaurants
        const [currentCount] = await db
          .select({ count: count() })
          .from(menuTable)
          .innerJoin(
            restaurantTable,
            eq(menuTable.restaurantId, restaurantTable.id),
          )
          .where(eq(restaurantTable.userId, user.userId));

        if (currentCount.count >= limit) {
          return {
            success: false,
            error: `Menu limit reached. Your plan allows ${limit} menu${
              limit === 1 ? "" : "s"
            }.`,
            limit,
            current: currentCount.count,
          };
        }
        break;
      }

      case "category": {
        const limit = subscription.maxMenuCategories;
        if (limit === null) {
          return { success: true }; // Unlimited
        }

        // Count categories for all user's menus
        const [currentCount] = await db
          .select({ count: count() })
          .from(menuCategoryTable)
          .innerJoin(menuTable, eq(menuCategoryTable.menuId, menuTable.id))
          .innerJoin(
            restaurantTable,
            eq(menuTable.restaurantId, restaurantTable.id),
          )
          .where(eq(restaurantTable.userId, user.userId));

        if (currentCount.count >= limit) {
          return {
            success: false,
            error: `Menu category limit reached. Your plan allows ${limit} categor${
              limit === 1 ? "y" : "ies"
            }.`,
            limit,
            current: currentCount.count,
          };
        }
        break;
      }

      case "dish": {
        const limit = subscription.maxDishes;
        if (limit === null) {
          return { success: true }; // Unlimited
        }

        // Count dishes for all user's categories
        const [currentCount] = await db
          .select({ count: count() })
          .from(dishTable)
          .innerJoin(
            menuCategoryTable,
            eq(dishTable.categoryId, menuCategoryTable.id),
          )
          .innerJoin(menuTable, eq(menuCategoryTable.menuId, menuTable.id))
          .innerJoin(
            restaurantTable,
            eq(menuTable.restaurantId, restaurantTable.id),
          )
          .where(eq(restaurantTable.userId, user.userId));

        if (currentCount.count >= limit) {
          return {
            success: false,
            error: `Dish limit reached. Your plan allows ${limit} dish${
              limit === 1 ? "" : "es"
            }.`,
            limit,
            current: currentCount.count,
          };
        }
        break;
      }

      case "table": {
        const limit = subscription.maxTables;
        if (limit === null) {
          return { success: true }; // Unlimited
        }

        // Note: Tables schema doesn't exist yet in the codebase
        // This is a placeholder for when tables are implemented
        const currentCount = 0; // TODO: Implement when tables schema exists

        if (currentCount >= limit) {
          return {
            success: false,
            error: `Table limit reached. Your plan allows ${limit} table${
              limit === 1 ? "" : "s"
            }.`,
            limit,
            current: currentCount,
          };
        }
        break;
      }

      default:
        return {
          success: false,
          error: `Unknown entity type: ${entityType}`,
          limit: 0,
          current: 0,
        };
    }

    return { success: true };
  } catch (error) {
    console.error("Error checking subscription limit:", error);
    return {
      success: false,
      error: "Failed to check subscription limits. Please try again.",
      limit: 0,
      current: 0,
    };
  }
}

/**
 * Helper function to get user's current usage statistics
 * @returns Promise with current counts for all entity types
 */
export async function getUserUsageStats() {
  try {
    const user = await getUser();

    const [restaurantCount] = await db
      .select({ count: count() })
      .from(restaurantTable)
      .where(eq(restaurantTable.userId, user.userId));

    const [menuCount] = await db
      .select({ count: count() })
      .from(menuTable)
      .innerJoin(
        restaurantTable,
        eq(menuTable.restaurantId, restaurantTable.id),
      )
      .where(eq(restaurantTable.userId, user.userId));

    const [categoryCount] = await db
      .select({ count: count() })
      .from(menuCategoryTable)
      .innerJoin(menuTable, eq(menuCategoryTable.menuId, menuTable.id))
      .innerJoin(
        restaurantTable,
        eq(menuTable.restaurantId, restaurantTable.id),
      )
      .where(eq(restaurantTable.userId, user.userId));

    const [dishCount] = await db
      .select({ count: count() })
      .from(dishTable)
      .innerJoin(
        menuCategoryTable,
        eq(dishTable.categoryId, menuCategoryTable.id),
      )
      .innerJoin(menuTable, eq(menuCategoryTable.menuId, menuTable.id))
      .innerJoin(
        restaurantTable,
        eq(menuTable.restaurantId, restaurantTable.id),
      )
      .where(eq(restaurantTable.userId, user.userId));

    return {
      restaurants: restaurantCount.count,
      menus: menuCount.count,
      categories: categoryCount.count,
      dishes: dishCount.count,
      tables: 0, // TODO: Implement when tables schema exists
    };
  } catch (error) {
    console.error("Error getting usage stats:", error);
    return {
      restaurants: 0,
      menus: 0,
      categories: 0,
      dishes: 0,
      tables: 0,
    };
  }
}

/**
 * Helper function to get user's subscription limits
 * @returns Promise with subscription limits for all entity types
 */
export async function getUserSubscriptionLimits() {
  try {
    const user = await getUser();

    const userSubscription = await db
      .select({
        maxRestaurants: subscriptionTypeAbilitiesTable.maxRestaurants,
        maxMenus: subscriptionTypeAbilitiesTable.maxMenus,
        maxMenuCategories: subscriptionTypeAbilitiesTable.maxMenuCategories,
        maxDishes: subscriptionTypeAbilitiesTable.maxDishes,
        maxTables: subscriptionTypeAbilitiesTable.maxTables,
      })
      .from(subscriptionTable)
      .innerJoin(
        subscriptionTypeTable,
        eq(subscriptionTable.subscriptionTypeId, subscriptionTypeTable.id),
      )
      .innerJoin(
        subscriptionTypeAbilitiesTable,
        eq(
          subscriptionTypeTable.subscriptionTypeAbilitiesId,
          subscriptionTypeAbilitiesTable.id,
        ),
      )
      .where(
        and(
          eq(subscriptionTable.userId, user.userId),
          gt(subscriptionTable.endDate, new Date()),
          eq(subscriptionTable.paymentStatus, "paid"),
        ),
      )
      .limit(1);

    if (!userSubscription || userSubscription.length === 0) {
      return null;
    }

    const limits = userSubscription[0];
    return {
      restaurants: limits.maxRestaurants,
      menus: limits.maxMenus,
      categories: limits.maxMenuCategories,
      dishes: limits.maxDishes,
      tables: limits.maxTables,
    };
  } catch (error) {
    console.error("Error getting subscription limits:", error);
    return null;
  }
}
