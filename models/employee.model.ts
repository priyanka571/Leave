// import mongoose , {Schema} from "mongoose";

// const employeeSchema = new Schema(
//     {
//         employeeId: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         firstName: {
//             type: String,
//             required: true
//         },
//         lastName: {
//             type: String,
//             required: true
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         phone: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         department: {
//             type: String,
//             required: true
//         },
//         password: {
//             type: String,
//             required: [true, "Password is required"],
//             minlength: [6, "Password must be at least 6 characters long"]
//         },
//         designation: {
//             type: String,
//             required: true
//         },
//         joiningDate: {
//             type: Date,
//             required: true
//         },
//         manager: {
//             type: String,
//             required: true
//         },
//         salary: {
//             type: Number,
//             required: true
//         },
//         gender: {
//             type: String,
//             required: true
//         },
//         dob: {
//             type: Date,
//             required: true
//         },
//         address: {
//             type: String,
//             required: true
//         },
//         profileImage: {
//             type: String,
//             required: false
//         },
//         role: {
//             type: String,
//             enum: ['admin', 'employee'],
//             required: true
//         },
//         status: {
//             type: String,
//             enum: ['active', 'inactive'],
//             required: true
//         },
//         remainingLeaves: {
//             type: Number,
//             required: true
//     }
   
    
// },{timestamps: true}
// )
// export const Employee = mongoose.model("Employee", employeeSchema);
