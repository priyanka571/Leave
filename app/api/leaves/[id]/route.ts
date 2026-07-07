import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";
import Leave from "@/models/leaveRequest.model";


// ============================
// PATCH - Approve / Reject Leave
// ============================

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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



    // Only admin can approve/reject
    if(user.role !== "admin"){

      return NextResponse.json(
        {
          message:"Only admin can update leave status"
        },
        {
          status:403
        }
      );

    }



    const body = await req.json();


    const {
      status,
      rejectedReason,
      comments
    } = body;



    if(
      !["Approved","Rejected"].includes(status)
    ){

      return NextResponse.json(
        {
          message:"Invalid leave status"
        },
        {
          status:400
        }
      );

    }



    const updateData:any = {

      status,

      comments: comments || ""

    };



    if(status === "Approved"){

      updateData.approvedBy = user._id;

      updateData.approvedDate = new Date();

    }



    if(status === "Rejected"){

      if(!rejectedReason){

        return NextResponse.json(
          {
            message:"Reject reason is required"
          },
          {
            status:400
          }
        );

      }


      updateData.rejectedReason = rejectedReason;

    }





    const leave = await Leave.findByIdAndUpdate(
      id,
      {
        $set:updateData
      },
      {
        new:true
      }
    )
    .populate(
      "employee",
      "firstName lastName email department"
    )
    .populate(
      "approvedBy",
      "firstName lastName"
    );




    if(!leave){

      return NextResponse.json(
        {
          message:"Leave request not found"
        },
        {
          status:404
        }
      );

    }



    return NextResponse.json(
      {
        success:true,
        message:`Leave ${status.toLowerCase()} successfully`,
        leave
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




// ============================
// DELETE - Cancel Leave
// ============================

export async function DELETE(
  req:NextRequest,
  {
    params,
  }:{
    params:Promise<{id:string}>
  }
){

  const {id}=await params;


  try{

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




    const leave = await Leave.findById(id);



    if(!leave){

      return NextResponse.json(
        {
          message:"Leave not found"
        },
        {
          status:404
        }
      );

    }




    // Employee sirf apni leave cancel kar sakta hai

    if(
      user.role === "employee" &&
      leave.employee.toString() !== user._id.toString()
    ){

      return NextResponse.json(
        {
          message:"You cannot cancel this leave"
        },
        {
          status:403
        }
      );

    }





    // Approved leave delete nahi hogi

    if(
      leave.status === "Approved"
    ){

      return NextResponse.json(
        {
          message:"Approved leave cannot be deleted"
        },
        {
          status:400
        }
      );

    }




    await Leave.findByIdAndDelete(id);




    return NextResponse.json(
      {
        success:true,
        message:"Leave deleted successfully"
      },
      {
        status:200
      }
    );




  }catch(error:unknown){

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