import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { getUserFromRequest } from "@/utils/auth";
import Notification from  "@/models/notification.model";


export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json({
                success: false, message: "Unauthorized",
            },
                { status: 401 });
        }
        if (user.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            },
                { status: 403 });
        } await connectDB();
        const body = await req.json();
        const { title, message, type } = body;
        const notification = await Notification.create({
            title, message,
            type,
            createdBy: user._id
        });
        return NextResponse.json({
            success: true,
            message: "Notification created",
            data: notification
        },
            { status: 201 });
    } catch (error) {
        return NextResponse.json({
            success: false, message: "Failed to create notification"
        },
            { status: 500 });
    }
}


export async function GET(req: NextRequest) {

    try {

        const user = await getUserFromRequest();


        if(!user){

            return NextResponse.json(
                {
                    success:false,
                    message:"Unauthorized"
                },
                {status:401}
            );

        }


        await connectDB();


        const notifications = await Notification.find()
        .sort({
            createdAt:-1
        })
        .populate(
            "createdBy",
            "name email"
        );


        return NextResponse.json(
            {
                success:true,
                data:notifications
            },
            {status:200}
        );


    } catch(error){

        return NextResponse.json(
            {
                success:false,
                message:"Failed to fetch notifications"
            },
            {status:500}
        );

    }

}