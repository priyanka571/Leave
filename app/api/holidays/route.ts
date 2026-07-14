import Holiday from "@/models/holidays.model";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        // await connectDB();

        // const holidays = await Holiday.find({isActive:true})
        // .sort({holidayDate: 1,});

        const response = await fetch(
            `https://calendarific.com/api/v2/holidays?api_key=VOwQfRI6oWy9qiXnv08olQ5lgfiXQa7e&country=IN&year=2026`,
            {
                cache: "no-store",
            }

        );


        const data = await response.json();
        // console.log("NAGER DATA:", data);


        const holidays = data.response.holidays.map((item: any,index:number) => ({

            _id: `${item.date.iso}-${index}`,

            title: item.name,

            description: item.localName,

            holidayDate: item.date.iso,

            type: item.type?.includes("National holiday")
                ? "government"
                : "festival"

        }));
        // console.log("FINAL HOLIDAYS:", holidays);


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

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "failed to create Holiday",
        }, {
            status: 500
        });
    }
}