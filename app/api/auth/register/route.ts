// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      department,
      password,
      designation,
      joiningDate,
      manager,
      salary,
      gender,
      dob,
      address,
      profileImage,
      role,
      status,
      remainingLeaves,
    } = body;


    if (
       !employeeId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !department ||
      !password ||
      !designation ||
      !joiningDate ||
      !manager ||
      !salary ||
      !gender ||
      !dob ||
      !address ||
      !status ||
      remainingLeaves === undefined
    ) {
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
     $or:[
        {email},
        // {employeeId},
        // {phone}
      ]
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
      employeeId,
      firstName,
      lastName,
      // email,
       email: email.toLowerCase().trim(),
      phone,
      department,
      password,
      designation,
      joiningDate,
      manager,
      salary,
      gender,
      dob,
      address,
      profileImage,
      role: role || "employee",
       status,
      // remainingLeaves
    });


    
    const createdUser = await User.findById(user._id)
      .select("-password -refreshToken");


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