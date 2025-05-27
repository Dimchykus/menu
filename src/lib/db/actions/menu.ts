"use server";

import { db } from "..";
import {
  dishTable,
  InsertDish,
  InsertMenu,
  InsertMenuCategory,
  NewRestaurant,
  menuCategoryTable,
  menuTable,
  restaurantTable,
} from "../schema/menu";
import { getUser } from "@/lib/actions/auth";
import { eq, and } from "drizzle-orm";

export const createMenu = async (menu: InsertMenu) => {
  await db.insert(menuTable).values(menu).returning();
};

export const createRestaurant = async (data: NewRestaurant) => {
  try {
    const user = await getUser();

    const restaurant = await db
      .insert(restaurantTable)
      .values({ ...data, userId: user.userId })
      .returning();

    return restaurant[0];
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getRestaurants = async () => {
  try {
    const user = await getUser();

    const restaurants = await db
      .select()
      .from(restaurantTable)
      .where(eq(restaurantTable.userId, user.userId));

    if (restaurants?.length === 0) {
      return [];
    }

    return restaurants;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getRestaurantById = async (id: string | number) => {
  try {
    const user = await getUser();

    const restaurantId = typeof id === "string" ? parseInt(id) : id;

    const restaurant = await db
      .select()
      .from(restaurantTable)
      .where(
        and(
          eq(restaurantTable.userId, user.userId),
          eq(restaurantTable.id, restaurantId),
        ),
      );

    return restaurant[0] || null;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const createMenuCategory = async (menuCategory: InsertMenuCategory) => {
  await db.insert(menuCategoryTable).values(menuCategory).returning();
};

export const createDish = async (dish: InsertDish) => {
  await db.insert(dishTable).values(dish).returning();
};
