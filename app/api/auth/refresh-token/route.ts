// app/api/auth/refresh-token/route.js

import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt,{Secret} from "jsonwebtoken";
import User from "@/models/User.model";
import {connectDB} from "@/utils/db";
import { generateAccessAndRefreshTokens } from "@/utils/auth";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const cookieStore = await cookies();

    const body = await request.json().catch(() => ({}));

    const incomingRefreshToken =
      cookieStore.get("refreshToken")?.value ||
      body.refreshToken;

    if (!incomingRefreshToken) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    );

    if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return NextResponse.json(
        { message: "Refresh token expired or already used" },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(
      {
        accessToken,
        refreshToken,
        message: "Access token refreshed",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Invalid refresh token" },
      { status: 401 }
    );
  }
}