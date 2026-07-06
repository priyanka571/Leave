import { NextRequest } from "next/server";
import { registerUser } from "@/controllers/user.controller";

export async function POST(req: NextRequest) {
  return registerUser(req);
}