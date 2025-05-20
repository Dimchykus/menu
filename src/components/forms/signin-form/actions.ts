"use server";

import { login } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export const handleSignIn = async (formData: FormData) => {
  await login(formData);

  redirect("/");
};
