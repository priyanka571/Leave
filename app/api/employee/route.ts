import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User.model";
import { getUserFromRequest } from "@/utils/auth";

export async function GET() {
  try {
    await connectDB();

    const loggedInUser = await getUserFromRequest();

    // Check authentication
    if (!loggedInUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Only admin can access
    if (loggedInUser.role !== "admin") {
      return NextResponse.json(
        {
          message: "Access denied",
        },
        {
          status: 403,
        }
      );
    }

    // Fetch all employees
    const employees = await User.find({
      role: "employee",
    }).select("-password -refreshToken");

    return NextResponse.json(
      {
        success: true,
        count: employees.length,
        employees,
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
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}