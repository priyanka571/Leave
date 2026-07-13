import mongoose from "mongoose";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true,
            unique: true
        },
        department: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true
        },
        joiningDate: {
            type: Date,
            required: true
        },
        manager: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['admin', 'employee'],
            default: "employee",
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            required: true
        },
        // remainingLeaves: {
        //     type: Number,
        //     required: true
        // },
        leaveBalance: {

            paidLeaves: {
                total: {
                    type: Number,
                    default: 15
                },

                used: {
                    type: Number,
                    default: 0
                },

                remaining: {
                    type: Number,
                    default: 15
                }
            },


            maternityLeave: {
                total: {
                    type: Number,
                    default: 180
                },

                used: {
                    type: Number,
                    default: 0
                }
            },


            paternityLeave: {
                total: {
                    type: Number,
                    default: 15
                },

                used: {
                    type: Number,
                    default: 0
                }
            },


            unpaidLeave: {
                used: {
                    type: Number,
                    default: 0
                }
            }

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        resetPasswordToken: {
            type: String,
            default: undefined,
        },
        resetPasswordExpire: {
            type: Date
        },
        refreshToken: {
            type: String,
            default: undefined,
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);

    } catch (err) {
        console.error(err);
    }
});


userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
            // expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            expiresIn: "1d" as SignOptions["expiresIn"],
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        {
            // expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            expiresIn: "10d" as SignOptions["expiresIn"],
        }
    );
};

// Prevent model overwrite in dev (important in Next.js)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;