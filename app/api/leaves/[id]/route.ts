// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/utils/db";
// import { getUserFromRequest } from "@/utils/auth";
// import Leave from "@/models/leaveRequest.model";
// import User from "@/models/User.model";

// //for checkingpurpose by me
// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;

//   await connectDB();

//   const user = await getUserFromRequest();

//   if (!user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const leave = await Leave.findById(id)
//     .populate("employee", "firstName lastName email department designation")
//     .populate("approvedBy", "firstName lastName");

//   if (!leave) {
//     return NextResponse.json(
//       { message: "Leave not found" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({
//     success: true,
//     leave,
//   });
// }


// // end here



// // ============================
// // PATCH - Approve / Reject Leave
// // ============================

// export async function PATCH(
//   req: NextRequest,
//   {
//     params,
//   }: {
//     params: Promise<{ id: string }>;
//   }
// ) {

//   const { id } = await params;


//   try {

//     await connectDB();


//     const user = await getUserFromRequest();



//     if (!user) {

//       return NextResponse.json(
//         {
//           message:"Unauthorized"
//         },
//         {
//           status:401
//         }
//       );

//     }



//     // Only admin can approve/reject
//     if(user.role !== "admin"){

//       return NextResponse.json(
//         {
//           message:"Only admin can update leave status"
//         },
//         {
//           status:403
//         }
//       );

//     }



//     const body = await req.json();


//     const {
//       status,
//       rejectedReason,
//       comments
//     } = body;



//     if(
//       !["Approved","Rejected"].includes(status)
//     ){

//       return NextResponse.json(
//         {
//           message:"Invalid leave status"
//         },
//         {
//           status:400
//         }
//       );

//     }



//     const updateData:any = {

//       status,

//       comments: comments || ""

//     };



//     if(status === "Approved"){

//       updateData.approvedBy = user._id;

//       updateData.approvedDate = new Date();

//     }



//     if(status === "Rejected"){

//       if(!rejectedReason){

//         return NextResponse.json(
//           {
//             message:"Reject reason is required"
//           },
//           {
//             status:400
//           }
//         );

//       }


//       updateData.rejectedReason = rejectedReason;

//     }





//     const leave = await Leave.findByIdAndUpdate(
//       id,
//       {
//         $set:updateData
//       },
//       {
//         new:true
//       }
//     )
//     .populate(
//       "employee",
//       "firstName lastName email department"
//     )
//     .populate(
//       "approvedBy",
//       "firstName lastName"
//     );




//     if(!leave){

//       return NextResponse.json(
//         {
//           message:"Leave request not found"
//         },
//         {
//           status:404
//         }
//       );

//     }



//     return NextResponse.json(
//       {
//         success:true,
//         message:`Leave ${status.toLowerCase()} successfully`,
//         leave
//       },
//       {
//         status:200
//       }
//     );



//   } catch(error:unknown){

//     return NextResponse.json(
//       {
//         message:
//         error instanceof Error
//         ? error.message
//         :"Internal Server Error"
//       },
//       {
//         status:500
//       }
//     );

//   }

// }




// // ============================
// // DELETE - Cancel Leave
// // ============================

// export async function DELETE(
//   req:NextRequest,
//   {
//     params,
//   }:{
//     params:Promise<{id:string}>
//   }
// ){

//   const {id}=await params;


//   try{

//     await connectDB();


//     const user = await getUserFromRequest();



//     if(!user){

//       return NextResponse.json(
//         {
//           message:"Unauthorized"
//         },
//         {
//           status:401
//         }
//       );

//     }




//     const leave = await Leave.findById(id);



//     if(!leave){

//       return NextResponse.json(
//         {
//           message:"Leave not found"
//         },
//         {
//           status:404
//         }
//       );

//     }




//     // Employee sirf apni leave cancel kar sakta hai

//     if(
//       user.role === "employee" &&
//       leave.employee.toString() !== user._id.toString()
//     ){

//       return NextResponse.json(
//         {
//           message:"You cannot cancel this leave"
//         },
//         {
//           status:403
//         }
//       );

//     }





//     // Approved leave delete nahi hogi

//     if(
//       leave.status === "Approved"
//     ){

//       return NextResponse.json(
//         {
//           message:"Approved leave cannot be deleted"
//         },
//         {
//           status:400
//         }
//       );

//     }




//     await Leave.findByIdAndDelete(id);




//     return NextResponse.json(
//       {
//         success:true,
//         message:"Leave deleted successfully"
//       },
//       {
//         status:200
//       }
//     );




//   }catch(error:unknown){

//     return NextResponse.json(
//       {
//         message:
//         error instanceof Error
//         ? error.message
//         :"Internal Server Error"
//       },
//       {
//         status:500
//       }
//     );

//   }

// }




import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";
import Leave from "@/models/leaveRequest.model";
import User from "@/models/User.model";

//for checkingpurpose by me
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();

  const user = await getUserFromRequest();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const leave = await Leave.findById(id)
    .populate("employee", "firstName lastName email department designation")
    .populate("approvedBy", "firstName lastName");

  if (!leave) {
    return NextResponse.json(
      { message: "Leave not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    leave,
  });
}


// end here



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

  try {

    await connectDB();


    const { id } = await params;


    const body = await req.json();

    const {
      status,
      rejectedReason,
      comments
    } = body;



    const leave = await Leave.findById(id);



    if (!leave) {

      return NextResponse.json(
        {
          message: "Leave request not found"
        },
        {
          status: 404
        }
      );

    }



    if (leave.status !== "Pending") {

      return NextResponse.json(
        {
          message: "Leave already processed"
        },
        {
          status: 400
        }
      );

    }



    /*
      APPROVE LOGIC
    */

    if (status === "Approved") {


      const employee = await User.findById(
        leave.employee
      );


      if (!employee) {

        return NextResponse.json(
          {
            message:"Employee not found"
          },
          {
            status:404
          }
        );

      }



      const leaveDays = leave.isHalfDay
        ? 0.5
        : leave.days;



      switch(leave.leaveType){


        case "Casual Leave":

        case "Sick Leave":

        case "Earned Leave":


          if(
            employee.leaveBalance.paidLeaves.remaining 
            < leaveDays
          ){

            return NextResponse.json(
              {
                message:"Insufficient leave balance"
              },
              {
                status:400
              }
            );

          }



          employee.leaveBalance.paidLeaves.used 
          += leaveDays;



          employee.leaveBalance.paidLeaves.remaining =
          employee.leaveBalance.paidLeaves.total -
          employee.leaveBalance.paidLeaves.used;


          break;



        case "Unpaid Leave":


          employee.leaveBalance.unpaidLeave.used
          += leaveDays;


          break;




        case "Maternity Leave":


          employee.leaveBalance.maternityLeave.used
          += leaveDays;


          break;




        case "Paternity Leave":


          employee.leaveBalance.paternityLeave.used
          += leaveDays;


          break;



      }



      await employee.save();



      leave.status="Approved";

      leave.approvedDate=new Date();



    }



    /*
      REJECT LOGIC
    */


    if(status === "Rejected"){


      if(!rejectedReason){

        return NextResponse.json(
          {
            message:"Reject reason required"
          },
          {
            status:400
          }
        );

      }


      leave.status="Rejected";

      leave.rejectedReason=rejectedReason;


    }



    leave.comments = comments || "";



    await leave.save();



    return NextResponse.json(
      {
        success:true,
        message:`Leave ${status} successfully`,
        leave
      },
      {
        status:200
      }
    );



  }
  catch(error){


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
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {

  const { id } = await params;


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




    const leave = await Leave.findById(id);



    if (!leave) {

      return NextResponse.json(
        {
          message: "Leave not found"
        },
        {
          status: 404
        }
      );

    }




    // Employee sirf apni leave cancel kar sakta hai

    if (
      user.role === "employee" &&
      leave.employee.toString() !== user._id.toString()
    ) {

      return NextResponse.json(
        {
          message: "You cannot cancel this leave"
        },
        {
          status: 403
        }
      );

    }





    // Approved leave delete nahi hogi

    if (
      leave.status === "Approved"
    ) {

      return NextResponse.json(
        {
          message: "Approved leave cannot be deleted"
        },
        {
          status: 400
        }
      );

    }




    await Leave.findByIdAndDelete(id);




    return NextResponse.json(
      {
        success: true,
        message: "Leave deleted successfully"
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