"use server";

import { getSessionUser } from "@/lib/actions/auth";
import { updateUserInfo } from "@/lib/db/actions/user";
import { revalidatePath } from "next/cache";
import { auth, unstable_update } from "@/auth";
import { ActionState } from "@/typings/actions";
import { z } from "zod";

const userInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  __timestamp: z.string().optional(), // Workaround field to prevent form state disappearing
});

export type UserInfoFormData = z.infer<typeof userInfoSchema>;

export const handleUpdateUserInfo = async (
  initialState: ActionState<UserInfoFormData>,
  formData: FormData,
): Promise<ActionState<UserInfoFormData>> => {
  const values = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    // This is a workaround to prevent the form state from disappearing after
    // submitting the form two or more times.
    __timestamp: String(Date.now()),
  };

  const result = userInfoSchema.safeParse(values);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      values,
      errors: fieldErrors,
    };
  }

  try {
    const user = await getSessionUser();
    const session = await auth();

    if (session) {
      const res = await unstable_update({
        user: {
          name: values.name,
          email: values.email,
        },
      });

      await updateUserInfo({
        name: values.name,
        email: values.email,
        id: user.userId,
      });

      console.log("res", res, values);

      revalidatePath("/profile");
    }

    return {
      values,
      errors: {},
    };
  } catch (error) {
    console.error("Error updating user info:", error);
    return {
      values,
      errors: {
        root: ["Failed to update profile. Please try again."],
      },
    };
  }
};
