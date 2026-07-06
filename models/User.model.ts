import mongoose from "mongoose";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
       lowercase: true,
        trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "hr", "manager", "employee"],
      default: "employee",
    }, 
    refreshToken:{
        type:String
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


userSchema.methods.isPasswordCorrect = async function(password: string){
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