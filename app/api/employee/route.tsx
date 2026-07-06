import { connectDB } from "@/utils/mongodb";

export async function GET() {
  await connectDB();

  return Response.json({
    message: "Connected successfully"
  });
}