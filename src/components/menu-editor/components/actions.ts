"use server";

import { deletedRestaurant, deleteMenu } from "@/lib/db/actions/menu";
import { revalidatePath } from "next/cache";

export const handleDeleteRestaurant = async (id: number) => {
  await deletedRestaurant(id);

  revalidatePath("/profile");
};

export const handleDeleteMenu = async (id: number) => {
  await deleteMenu(id);

  revalidatePath("/profile");
};
