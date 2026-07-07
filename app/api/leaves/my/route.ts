import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";
import Leave from "@/models/leaveRequest.model";

export async function GET() {

  try {

    await connectDB();


    const user = await getUserFromRequest();


    if (!user) {

      return NextResponse.json(
        {
          message: "Unauthorized"
        },
        {
          status: 401
        }
      );

    }



    const leaves = await Leave.find({
      employee: user._id
    })
    .populate(
      "approvedBy",
      "firstName lastName email"
    )
    .sort({
      createdAt: -1
    });



    return NextResponse.json(
      {
        success: true,
        count: leaves.length,
        leaves
      },
      {
        status: 200
      }
    );



  } catch(error: unknown) {


    return NextResponse.json(
      {
        message:
          error instanceof Error
          ? error.message
          : "Internal Server Error"
      },
      {
        status: 500
      }
    );


  }

}