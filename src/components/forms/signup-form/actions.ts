"use server";

import { signup } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export const handleSignUp = async (formData: FormData) => {
  await signup(formData);

  redirect("/signin");
};
