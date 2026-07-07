// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      password,
      role,
    } = body;


    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }


    const existingUser = await User.findOne({
      email,
    });


    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 409,
        }
      );
    }


    const user = await User.create({
      name,
      email,
      password,
      role,
    });


    // password response me nahi bhejna
    const createdUser = await User.findById(user._id)
      .select("-password");


    return NextResponse.json(
      {
        success: true,
        user: createdUser,
        message: "User registered successfully",
      },
      {
        status: 201,
      }
    );


  } catch (error: unknown) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}