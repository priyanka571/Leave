import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Holiday from "@/models/holidays.model";

interface Params {
    params: Promise<{
        id: string;
    }>
}

export async function GET(req: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = await params;
        const holiday = await Holiday.findById(id);

        if (!holiday) {
            return NextResponse.json({
                success: false,
                message: "holiday not found",
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            success: true,
            data: holiday,
        })
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        }, {
            status: 500,
        })
    }
}


export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const holiday = await Holiday.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!holiday) {
            return NextResponse.json({
                success: false,
                message: "Holiday not found",
            }, {
                status: 404
            });

        }
        return NextResponse.json({
            success: true,
            message: "Holiday updated successfully",
            data: holiday,
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Update Failed",
        }, {
            status: 500
        });
    }
}


export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = await params;
        const holiday = await Holiday.findByIdAndDelete(id);
        if (!holiday) {
            return NextResponse.json({
                success: false,
                message: "Holiday not found",
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            success: true,
            message: "Holiday deleted Successfully",

        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "something went wrong",
        }, { status: 500 });
    }
}

