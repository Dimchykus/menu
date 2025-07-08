"use server";

import { login } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export const handleSignIn = async (formData: FormData) => {
  try {
    await login(formData);
  } catch (error) {
    console.error("Signin error:", error);
  }

  redirect("/profile");
};
