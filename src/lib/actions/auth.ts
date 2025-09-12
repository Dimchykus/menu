"use server";

import { auth, signIn, signOut } from "../../auth";
import { getUserById } from "../db/actions/user";

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const login = async (formData: FormData) => {
  await signIn("credentials", formData);
};

export const signup = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const body = { ...data, provider: "web" };

  const response = await fetch(`${baseUrl}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Signup failed: ${response.statusText}`);
  }

  const result = await response.json();

  return result;
};

export const logout = async () => {
  await signOut({ redirectTo: "/signin" });
};

export const getSessionUser = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not logged in");
  }

  return session.user;
};

export const getUser = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not logged in");
  }

  const user = await getUserById(session.user.userId);

  return user;
};
