"use server";

import { createMenu, updateMenu } from "@/lib/db/actions/menu";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const menuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  id: z.string().optional(),
  restaurantId: z.number().min(1, "Restaurant ID is required"),
});

export type MenuFormState = z.infer<typeof menuSchema>;

export const handleCreateMenu = async (formData: FormData) => {
  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    id: formData.get("id")?.toString(),
    restaurantId: parseInt(formData.get("restaurantId")?.toString() || "", 10),
  };

  const parsed = menuSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      fields: raw,
      errors: fieldErrors,
    };
  }

  const { id, ...data } = raw;
  const { restaurantId } = raw;

  console.log("id", id);

  const menu = id
    ? await updateMenu(parseInt(id), data)
    : await createMenu({ ...data, restaurantId });

  revalidatePath(`/profile`);

  if (!menu) {
    return {
      error: "Failed to save menu",
      fields: raw,
      success: false,
    };
  }

  return { fields: raw, success: true, errors: null };
};
