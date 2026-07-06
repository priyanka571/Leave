import cloudinary from "@/utils/cloudinary";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      throw new ApiError(400, "No file uploaded");
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64Image}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "leave-management",
    });

    return Response.json(
      new ApiResponse(200, {
        url: result.secure_url,
        public_id: result.public_id,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      new ApiError(
        error.statusCode || 500,
        error.message || "Upload failed",
        error.errors || []
      ),
      { status: error.statusCode || 500 }
    );
  }
}