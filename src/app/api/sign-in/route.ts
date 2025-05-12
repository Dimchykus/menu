import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserAuthByLogin } from "@/lib/db/actions/user";
import { InsertUser, InsertUserAuth } from "@/lib/db/schema/user";

export async function POST(request: NextRequest) {
  try {
    const data: {
      password: string;
      login: InsertUserAuth["login"];
    } = await request.json();

    const userAuth = await getUserAuthByLogin(data.login);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
