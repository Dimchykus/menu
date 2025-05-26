"use server";

import { createRestaurant } from "@/lib/db/actions/menu";
import { z } from "zod";

export const handleCreateRestaurant = async (
  _: unknown,
  formData: FormData,
) => {
  const restaurantSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
  });

  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
  };

  const parsed = restaurantSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      fieldErrors,
    };
  }

  const restaurant = await createRestaurant(raw);

  if (!restaurant) {
    return {
      error: "Failed to create restaurant",
      restaurant: null,
      success: false,
    };
  }

  return { restaurant, success: true };
};
