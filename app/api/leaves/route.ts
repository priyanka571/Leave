import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";
import Leave from "@/models/leaveRequest.model";


// =======================
// POST - Apply Leave
// =======================

export async function POST(req: NextRequest) {

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


    // Only employee can apply leave
    if (user.role !== "employee") {

      return NextResponse.json(
        {
          message: "Only employee can apply leave"
        },
        {
          status: 403
        }
      );

    }



    const body = await req.json();


    const {
      leaveType,
      fromDate,
      toDate,
      days,
      reason,
      attachment
    } = body;



    if (
      !leaveType ||
      !fromDate ||
      !toDate ||
      !days ||
      !reason
    ) {

      return NextResponse.json(
        {
          message:"All fields are required"
        },
        {
          status:400
        }
      );

    }



    const leave = await Leave.create({

      employee:user._id,

      leaveType,

      fromDate,

      toDate,

      days,

      reason,

      attachment: attachment || "",

      status:"Pending"

    });



    return NextResponse.json(
      {
        success:true,
        message:"Leave applied successfully",
        leave
      },
      {
        status:201
      }
    );



  } catch(error:unknown){

    return NextResponse.json(
      {
        message:
        error instanceof Error
        ? error.message
        :"Internal Server Error"
      },
      {
        status:500
      }
    );

  }

}




// =======================
// GET - Fetch Leaves
// =======================

export async function GET() {

  try {

    await connectDB();


    const user = await getUserFromRequest();



    if(!user){

      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    let leaves;



    // Admin -> All employee leaves
    if(user.role === "admin"){

      leaves = await Leave.find()
      .populate(
        "employee",
        "firstName lastName email department designation"
      )
      .populate(
        "approvedBy",
        "firstName lastName"
      )
      .sort({
        createdAt:-1
      });


    }

    // Employee -> Only own leaves
    else {


      leaves = await Leave.find({
        employee:user._id
      })
      .populate(
        "employee",
        "firstName lastName email"
      )
      .sort({
        createdAt:-1
      });


    }



    return NextResponse.json(
      {
        success:true,
        count:leaves.length,
        leaves
      },
      {
        status:200
      }
    );



  } catch(error:unknown){

    return NextResponse.json(
      {
        message:
        error instanceof Error
        ? error.message
        :"Internal Server Error"
      },
      {
        status:500
      }
    );

  }

}