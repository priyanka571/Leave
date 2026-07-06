import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/utils/auth";

export async function GET() {
  const user = await getUserFromRequest();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user,
  });
}