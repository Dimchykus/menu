"use server";

import {
  getAllUserDishesWithHierarchy,
  updateDishOrder,
  updateMenuOrder,
  updateCategoryOrder,
} from "@/lib/db/actions/menu";

export const handleUpdateDishOrder = async (
  dishId: number,
  newOrder: number,
) => {
  await updateDishOrder(dishId, newOrder);
};

export const handleUpdateMenuOrder = async (
  menuId: number,
  newOrder: number,
) => {
  await updateMenuOrder(menuId, newOrder);
};

export const handleUpdateCategoryOrder = async (
  categoryId: number,
  newOrder: number,
) => {
  await updateCategoryOrder(categoryId, newOrder);
};

interface MenuData {
  restaurantId: number;
  restaurantName: string | null;
  menus: Record<
    string,
    {
      menuId: number;
      menuName: string | null;
      order: number;
      categories: Record<
        string,
        {
          categoryId: number;
          categoryName: string | null;
          order: number;
          dishes: Record<
            string,
            {
              dishId: number;
              dishName: string | null;
              order: number;
            }
          >;
        }
      >;
    }
  >;
}

export const getAllMenuData = async () => {
  const menuData = await getAllUserDishesWithHierarchy();

  const groupedData: Record<string, MenuData> = menuData?.reduce(
    (acc, item) => {
      if (!acc || !item.restaurantId) return acc;

      const restaurantId = item.restaurantId;
      const menuId = item.menuId;
      const categoryId = item.categoryId;
      const dishId = item.dishId;

      if (!acc[restaurantId]) {
        acc[restaurantId] = {
          restaurantId,
          restaurantName: item.restaurantName,
          menus: {},
        };
      }

      if (menuId && acc[restaurantId]) {
        if (!acc[restaurantId].menus[menuId]) {
          acc[restaurantId].menus[menuId] = {
            menuId,
            menuName: item.menuName,
            order: item.menuOrder ?? 0,
            categories: {},
          };
        }
      }

      if (
        acc[restaurantId] &&
        item.menuId &&
        acc[restaurantId].menus[item.menuId] &&
        categoryId
      ) {
        if (!acc[restaurantId].menus[item.menuId].categories[categoryId]) {
          acc[restaurantId].menus[item.menuId].categories[categoryId] = {
            categoryId,
            categoryName: item.categoryName,
            order: item.categoryOrder ?? 0,
            dishes: {},
          };
        }
      }

      if (
        acc[restaurantId] &&
        item.menuId &&
        acc[restaurantId].menus[item.menuId] &&
        categoryId &&
        acc[restaurantId].menus[item.menuId].categories[categoryId] &&
        dishId
      ) {
        if (
          !acc[restaurantId].menus[item.menuId].categories[categoryId].dishes[
            dishId
          ]
        ) {
          acc[restaurantId].menus[item.menuId].categories[categoryId].dishes[
            dishId
          ] = {
            dishId,
            dishName: item.dishName,
            order: item.dishOrder ?? 0,
          };
        }
      }

      return acc;
    },
    {} as Record<string, MenuData>,
  );

  return groupedData || {};
};
