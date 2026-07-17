"use client";

import {
    Search,
    User
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/utils/axios";

interface TopbarProps {
    user: any;
}


export default function Topbar({ user }: TopbarProps) {


    return (

        // <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">


        //     <div className="relative w-full max-w-md">

        //         {/* <Search
        //             className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
        //         />


        //         <input
        //             type="text"
        //             placeholder="Search keyword..."
        //             className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        //         /> */}


        //     </div>



        //     <div className="flex items-center gap-3 ml-6 shrink-0">


        //         {
        //             user ? (


        //                 <div className="flex items-center gap-3">

        //                     {/* Role */}
        //                     <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
        //                         {user.role === "admin" ? "Admin" : "Employee"}
        //                     </span>

        //                     {/* Avatar */}
        //                     <div className="group relative">

        //                         <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white font-semibold shadow-md">
        //                             {user.firstName.charAt(0).toUpperCase()}
        //                         </div>




        //                     </div>

        //                 </div>


        //             )

        //                 :

        //                 (

        //                     <Link
        //                         href="/auth/login"
        //                         className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50"
        //                     >

        //                         <User className="w-5 h-5" />

        //                     </Link>


        //                 )

        //         }


        //     </div>


        // </div >






        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">


            <div className="relative w-full max-w-md border-l-4 border-indigo-600 pl-4">

                <h1 className="text-2xl font-bold text-slate-800">
                    Employee Management
                </h1>
                


            </div>



            <div className="flex items-center gap-3 ml-6 shrink-0">


                {
                    user ? (


                        <div className="flex items-center gap-3">

                            {/* Role */}
                            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                                {user.role === "admin" ? "Admin" : "Employee"}
                            </span>

                            {/* Avatar */}
                            <div className="group relative">

                                <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 text-white font-semibold shadow-lg ring-2 ring-indigo-100">
                                    {user.firstName.charAt(0).toUpperCase()}
                                </div>




                            </div>

                        </div>


                    )

                        :

                        (

                            <Link
                                href="/auth/login"
                                className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                            >

                                <User className="w-5 h-5" />

                            </Link>


                        )

                }


            </div>


        </div >






    )

}