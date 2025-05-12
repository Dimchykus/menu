import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/db/actions/user";
import { InsertUser } from "@/lib/db/schema/user";

export async function POST(request: NextRequest) {
  try {
    const data: InsertUser = await request.json();

    if (!data.name || !data.email || !data.age) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and age are required" },
        { status: 400 }
      );
    }

    await createUser(data);

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
