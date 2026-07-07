import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";


export async function POST(req: NextRequest) {

  try {

    await connectDB();


    const {
      token,
      newPassword
    } = await req.json();


    if (!token || !newPassword) {

      return NextResponse.json(
        {
          message:
          "Token and new password are required",
        },
        {
          status:400,
        }
      );
    }


    // Hash incoming token
    const hashedToken =
      crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");



    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire:{
        $gt: Date.now(),
      },
    });



    if (!user) {

      return NextResponse.json(
        {
          message:
          "Invalid or expired reset token",
        },
        {
          status:400,
        }
      );

    }



    user.password = newPassword;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;


    await user.save();



    return NextResponse.json(
      {
        message:
        "Password reset successfully",
      },
      {
        status:200,
      }
    );



  } catch(error: unknown){

    return NextResponse.json(
      {
        message:
        error instanceof Error
        ? error.message
        : "Reset password failed",
      },
      {
        status:500,
      }
    );

  }

}