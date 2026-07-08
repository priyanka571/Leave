"use client";

import {
  Search,
  User,

} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/utils/axios";
// import Home from "@/Components/content/Home";



export default function HomePage() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function getUser() {

      try {

        const res = await api.get(
          "/api/user/me"
        );


        setUser(res.data.user);


      }
      catch {

        setUser(null);

      }

    }


    getUser();


  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">


      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        {/* <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword..."
              className="w-full pl-9 pr-16 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="flex items-center gap-3 ml-6 shrink-0">

            {
              user ? (

                // Login ke baad
                <div className="flex items-center gap-3">


                  <div className="text-right">

                    <p className="text-sm font-medium text-gray-800">
                      {user.firstName}
                    </p>


                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>

                  </div>


                  <div className="w-10 h-10 rounded-xl border border-gray-100 bg-indigo-50 flex items-center justify-center text-indigo-600">

                    <User className="w-5 h-5" />

                  </div>


                </div>


              ) : (


                // Login se pehle
                <Link
                  href="/auth/login"
                  className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >

                  <User className="w-5 h-5" />

                </Link>


              )


            }


          </div>
        </div> */}

        {/* Main content */}
        <div>
          <section className="relative flex min-h-[calc(100vh-73px)] w-full flex-col items-center justify-center overflow-hidden bg-gray-100 px-6 text-center">
            {/* Animated background blobs */}
            <div className="pointer-events-none absolute inset-0 -z-0">
              <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl animate-pulse [animation-duration:6s]" />
              <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-purple-300/40 blur-3xl animate-pulse [animation-duration:7s] [animation-delay:1s]" />
              <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl animate-bounce [animation-duration:8s]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/60 to-gray-100" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-5xl font-bold text-gray-900 md:text-6xl animate-[fade-in_0.8s_ease-out]">
                Employee Management System
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-gray-600">
                Manage employees, attendance, leave requests, payroll, and employee
                records from one place.
              </p>

              <div className="mt-10 flex gap-4">
                <Link
                  href="/auth/login"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:scale-105 hover:bg-blue-700"
                >
                  Login
                </Link>
              </div>
            </div>
          
          </section>
        </div>

      </main>






    </div>
  );
}