"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import Link from "next/link";



export default function LoginPage() {

  const router = useRouter();


  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");



  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setError("");

      const res = await api.post(
        "/auth/login",
        {
          firstName,
          password
        },
        {
          withCredentials: true
        }
      );
      console.log(res.data);


      // login successful
      const user = res.data.user;

      if (user.role === "employee") {

        router.push(`/employee/${user._id}`);

      } else if (user.role === "admin") {

        router.push("/leave-request");

      }
      router.refresh();


    } catch (error: any) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };



  return (




    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100 px-6">


      {/* Background Animation */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl animate-pulse [animation-duration:6s]" />


        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-purple-300/40 blur-3xl animate-pulse [animation-duration:7s]" />


        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl animate-bounce [animation-duration:8s]" />


      </div>



      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl p-8">


        <div className="text-center mb-8">




          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>




        </div>



        {
          error &&
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        }



        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >


          {/* Username */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              First Name
            </label>


            <div className="relative">

              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />


              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

          </div>




          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>


            <div className="relative">

              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />


              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

          </div>



          <div className="flex justify-center md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-10 py-3 font-medium text-white transition hover:bg-indigo-700 hover:scale-[1.02]"
            // className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 hover:scale-[1.02]"
            >
              Login
            </button>
          </div>


        </form>
      </div>


    </div>

  );
}