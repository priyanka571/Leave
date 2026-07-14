import mongoose from "mongoose";
import { National_Park } from "next/font/google";

const Holiday = new mongoose.Schema(
    {
        tittle: {
            type: String,
            required: true,
            trim: true,

        },
        description: {
            type: String,
            default: "",
        },
        holidayDate: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            enum: ["government", "festival", "office", "optional"],
            required: true,
        },
        color: {
            type: String,
            default: "",

        },
        isActive: {
            type: Boolean,
            default: true,
        },
        source: {
            type: String,
            enum: ["API", "ADMIN"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
export default mongoose.models.Holiday || mongoose.model("Holiday", Holiday)