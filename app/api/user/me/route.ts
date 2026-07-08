import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";

export async function GET() {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try{const decoded: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  );

  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );

  return NextResponse.json({ user });
  }catch(error){
    return NextResponse.json({ user: null }, { status: 401 });
  }
}