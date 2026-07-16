import Holiday from "@/models/holidays.model";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();

        const holidays = await Holiday.find({isActive:true})
        .sort({holidayDate: 1,});


        return NextResponse.json({
            success: true,
            data: holidays,
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetched holidays"
        }, {
            status: 500
        });

    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const holiday = await Holiday.create(body);

        return NextResponse.json({
            success: true,
            message: "Holiday created successfully",
            data: holiday,
        }, {
            status: 201,
        });

    }catch (error: any) {
            console.error("Holiday Create Error:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: error.message || "Failed to create Holiday",
                },
                {
                    status: 500,
                }
            );
        }
    }
