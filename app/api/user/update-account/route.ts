// app/api/user/update/route.js

import { NextResponse, NextRequest } from "next/server";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";
import { verifyToken } from "@/utils/auth";
import { uploadToCloudinary } from "@/utils/cloudinary";

export async function PATCH(request:NextRequest) {
  await connectDB();

  try {
    const { fullName, email } = await request.json();

    if (!fullName || !email) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const authUser = await verifyToken();

    const user = await User.findByIdAndUpdate(
      authUser._id,
      {
        fullName,
        email,
      },
      {
        new: true,
      }
    ).select("-password");

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}


