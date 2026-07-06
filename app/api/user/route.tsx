import { getUsersController } from "@/controllers/user.controller";

export async function GET() {
  return getUsersController();
}