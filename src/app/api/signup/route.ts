import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/db/actions/user";
import { InsertUser, InsertUserAuth } from "@/lib/db/schema/user";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { password, ...data }: InsertUser & InsertUserAuth =
      await request.json();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await signUp({ ...data, password: hashedPassword });

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
