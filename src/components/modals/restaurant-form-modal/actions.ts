"use server";

import { createRestaurant, updateRestaurant } from "@/lib/db/actions/menu";
import { checkSubscriptionLimit } from "@/lib/actions/menu";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const handleCreateRestaurant = async (
  _: unknown,
  formData: FormData,
) => {
  const restaurantSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
    id: z.string().optional(),
  });

  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    address: formData.get("address")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    id: formData.get("id")?.toString(),
  };

  const parsed = restaurantSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      fieldErrors,
    };
  }

  const { id, ...data } = parsed.data;

  if (!id) {
    const limitCheck = await checkSubscriptionLimit("restaurant");

    if (!limitCheck.success) {
      return {
        success: false,
        error: limitCheck.error,
        fieldErrors: {},
      };
    }
  }

  const restaurant = id
    ? await updateRestaurant(parseInt(id), data)
    : await createRestaurant(data);

  revalidatePath(`/restaurant/${id}`);

  if (!restaurant) {
    return {
      error: "Failed to save restaurant",
      restaurant: null,
      success: false,
    };
  }

  return { restaurant, success: true };
};
