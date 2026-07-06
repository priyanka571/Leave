import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PATCH(req: NextRequest) {
  const { fullName, email } = await req.json();

  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  );

  const user = await User.findByIdAndUpdate(
    decoded._id,
    { fullName, email },
    { new: true }
  ).select("-password");

  return NextResponse.json({ user });
}