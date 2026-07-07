import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    leaveType: {
      type: String,
      enum: [
        "Casual Leave",
        "Sick Leave",
        "Earned Leave",
        "Maternity Leave",
        "Paternity Leave",
        "Compensatory Off",
        "Work From Home",
        "Unpaid Leave",
      ],
      required: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Cancelled",
      ],
      default: "Pending",
    },
    isHalfDay: {
    type: Boolean,
    default: false,
    },

    halfDayType: {
    type: String,
    enum: ["First Half", "Second Half"],
    default: null,
    },

    cancelledDate: {
    type: Date,
    default: null,
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedDate: {
      type: Date,
      default: null,
    },

    rejectedReason: {
      type: String,
      default: "",
      trim: true,
    },

    attachment: {
      type: String,
      default: "",
    },

    comments: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Leave =
  mongoose.models.Leave ||
  mongoose.model("Leave", leaveSchema);

export default Leave;