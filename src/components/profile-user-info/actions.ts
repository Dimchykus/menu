"use server";

import { getUser } from "@/lib/actions/auth";
import { updateUserInfo } from "@/lib/db/actions/user";
import { revalidatePath } from "next/cache";
import { auth, unstable_update } from "@/auth";

export const handleUpdateUserInfo = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const user = await getUser();

  await updateUserInfo({ name, email, id: user.userId });

  // Update Next Auth session
  const session = await auth();
  if (session) {
    await unstable_update({
      user: {
        name,
        email,
      },
    });
  }

  revalidatePath("/profile");
};
