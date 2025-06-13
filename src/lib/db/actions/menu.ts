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
  Restaurant,
  scheduleTable,
  InsertSchedule,
  Menu,
} from "../schema/menu";
import { getUser } from "@/lib/actions/auth";
import { eq, and, sql, getTableColumns } from "drizzle-orm";

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

export const updateRestaurant = async (id: number, data: NewRestaurant) => {
  try {
    const user = await getUser();

    const restaurant = await db
      .update(restaurantTable)
      .set(data)
      .where(
        and(
          eq(restaurantTable.id, id),
          eq(restaurantTable.userId, user.userId),
        ),
      )
      .returning();

    return restaurant[0];
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getRestaurants = async () => {
  try {
    const restaurants = await db.select().from(restaurantTable);

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
    const restaurantId = typeof id === "string" ? parseInt(id) : id;

    const restaurant = await db
      .select()
      .from(restaurantTable)
      .where(and(eq(restaurantTable.id, restaurantId)));

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

export const getRestaurantSchedule = async (id: Restaurant["id"]) => {
  try {
    const schedule = await db
      .select()
      .from(scheduleTable)
      .where(eq(restaurantTable.id, id));

    return schedule;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const createSchedule = async (schedules: InsertSchedule[]) => {
  await db
    .delete(scheduleTable)
    .where(eq(scheduleTable.restaurantId, schedules[0].restaurantId));

  await db.insert(scheduleTable).values(schedules).returning();
};

export const getSchedule = async (id: Restaurant["id"]) => {
  const schedule = await db
    .select()
    .from(scheduleTable)
    .where(eq(scheduleTable.restaurantId, id));

  return schedule;
};

export const getRestaurantMenu = async (id: Restaurant["id"]) => {
  const query = db
    .select()
    .from(menuTable)
    .where(eq(menuTable.restaurantId, id));

  return query;
};

export interface MenuCategory {
  id: number;
  name: string;
  description: string | null;
  dishesCount: number;
}

export const getRestaurantMenusWithCategories = async (
  id: Restaurant["id"],
) => {
  const res = db
    .select({
      id: menuTable.id,
      restaurantId: menuTable.restaurantId,
      name: menuTable.name,
      description: menuTable.description,
      categories: sql<MenuCategory[]>`array_agg(
        json_build_object(
          'id', ${menuCategoryTable.id},
          'name', ${menuCategoryTable.name},
          'description', ${menuCategoryTable.description},
          'dishesCount', (
            SELECT COUNT(*)::int 
            FROM ${dishTable} 
            WHERE ${dishTable.categoryId} = ${menuCategoryTable.id}
          )
        )
      )`.mapWith((val: MenuCategory[]) => (val === null ? [] : val)),
    })
    .from(menuTable)
    .leftJoin(menuCategoryTable, eq(menuTable.id, menuCategoryTable.menuId))
    .where(eq(menuTable.restaurantId, id))
    .groupBy(menuTable.id);

  return res;
};

export type RestaurantMenuWithCategories = Awaited<
  ReturnType<typeof getRestaurantMenusWithCategories>
>;

export const getRestaurantMenuById = async (
  id: Menu["id"],
  withCategories = false,
) => {
  const query = db.select().from(menuTable).where(eq(menuTable.id, id));

  if (withCategories) {
    query.leftJoin(
      menuCategoryTable,
      eq(menuTable.id, menuCategoryTable.menuId),
    );
  }

  return query;
};

export const getCategoryDishes = async (id: MenuCategory["id"]) => {
  const query = db.select().from(dishTable).where(eq(dishTable.categoryId, id));

  return query;
};

export const getUserEditRestaurants = async () => {
  const user = await getUser();

  const restaurants = await db
    .select({
      ...getTableColumns(restaurantTable),
      menusCount: sql<number>`COUNT(${menuTable.id})::int`,
    })
    .from(restaurantTable)
    .leftJoin(menuTable, eq(menuTable.restaurantId, restaurantTable.id))
    .groupBy(restaurantTable.id)
    .where(eq(restaurantTable.userId, user.userId));

  return restaurants;
};

export type UserEditRestaurants = Awaited<
  ReturnType<typeof getUserEditRestaurants>
>;

export const getUserEditMenus = async (restaurantId: Restaurant["id"]) => {
  await getUser();

  const menus = await db
    .select({
      ...getTableColumns(menuTable),
      categoriesCount: sql<number>`COUNT(${menuCategoryTable.id})::int`,
    })
    .from(menuTable)
    .leftJoin(menuCategoryTable, eq(menuTable.id, menuCategoryTable.menuId))
    .groupBy(menuTable.id)
    .where(eq(menuTable.restaurantId, restaurantId));

  return menus;
};

export type UserEditMenus = Awaited<ReturnType<typeof getUserEditMenus>>;

export const getUserEditCategories = async (menuId: Menu["id"]) => {
  await getUser();

  const categories = await db
    .select()
    .from(menuCategoryTable)
    .where(eq(menuCategoryTable.menuId, menuId));

  return categories;
};

export type UserEditCategories = Awaited<
  ReturnType<typeof getUserEditCategories>
>;

export const getUserEditDishes = async (categoryId: MenuCategory["id"]) => {
  await getUser();

  const dishes = await db
    .select()
    .from(dishTable)
    .where(eq(dishTable.categoryId, categoryId));

  return dishes;
};

export type UserEditDishes = Awaited<ReturnType<typeof getUserEditDishes>>;

export const deletedRestaurant = async (id: Restaurant["id"]) => {
  await db.delete(restaurantTable).where(eq(restaurantTable.id, id));
};

export const createMenu = async (menu: InsertMenu) => {
  const res = await db.insert(menuTable).values(menu).returning();

  return res;
};

export const deleteMenu = async (id: Menu["id"]) => {
  await db.delete(menuTable).where(eq(menuTable.id, id));
};
