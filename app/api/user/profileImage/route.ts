import { NextResponse, NextRequest } from "next/server";
import {connectDB} from "@/utils/db";
import User from "@/models/User.model";
import { verifyToken } from "@/utils/auth";
import { uploadToCloudinary } from "@/utils/cloudinary";

export async function PATCH(request: NextRequest) {
  await connectDB();

  const formData = await request.formData();

  const file = formData.get("profileImage");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { message: "Invalid profile image file" },
      { status: 400 }
    );
  }

  // upload to cloudinary

  const avatar = await uploadToCloudinary(file);

  const authUser = await verifyToken();

  const user = await User.findByIdAndUpdate(
    authUser._id,
    {
      avatar: avatar.url,
    },
    { new: true }
  ).select("-password");

  return NextResponse.json(user);
}