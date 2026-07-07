// app/api/user/change-password/route.js

import { NextResponse, NextRequest } from "next/server";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";
import { verifyToken } from "@/utils/auth";

export async function PATCH(request: NextRequest) {
  await connectDB();

  try {
    const { oldPassword, newPassword } = await request.json();

    const userData = await verifyToken();

    const user = await User.findById(userData._id);

    const isPasswordCorrect =
      await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: 400 }
      );
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}