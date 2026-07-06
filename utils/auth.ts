import User from "@/models/User.model";
import { ApiError } from "@/utils/ApiError";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};


export const getUserFromRequest = async () => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    );

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    return user;
  } catch (error) {
    return null;
  }
};



export const getUserId = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) return null;

  const decoded: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  );

  return decoded._id;
};