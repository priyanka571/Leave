// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";
import { generateAccessAndRefreshTokens } from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, username, password } = await req.json();

    if (!(email || username)) {
      return NextResponse.json(
        { message: "Email or username required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      $or: [
        { email },
        { username }
      ],
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isPasswordCorrect =
      await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }


    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(
        user._id.toString()
      );


    const loggedInUser =
      await User.findById(user._id)
      .select("-password -refreshToken");


    const response = NextResponse.json(
      {
        data: loggedInUser,
        message: "Login successful",
      },
      {
        status: 200,
      }
    );


    response.cookies.set(
      "accessToken",
      accessToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );


    response.cookies.set(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );


    return response;


  } catch (error) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}