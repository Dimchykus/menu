"use server";

import { db } from "../index";
import {
  InsertUser,
  SelectUser,
  userTable,
  authTable,
  SelectUserAuth,
  InsertUserAuth,
} from "../schema/user";
import { eq } from "drizzle-orm";

export async function createUser(data: InsertUser) {
  await db.insert(userTable).values(data).returning();
}

export async function signUp(data: InsertUser & InsertUserAuth) {
  const user = await db.insert(userTable).values(data).returning();

  const auth = await db
    .insert(authTable)
    .values({
      login: data.email,
      password: data.password,
      userId: user[0].id,
      provider: data.provider,
    })
    .returning();

  return { ...user[0], ...auth[0] };
}

export async function getUserById(id: SelectUser["id"]): Promise<SelectUser> {
  return db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .then((result) => result[0] || null);
}

export async function getUserAuthByLogin(
  login: InsertUserAuth["login"],
): Promise<SelectUserAuth | null> {
  return db
    .select()
    .from(authTable)
    .where(eq(authTable.login, login))
    .limit(1)
    .then((result) => result[0] || null);
}

export const updateUserInfo = async (userData: InsertUser & { id: number }) => {

  await db.update(userTable).set(userData).where(eq(userTable.id, userData.id));
};
