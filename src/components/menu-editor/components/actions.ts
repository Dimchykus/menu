"use server";

import {
  deleteCategory,
  deleteDish,
  deletedRestaurant,
  deleteMenu,
} from "@/lib/db/actions/menu";
import { revalidatePath } from "next/cache";

export const handleDeleteRestaurant = async (id: number) => {
  await deletedRestaurant(id);

  revalidatePath("/profile");
};

export const handleDeleteMenu = async (id: number) => {
  await deleteMenu(id);

  revalidatePath("/profile");
};

export const handleDeleteCategory = async (id: number) => {
  await deleteCategory(id);

  revalidatePath("/profile");
};

export const handleDeleteDish = async (id: number) => {
  await deleteDish(id);

  revalidatePath("/profile");
};
