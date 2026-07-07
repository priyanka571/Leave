import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { generateAccessAndRefreshTokens } from "@/utils/auth";

// export async function registerUser(req: NextRequest) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const { name, email, password, role } = body;

//     if (!name || !email || !password || !role) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 409 }
//       );
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         user,
//       },
//       {
//         status: 201,
//       }
//     );

//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Internal Server Error",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }



// export const loginUser = async (req: NextRequest) => {
//   try {
//     await connectDB();

//     const { email, username, password } = await req.json();

//     if (!(email || username)) {
//       throw new ApiError(400, "Email or username required");
//     }

//     const user = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (!user) {
//       throw new ApiError(404, "User not found");
//     }

//     // 🔐 check password
//     const isValidPassword = await user.isPasswordCorrect(password);

//     if (!isValidPassword) {
//       throw new ApiError(401, "Invalid credentials");
//     }

//     // 🔑 generate tokens
//     const { accessToken, refreshToken } =
//       await generateAccessAndRefreshTokens(user._id.toString());

//     const loggedInUser = await User.findById(user._id).select(
//       "-password -refreshToken"
//     );

//     const response = NextResponse.json(
//       new ApiResponse(200, loggedInUser, "Login successful"),
//       { status: 200 }
//     );

//     // 🍪 cookies
//     response.cookies.set("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//     });

//     response.cookies.set("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//     });

//     return response;
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: error.message || "Login failed" },
//       { status: error.statusCode || 500 }
//     );
//   }
// };



// export const logoutUser = async (req: NextRequest) => {
//   try {
//     await connectDB();

//     // 🍪 get refresh token from cookies
//     const refreshToken = req.cookies.get("refreshToken")?.value;

//     if (!refreshToken) {
//       throw new ApiError(401, "User already logged out");
//     }

//     // 🔥 find user and remove refresh token from DB
//     await User.findOneAndUpdate(
//       { refreshToken },
//       {
//         $set: { refreshToken: null },
//       }
//     );

//     // 🧹 clear cookies
//     const response = NextResponse.json(
//       new ApiResponse(200, {}, "Logout successful"),
//       { status: 200 }
//     );

//     response.cookies.set("accessToken", "", {
//       httpOnly: true,
//       expires: new Date(0),
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//     });

//     response.cookies.set("refreshToken", "", {
//       httpOnly: true,
//       expires: new Date(0),
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//     });

//     return response;
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: error.message || "Logout failed",
//       },
//       { status: error.statusCode || 500 }
//     );
//   }
// };