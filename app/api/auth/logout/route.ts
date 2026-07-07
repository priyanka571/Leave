// src/app/api/auth/logout/route.ts

import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const refreshToken =
      req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          message: "User already logged out",
        },
        {
          status: 401,
        }
      );
    }


    // Remove refresh token from database
    await User.findOneAndUpdate(
      {
        refreshToken,
      },
      {
        $set: {
          refreshToken: null,
        },
      }
    );


    const response = NextResponse.json(
      {
        data: {},
        message: "Logout successful",
      },
      {
        status: 200,
      }
    );


    // Clear access token cookie
    response.cookies.set(
      "accessToken",
      "",
      {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );


    // Clear refresh token cookie
    response.cookies.set(
      "refreshToken",
      "",
      {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );


    return response;


  } catch (error: unknown) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Logout failed",
      },
      {
        status: 500,
      }
    );
  }
}