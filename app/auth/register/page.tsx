"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";


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
    remainingLeaves: ""

  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };




  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


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



  // return (

  {/* <div>

<h1>
Employee Registration
</h1>


{
error &&
<p style={{color:"red"}}>
{error}
</p>
}


{
success &&
<p style={{color:"green"}}>
{success}
</p>
}



<form onSubmit={handleRegister}>


<input
name="employeeId"
placeholder="Employee ID"
onChange={handleChange}
/>


<input
name="firstName"
placeholder="First Name"
onChange={handleChange}
/>



<input
name="lastName"
placeholder="Last Name"
onChange={handleChange}
/>



<input
name="email"
type="email"
placeholder="Email"
onChange={handleChange}
/>



<input
name="phone"
placeholder="Phone"
onChange={handleChange}
/>



<input
name="department"
placeholder="Department"
onChange={handleChange}
/>



<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
/>



<input
name="designation"
placeholder="Designation"
onChange={handleChange}
/>



<label>
Joining Date
</label>

<input
name="joiningDate"
type="date"
onChange={handleChange}
/>



<input
name="manager"
placeholder="Manager Name"
onChange={handleChange}
/>



<input
name="salary"
type="number"
placeholder="Salary"
onChange={handleChange}
/>



<select
name="gender"
onChange={handleChange}
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



<label>
Date of Birth
</label>

<input
name="dob"
type="date"
onChange={handleChange}
/>



<input
name="address"
placeholder="Address"
onChange={handleChange}
/>



<select
name="role"
value={formData.role}
onChange={handleChange}
>

<option value="employee">
Employee
</option>


<option value="admin">
Admin
</option>

</select>



<input
name="remainingLeaves"
type="number"
placeholder="Remaining Leaves"
onChange={handleChange}
/>



<select
name="status"
value={formData.status}
onChange={handleChange}
>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>


</select>



<button type="submit">
Register
</button>


</form>


</div> */}

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">

      {/* Background Animation */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl animate-pulse [animation-duration:6s]" />

        <div className="absolute top-1/3 -right-24 h-80 h-80 rounded-full bg-purple-300/40 blur-3xl animate-pulse [animation-duration:7s]" />

        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl animate-bounce [animation-duration:8s]" />

      </div>



      {/* Register Card */}
      <div className="relative z-10 mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">


        {/* Header */}
        <div className="mb-8 text-center">



          <h1 className="text-3xl font-bold text-gray-900">
            Employee Registration
          </h1>


          <p className="mt-2 text-sm text-gray-500">
            Create your employee account
          </p>

        </div>



        {
          error &&
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        }


        {
          success &&
          <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </p>
        }




        {/* <form
        onSubmit={handleRegister}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >


        {/* Employee ID }
        <input
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          className="inputStyle"
        />


        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="inputStyle"
        />


        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="inputStyle"
        />


        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="inputStyle"
        />


        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="inputStyle"
        />


        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          className="inputStyle"
        />



        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="inputStyle"
        />



        <input
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          className="inputStyle"
        />



        <div>
          <label className="mb-2 block text-sm text-gray-600">
            Joining Date
          </label>

          <input
            name="joiningDate"
            type="date"
            onChange={handleChange}
            className="inputStyle"
          />
        </div>



        <input
          name="manager"
          placeholder="Manager Name"
          onChange={handleChange}
          className="inputStyle"
        />



        <input
          name="salary"
          type="number"
          placeholder="Salary"
          onChange={handleChange}
          className="inputStyle"
        />



        <select
          name="gender"
          onChange={handleChange}
          className="inputStyle"
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



        <div>

          <label className="mb-2 block text-sm text-gray-600">
            Date of Birth
          </label>


          <input
            name="dob"
            type="date"
            onChange={handleChange}
            className="inputStyle"
          />

        </div>



        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="inputStyle"
        />



        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="inputStyle"
        >

          <option value="employee">
            Employee
          </option>

          <option value="admin">
            Admin
          </option>

        </select>



        <input
          name="remainingLeaves"
          type="number"
          placeholder="Remaining Leaves"
          onChange={handleChange}
          className="inputStyle"
        />



        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="inputStyle"
        >

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>



        {/* Button *
        <button
          type="submit"
          className="md:col-span-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 hover:scale-[1.01]"
        >
          Register
        </button>


      </form> */}


        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


            {/* Employee ID */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Employee ID
              </label>

              <input
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="name@gmail.com"
                onChange={handleChange}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>



            {/* First Name */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                First Name
              </label>

              <input
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>



            {/* Last Name */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Last Name
              </label>

              <input
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Phone
              </label>

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="inputStyle flex-1"
              />
            </div>



            {/* Department */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Department
              </label>

              <input
                name="department"
                placeholder="Department"
                onChange={handleChange}
                className="inputStyle flex-1"
              />
            </div>

            {/* Designation */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Designation
              </label>

              <input
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
                className="inputStyle flex-1"
              />
            </div>



            {/* Joining Date */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Joining Date
              </label>

              <input
                name="joiningDate"
                type="date"
                onChange={handleChange}
                className="inputStyle flex-1"
              />

            </div>



            {/* Manager */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Manager
              </label>

              <input
                name="manager"
                placeholder="Manager Name"
                onChange={handleChange}
                className="inputStyle flex-1"
              />

            </div>



            {/* Salary */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Salary
              </label>

              <input
                name="salary"
                type="number"
                placeholder="Salary"
                onChange={handleChange}
                className="inputStyle flex-1"
              />

            </div>



            {/* Gender */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Gender
              </label>

              <select
                name="gender"
                onChange={handleChange}
                className="inputStyle flex-1"
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
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Date of Birth
              </label>

              <input
                name="dob"
                type="date"
                onChange={handleChange}
                className="inputStyle flex-1"
              />

            </div>



            {/* Address */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Address
              </label>

              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className="inputStyle flex-1"
              />

            </div>



            {/* Role */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="inputStyle flex-1"
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
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Leaves
              </label>

              <input
                name="remainingLeaves"
                type="number"
                placeholder="Remaining Leaves"
                onChange={handleChange}
                className="inputStyle flex-1"
              />

            </div>



            {/* Status */}
            <div className="flex items-center gap-4">

              <label className="w-32 text-sm font-medium text-gray-600">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="inputStyle flex-1"
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
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-600">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="inputStyle flex-1"
              />
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


  );

}