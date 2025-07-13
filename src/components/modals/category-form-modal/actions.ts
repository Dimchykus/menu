"use server";

import { createCategory, updateCategory } from "@/lib/db/actions/menu";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  id: z.string().optional(),
  menuId: z.number().min(1, "menu ID is required"),
});

export type CategoryFormState = z.infer<typeof categorySchema>;

export const handleCreateCategory = async (formData: FormData) => {
  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    id: formData.get("id")?.toString(),
    menuId: parseInt(formData.get("menuId")?.toString() || "", 10),
  };

  const parsed = categorySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      fields: raw,
      errors: fieldErrors,
    };
  }

  const { id, ...data } = raw;
  const { menuId } = raw;

  console.log("id", id);

  const category = id
    ? await updateCategory(parseInt(id), data)
    : await createCategory({ ...data, menuId });

  console.log("category", category);

  revalidatePath(`/profile`);

  if (!category) {
    return {
      error: "Failed to save category",
      fields: raw,
      success: false,
    };
  }

  return { fields: raw, success: true, errors: null };
};
