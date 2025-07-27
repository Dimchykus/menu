"use server";

import { signup } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export const handleSignUp = async (formData: FormData) => {
  try {
    console.log("data", formData);
    await signup(formData);
  } catch (error) {
    console.error("Signup error:", error);
  }

  redirect("/signin");
};
