import mongoose from "mongoose";


const NotificationSchema = new mongoose.Schema(

{
    title:{
        type:String,
        required:true,
        trim:true
    },


    message:{
        type:String,
        required:true
    },


    type:{
        type:String,
        enum:[
            "announcement",
            "leave",
            "holiday",
            "urgent"
        ],
        default:"announcement"
    },


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    isActive:{
        type:Boolean,
        default:true
    },


    expiresAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
}

);


export default mongoose.models.Notification ||
mongoose.model(
    "Notification",
    NotificationSchema
);