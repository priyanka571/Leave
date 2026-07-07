import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";


export async function GET(
  req: NextRequest,
  {
    params,
  }:  { params: Promise<{ id: string }> }
) {
   const { id } = await params;

  try {

    await connectDB();


    const user = await getUserFromRequest();


    if (!user) {

      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }


    // Employee sirf apni profile access karega
    if (
      user.role === "employee" &&
      user._id.toString() !== id
    ) {

      return NextResponse.json(
        {
          message:"You cannot access another profile"
        },
        {
          status:403
        }
      );

    }



    const employee = await User.findById(id)
      .select("-password -refreshToken");
      console.log("employee:", employee);



    if(!employee){

      return NextResponse.json(
        {
          message:"Employee not found"
        },
        {
          status:404
        }
      );

    }



    return NextResponse.json(
      {
        success:true,
        employee
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
        :"Something went wrong"
      },
      {
        status:500
      }
    );

  }

}


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();

    const loggedInUser = await getUserFromRequest();

    if (!loggedInUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Sirf admin update kar sakta hai
    if (loggedInUser.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Sirf allowed fields
    const updateData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      department: body.department,
      designation: body.designation,
      joiningDate: body.joiningDate,
      manager: body.manager,
      salary: body.salary,
      gender: body.gender,
      dob: body.dob,
      address: body.address,
      profileImage: body.profileImage,
      status: body.status,
      remainingLeaves: body.remainingLeaves,
    };

    // undefined values hata do
    Object.keys(updateData).forEach((key) => {
      if (
        updateData[key as keyof typeof updateData] === undefined
      ) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    const employee = await User.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -refreshToken");

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Employee updated successfully",
        employee,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();

    const loggedInUser = await getUserFromRequest();

    if (!loggedInUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Sirf admin delete kar sakta hai
    if (loggedInUser.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const employee = await User.findByIdAndDelete(id);

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Employee deleted successfully",
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