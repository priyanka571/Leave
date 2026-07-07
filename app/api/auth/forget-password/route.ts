import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }


    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }


    // Generate reset token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");


    // Save hashed token in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");


    // Token expiry 15 minutes
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;


    await user.save();
    console.log("Saved token:", user.resetPasswordToken);
    console.log("Saved expiry:", user.resetPasswordExpire);


    // In production send this token through email
    return NextResponse.json(
      {
        message: "Reset token generated",
        resetToken, // remove this after email setup
      },
      {
        status: 200,
      }
    );


  } catch (error: unknown) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}