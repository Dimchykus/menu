"use server";

import { createMenu } from "@/lib/db/actions/menu";
import { InsertMenu } from "@/lib/db/schema/menu";
import { revalidatePath } from "next/cache";
import z from "zod";

const menuFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  restaurantId: z.number(),
});

export type MenuFormState = z.infer<typeof menuFormSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleCreateMenu = async (_: any, payload: FormData) => {
  const data = Object.fromEntries(payload.entries());

  const formData: InsertMenu = {
    name: data.name as string,
    description: data.description as string,
    restaurantId: parseInt(data.restaurantId as string, 10),
    // restaurantId: 6,
  };

  try {
    const parsed = menuFormSchema.safeParse(formData);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;

      return {
        success: false,
        fields: formData,
        errors,
      };
    }

    const res = await createMenu(formData);

    console.log("data", data, res);

    revalidatePath("/profile");

    return {
      success: true,
      fields: formData, 
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      fields: formData,
      errors: null,
    };
  }
};
