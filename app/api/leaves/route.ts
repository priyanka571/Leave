import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";
import Leave from "@/models/leaveRequest.model";
import Holiday from "@/models/holidays.model"


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
    function isWeekend(date: Date) {
      const day = date.getDay();

      return day === 0 || day === 6;
    }




    const body = await req.json();


    const {
      leaveType,
      fromDate,
      toDate,
      days,
      duration,
      halfDayType,
      reason,
      attachment
    } = body;



    if (
      !leaveType ||
      !fromDate ||
      !toDate ||
      !reason
    ) {

      return NextResponse.json(
        {
          message: "All fields are required"
        },
        {
          status: 400
        }
      );

    }

    const leaveDuration = duration || "Full Day";



    let totalDays = 0;

    const current = new Date(fromDate);
    const end = new Date(toDate);

    while (current <= end) {

      const checkDate = new Date(current);

      checkDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(checkDate);
      nextDate.setDate(nextDate.getDate() + 1);

      const holiday = await Holiday.findOne({
        holidayDate: {
          $gte: checkDate,
          $lt: nextDate,
        },
      });

      if (!isWeekend(current) && !holiday) {
        totalDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    if (leaveDuration === "Half Day") {
      totalDays = 0.5;
    }



    if (leaveDuration === "Full Day" && totalDays === 0) {
      return NextResponse.json(
        {
          message:
            "The selected dates are weekends or holidays. Please choose working days."
        },
        {
          status: 400,
        }
      );
    }
    const existingLeave = await Leave.findOne({
      employee: user._id,
      status: { $ne: "Rejected" }, // Rejected leave ko ignore karo
      $or: [
        {
          fromDate: { $lte: new Date(toDate) },
          toDate: { $gte: new Date(fromDate) },
        },
      ],
    });

    if (existingLeave) {
      return NextResponse.json(
        {
          message:
            "You have already applied for leave during the selected date(s).",
        },
        {
          status: 400,
        }
      );
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    const today = new Date();

    // Sirf date compare karni hai, time nahi
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // Past date check
    if (startDate < today) {
      return NextResponse.json(
        {
          message: "You cannot apply leave for past dates.",
        },
        {
          status: 400,
        }
      );
    }

    // From Date > To Date check
    if (startDate > endDate) {
      return NextResponse.json(
        {
          message: "From Date cannot be later than To Date.",
        },
        {
          status: 400,
        }
      );
    }



    const leave = await Leave.create({

      employee: user._id,

      leaveType,

      fromDate,

      toDate,

      days: totalDays,
      duration: leaveDuration,
      halfDayType: leaveDuration === "Half Day" ? halfDayType : null,

      reason,

      attachment: attachment || "",

      status: "Pending"

    });



    return NextResponse.json(
      {
        success: true,
        message: "Leave applied successfully",
        leave
      },
      {
        status: 201
      }
    );



  } catch (error: unknown) {

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




// =======================
// GET - Fetch Leaves
// =======================

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



    let leaves;



    // Admin -> All employee leaves
    if (user.role === "admin") {

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
          createdAt: -1
        });


    }

    // Employee -> Only own leaves
    else {


      leaves = await Leave.find({
        employee: user._id
      })
        .populate(
          "employee",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1
        });


    }



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



  } catch (error: unknown) {

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