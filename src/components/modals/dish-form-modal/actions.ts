"use server";

import { createImage } from "@/lib/actions/images";
import { createDish, getDishById, updateDish } from "@/lib/db/actions/menu";
import { revalidatePath } from "next/cache";

export const handleUpdateDish = async (formData: FormData) => {
  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    id: parseInt(formData.get("id")?.toString() || "", 10),
    price: parseInt(formData.get("price")?.toString() || "", 10),
    categoryId: parseInt(formData.get("categoryId")?.toString() || "", 10),
    image: "",
  };

  const { id, ...data } = raw;
  const { categoryId } = raw;

  if (raw.id) {
    const dish = await getDishById(raw.id);

    if (!dish) {
      return new Error("dish not found");
    }

    if (dish.image) {
      if (formData.getAll("image")?.length > 0) {
        const newImage = await createImage(formData, [dish.image]);

        data.image = newImage[0];
      } else {
        data.image = dish.image;
      }
    }
  }

  const dish = id
    ? await updateDish(id, data)
    : await createDish({ ...data, categoryId });

  revalidatePath(`/profile`);

  if (!dish) {
    return {
      error: "Failed to save dish",
      fields: raw,
      success: false,
    };
  }

  return { fields: raw, success: true, errors: null };
};
