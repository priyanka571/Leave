// "use client";

// import { useState } from "react";
// import api from "@/utils/axios";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";


// export default function RegisterPage() {

//   const router = useRouter();


//   const [formData, setFormData] = useState({

//     employeeId: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     department: "",
//     password: "",
//     designation: "",
//     joiningDate: "",
//     manager: "",
//     salary: "",
//     gender: "",
//     dob: "",
//     address: "",
//     role: "employee",
//     status: "active",
//     remainingLeaves: 15

//   });


//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({
//     password: "",
//     email: "",
//     phone: "+91",
//   });

//   const strongPasswordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//   const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//   const phoneRegex = /^\+91 [6-9]\d{9}$/;



//   // const handleChange = (
//   //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   // ) => {

//   //   setFormData({

//   //     ...formData,

//   //     [e.target.name]: e.target.value

//   //   });

//   // };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {

//     const { name, value } = e.target;


//     setFormData({
//       ...formData,
//       [name]: value
//     });


//     if (name === "password") {

//       if (!strongPasswordRegex.test(value)) {

//         setErrors((prev) => ({
//           ...prev,
//           password:
//             "Password must contain 8+ characters, uppercase, lowercase, number and special character."
//         }));

//       } else {

//         setErrors((prev) => ({
//           ...prev,
//           password: ""
//         }));

//       }

//     }

//     if (name === "email") {

//       if (!emailRegex.test(value)) {

//         setErrors((prev) => ({
//           ...prev,
//           email: "Only Gmail addresses are allowed."
//         }));

//       } else {

//         setErrors((prev) => ({
//           ...prev,
//           email: ""
//         }));

//       }

//     }

//     if (name === "phone") {

//       let onlyNumbers = value.replace(/\D/g, "");

//       if (onlyNumbers.startsWith("91")) {
//         onlyNumbers = onlyNumbers.slice(2);
//       }

//       onlyNumbers = onlyNumbers.slice(0, 10);

//       setFormData({
//         ...formData,
//         phone: "+91 " + onlyNumbers
//       });


//       if (!phoneRegex.test(formData.phone)) {
//         setError("Please enter a valid phone number.");
//         return;
//       }


//       return;
//     }
//     setFormData({
//       ...formData,
//       [name]: value
//     });


//   };




//   const handleRegister = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     if (!strongPasswordRegex.test(formData.password)) {

//       setError(
//         "Please enter a strong password."
//       );

//       return;

//     }
//     if (!phoneRegex.test(formData.phone)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }


//     try {

//       setError("");
//       setSuccess("");


//       const res = await api.post(
//         "/auth/register",
//         {
//           ...formData,
//           salary: Number(formData.salary),
//           remainingLeaves: Number(formData.remainingLeaves)
//         }
//       );


//       console.log(res.data);


//       setSuccess(
//         "Registration successful"
//       );


//       setTimeout(() => {

//         router.push("/auth/login");

//       }, 1500);



//     }
//     catch (error: any) {

//       setError(
//         error.response?.data?.message ||
//         "Registration failed"
//       );

//     }


//   };





//   return (
//     <div className="relative z-10 mx-auto w-full max-w-6xl rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">

//       {/* Background Animation */}
//       <div className="pointer-events-none absolute inset-0">

//         <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl animate-pulse [animation-duration:6s]" />

//         <div className="absolute top-1/3 -right-24 h-80 h-80 rounded-full bg-purple-300/40 blur-3xl animate-pulse [animation-duration:7s]" />

//         <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl animate-bounce [animation-duration:8s]" />

//       </div>



//       {/* Register Card */}
//       <div className="relative z-10 mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">


//         {/* Header */}
//         <div className="mb-8 text-center">



//           <h1 className="text-3xl font-bold text-gray-900">
//             Employee Registration
//           </h1>


//           <p className="mt-2 text-sm text-gray-500">
//             Create your employee account
//           </p>

//         </div>



//         {
//           error &&
//           <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error || errors.password || errors.email || errors.phone}
//           </p>
//         }


//         {
//           success &&
//           <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
//             {success}
//           </p>
//         }
//         <form
//           onSubmit={handleRegister}
//           className="space-y-5"
//         >

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


//             {/* Employee ID */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Employee ID
//               </label>

//               <input
//                 name="employeeId"
//                 onChange={handleChange}
//                 placeholder="Employee ID"
//                 className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Email
//               </label>

//               <input
//                 name="email"
//                 type="email"
//                 placeholder="name@gmail.com"
//                 onChange={handleChange}
//                 className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//               />



//             </div>



//             {/* First Name */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 First Name
//               </label>

//               <input
//                 name="firstName"
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//               />
//             </div>



//             {/* Last Name */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Last Name
//               </label>

//               <input
//                 name="lastName"
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//               />
//             </div>

//             {/* Phone */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Phone
//               </label>



//               <input
//                 name="phone"
//                 placeholder="Phone"
//                 onChange={handleChange}
//                 value={formData.phone}
//                 maxLength={14}
//                 className="inputStyle flex-1"
//               />
//             </div>




//             {/* Department */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Department
//               </label>

//               <input
//                 name="department"
//                 placeholder="Department"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />
//             </div>

//             {/* Designation */}
//             <div className="flex items-center gap-4">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Designation
//               </label>

//               <input
//                 name="designation"
//                 placeholder="Designation"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />
//             </div>



//             {/* Joining Date */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Joining Date
//               </label>

//               <input
//                 name="joiningDate"
//                 type="date"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />

//             </div>



//             {/* Manager */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Manager
//               </label>

//               <input
//                 name="manager"
//                 placeholder="Manager Name"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />

//             </div>



//             {/* Salary */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Salary
//               </label>

//               <input
//                 name="salary"
//                 type="number"
//                 placeholder="Salary"
//                 onChange={handleChange}
//                 className="inputStyle flex-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//               />

//             </div>



//             {/* Gender */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Gender
//               </label>

//               <select
//                 name="gender"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               >

//                 <option value="">
//                   Select Gender
//                 </option>

//                 <option value="Male">
//                   Male
//                 </option>

//                 <option value="Female">
//                   Female
//                 </option>

//               </select>

//             </div>



//             {/* Date of Birth */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Date of Birth
//               </label>

//               <input
//                 name="dob"
//                 type="date"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />

//             </div>



//             {/* Address */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Address
//               </label>

//               <input
//                 name="address"
//                 placeholder="Address"
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />

//             </div>



//             {/* Role */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Role
//               </label>

//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               >

//                 <option value="employee">
//                   Employee
//                 </option>

//                 <option value="admin">
//                   Admin
//                 </option>

//               </select>

//             </div>



//             {/* Remaining Leaves */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Leaves
//               </label>

//               <input
//                 name="remainingLeaves"
//                 type="number"
//                 value={formData.remainingLeaves}
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               />

//             </div>



//             {/* Status */}
//             <div className="flex items-center gap-4">

//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Status
//               </label>

//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="inputStyle flex-1"
//               >

//                 <option value="active">
//                   Active
//                 </option>

//                 <option value="inactive">
//                   Inactive
//                 </option>

//               </select>

//             </div>


//             {/* Password */}
//             <div className="flex items-center gap-4 relative">
//               <label className="w-32 text-sm font-medium text-gray-600">
//                 Password
//               </label>

//               {/* <div className="relative flex-1"> */}


//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 onChange={handleChange}
//                 autoComplete="new-password"
//                 className="inputStyle flex-1"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//               </button>



//               {/* </div> */}
//             </div>

//           </div>

//           <div className="flex justify-center md:col-span-2">
//             <button
//               type="submit"
//               className="rounded-xl bg-indigo-600 px-10 py-3 font-medium text-white transition hover:bg-indigo-700 hover:scale-[1.02]"
//             // className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
//             >
//               Register
//             </button>
//           </div>


//         </form>






//       </div>

//     </div>


//   );

// }





"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";


export default function RegisterPage() {

  const router = useRouter();


  const [formData, setFormData] = useState({

    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    designation: "",
    joiningDate: "",
    manager: "",
    salary: "",
    gender: "",
    dob: "",
    address: "",
    role: "employee",
    status: "active",
    remainingLeaves: 15

  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    email: "",
    phone: "+91",
  });

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const phoneRegex = /^\+91 [6-9]\d{9}$/;



  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {

  //   setFormData({

  //     ...formData,

  //     [e.target.name]: e.target.value

  //   });

  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;


    setFormData({
      ...formData,
      [name]: value
    });


    if (name === "password") {

      if (!strongPasswordRegex.test(value)) {

        setErrors((prev) => ({
          ...prev,
          password:
            "Password must contain 8+ characters, uppercase, lowercase, number and special character."
        }));

      } else {

        setErrors((prev) => ({
          ...prev,
          password: ""
        }));

      }

    }

    if (name === "email") {

      if (!emailRegex.test(value)) {

        setErrors((prev) => ({
          ...prev,
          email: "Only Gmail addresses are allowed."
        }));

      } else {

        setErrors((prev) => ({
          ...prev,
          email: ""
        }));

      }

    }

    if (name === "phone") {

      let onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.startsWith("91")) {
        onlyNumbers = onlyNumbers.slice(2);
      }

      onlyNumbers = onlyNumbers.slice(0, 10);

      setFormData({
        ...formData,
        phone: "+91 " + onlyNumbers
      });


      if (!phoneRegex.test(formData.phone)) {
        setError("Please enter a valid phone number.");
        return;
      }


      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });


  };




  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!strongPasswordRegex.test(formData.password)) {

      setError(
        "Please enter a strong password."
      );

      return;

    }
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }


    try {

      setError("");
      setSuccess("");


      const res = await api.post(
        "/auth/register",
        {
          ...formData,
          salary: Number(formData.salary),
          remainingLeaves: Number(formData.remainingLeaves)
        }
      );


      console.log(res.data);


      setSuccess(
        "Registration successful"
      );


      setTimeout(() => {

        router.push("/auth/login");

      }, 1500);



    }
    catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }


  };





  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Background Animation */}
        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl animate-pulse [animation-duration:6s]" />

          <div className="absolute top-1/3 -right-24 h-80 h-80 rounded-full bg-purple-300/40 blur-3xl animate-pulse [animation-duration:7s]" />

          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl animate-bounce [animation-duration:8s]" />

        </div>



        {/* Register Card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50">


          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Employee Registration
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Create a new employee profile and assign access.
              </p>
            </div>

            {/* <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2.5">
              <span className="text-sm font-bold text-indigo-700">
                New Employee
              </span>
            </div> */}

          </div>


          {
            error &&
            <p className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error || errors.password || errors.email || errors.phone}
            </p>
          }


          {
            success &&
            <p className="mb-6 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {success}
            </p>
          }
          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div className="grid gap-6 md:grid-cols-2">


              {/* Employee ID */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Employee ID
                </label>

                <input
                  name="employeeId"
                  onChange={handleChange}
                  placeholder="Employee ID"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Email */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />



              </div>



              {/* First Name */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  First Name
                </label>

                <input
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>



              {/* Last Name */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Last Name
                </label>

                <input
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Phone */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone
                </label>



                <input
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  value={formData.phone}
                  maxLength={14}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>




              {/* Department */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Department
                </label>

                <input
                  name="department"
                  placeholder="Department"
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Designation */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Designation
                </label>

                <input
                  name="designation"
                  placeholder="Designation"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>



              {/* Joining Date */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Joining Date
                </label>

                <input
                  name="joiningDate"
                  type="date"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
                 />
              </div>



              {/* Manager */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Manager
                </label>

                <input
                  name="manager"
                  placeholder="Manager Name"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

              </div>



              {/* Salary */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Salary
                </label>

                <input
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

              </div>



              {/* Gender */}
             <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gender
                </label>

                <select
                  name="gender"
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

              </div>



              {/* Date of Birth */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date of Birth
                </label>

                <input
                  name="dob"
                  type="date"
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

              </div>



              {/* Address */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Address
                </label>

                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

              </div>



              {/* Role */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                >

                  <option value="employee">
                    Employee
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>



              {/* Remaining Leaves */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Leaves
                </label>

                <input
                  name="remainingLeaves"
                  type="number"
                  value={formData.remainingLeaves}
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

              </div>



              {/* Status */}
              <div >
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                </select>

              </div>


              {/* Password */}
              <div className="relative">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative flex-1">


                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="new-password"
                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>



                </div>
              </div>

            </div>

            <div className="flex justify-center md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-10 py-3 font-medium text-white transition hover:bg-indigo-700 hover:scale-[1.02]"
              // className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                Register
              </button>
            </div>


          </form>






        </div>

      </div>
    </div>


  );

}