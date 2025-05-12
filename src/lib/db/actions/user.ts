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
  await db.insert(userTable).values(data);
}

export async function getUserById(
  id: SelectUser["id"]
): Promise<Array<SelectUser>> {
  return db.select().from(userTable).where(eq(userTable.id, id));
}

export async function getUserAuthByLogin(
  id: InsertUserAuth["login"]
): Promise<SelectUserAuth | null> {
  return db
    .select()
    .from(authTable)
    .where(eq(authTable.userId, id))
    .limit(1)
    .then((result) => result[0] || null);
}
