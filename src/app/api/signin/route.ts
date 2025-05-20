import { NextRequest, NextResponse } from "next/server";
import { getUserAuthByLogin, getUserById } from "@/lib/db/actions/user";
import { InsertUserAuth } from "@/lib/db/schema/user";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data: {
      password: InsertUserAuth["password"];
      email: InsertUserAuth["login"];
    } = await request.json();

    if (!data.email || !data.password) {
      console.log("Login and password are required", data);

      return NextResponse.json(
        { error: "Login and password are required" },
        { status: 400 },
      );
    }

    const userAuth = await getUserAuthByLogin(data.email);

    if (!userAuth) {
      console.log("Invalid login credentials");
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 401 },
      );
    }

    const doesPasswordMatch = await bcrypt.compare(
      data.password,
      userAuth.password,
    );

    if (!doesPasswordMatch) {
      console.log(
        "doesPasswordMatch",
        doesPasswordMatch,
        data.password,
        userAuth.password,
      );
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 401 },
      );
    }

    const userData = await getUserById(userAuth.userId);

    return NextResponse.json(
      {
        message: "Login successful",
        data: userData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
