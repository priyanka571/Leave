import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Notification from "@/models/notification.model";
import { getUserFromRequest } from "@/utils/auth";


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const user = await getUserFromRequest();

    if (!user) {
      return NextResponse.json(
        {
          success:false,
          message:"Unauthorized"
        },
        {
          status:401
        }
      );
    }


    if(user.role !== "admin"){
      return NextResponse.json(
        {
          success:false,
          message:"Only admin allowed"
        },
        {
          status:403
        }
      );
    }


    await connectDB();


    const { id } = await params;


    const body = await req.json();


    const notification =
      await Notification.findByIdAndUpdate(
        id,
        body,
        {
          returnDocument:"after"
        }
      );


    if(!notification){
      return NextResponse.json(
        {
          success:false,
          message:"Notification not found"
        },
        {
          status:404
        }
      );
    }


    return NextResponse.json(
      {
        success:true,
        message:"Notification updated",
        data:notification
      }
    );


  } catch(error:any){

    console.log(error);

    return NextResponse.json(
      {
        success:false,
        message:error.message
      },
      {
        status:500
      }
    );

  }
}




export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {


        const user = await getUserFromRequest();


        if (!user || user.role !== "admin") {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized"
                },
                {
                    status: 403
                }
            );

        }


        await connectDB();
        const{id} = await params;


        await Notification.findByIdAndDelete(
           id
        );


        return NextResponse.json({

            success: true,

            message: "Notification deleted"

        });



    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete notification"
            },
            {
                status: 500
            }
        );

    }

}