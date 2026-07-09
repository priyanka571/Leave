"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";
import {
    Users,
    Mail,
    Phone,
    Building2,
    CalendarDays
} from "lucide-react";


interface Employee {

    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    joiningDate: string;

}



export default function Employees() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;



    useEffect(() => {


        const getEmployees = async () => {


            try {


                const res = await api.get("/employee");
                console.log("DATA:", res.data);


                setEmployees(
                    (res.data.employees || [])
                );


            }
            catch (error: any) {


                setError(
                    error.response?.data?.message ||
                    "Failed to fetch employees"
                );


            }
            finally {


                setLoading(false);


            }


        };


        getEmployees();


    }, []);



    if (loading) {

        return (

            <div className="flex h-full items-center justify-center">

                <p className="text-gray-500">
                    Loading employee...
                </p>

            </div>

        );

    }



    return (

        <div className="p-8">


            {/* Header */}

            <div className="mb-6 flex items-center justify-between">


                <div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Employee Details
                    </h1>


                    <p className="text-sm text-gray-500">
                        View and manage employee information
                    </p>

                </div>

                 <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-indigo-600">

                    <Users className="h-5 w-5" />

                    <span className="font-semibold">
                        {/* {employees.length} */}
                        {Array.isArray(employees) ? employees.length : 0}
                    </span>

                </div>
                <button
                 onClick={() => router.push("/auth/register")}
                    className="rounded-xl bg-indigo-600 px-5 py-2 font-xl text-white shadow-sm transition hover:bg-indigo-700"
                >
                    + Add Employee
                </button>

                </div>


            </div>




            {
                error &&
                <p className="mb-4 text-red-500">
                    {error}
                </p>
            }




            {/* Employee Cards */}

            {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">


                {
                    Array.isArray(employees) &&
                    employees.map((employee) => (


                        <div
                            key={employee._id}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >


                            <div className="mb-4 flex items-center gap-4">


                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">

                                    {
                                        employee.firstName
                                            .charAt(0)
                                            .toUpperCase()
                                    }

                                </div>



                                <div>

                                    <h2 className="font-semibold text-gray-900">

                                        {employee.firstName} {employee.lastName}

                                    </h2>


                                    <p className="text-sm capitalize text-gray-500">

                                        {employee.designation}

                                    </p>

                                </div>


                            </div>




                            <div className="space-y-3 text-sm text-gray-600">


                                <div className="flex items-center gap-2">

                                    <Mail className="h-4 w-4 text-indigo-500" />

                                    {employee.email}

                                </div>



                                <div className="flex items-center gap-2">

                                    <Phone className="h-4 w-4 text-indigo-500" />

                                    {employee.phone}

                                </div>




                                <div className="flex items-center gap-2">

                                    <Building2 className="h-4 w-4 text-indigo-500" />

                                    {employee.department}

                                </div>




                                <div className="flex items-center gap-2">

                                    <CalendarDays className="h-4 w-4 text-indigo-500" />

                                    {
                                        new Date(employee.joiningDate)
                                            .toLocaleDateString()
                                    }

                                </div>


                            </div>


                        </div>


                    ))
                }


            </div> */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>
                            <tr className="border-b border-gray-100 text-sm text-gray-500">

                                <th className="px-4 py-4 font-semibold">
                                    Employee
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Email
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Phone
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Department
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Designation
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Joining Date
                                </th>

                            </tr>
                        </thead>


                        <tbody>

                            {employees.map((employee) => (

                                <tr
                                    key={employee._id}
                                    className="border-b border-gray-50 transition hover:bg-indigo-50/40"
                                >

                                    <td className="px-4 py-4">

                                        <p className="font-semibold text-gray-900">
                                            {employee.firstName} {employee.lastName}
                                        </p>

                                    </td>


                                    <td className="px-4 py-4 text-sm text-gray-600">
                                        {employee.email}
                                    </td>


                                    <td className="px-4 py-4 text-sm text-gray-600">
                                        {employee.phone}
                                    </td>


                                    <td className="px-4 py-4 text-sm text-gray-600">
                                        {employee.department}
                                    </td>


                                    <td className="px-4 py-4">

                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                            {employee.designation}
                                        </span>

                                    </td>


                                    <td className="px-4 py-4 text-sm text-gray-600">

                                        {new Date(employee.joiningDate)
                                            .toLocaleDateString()
                                        }

                                    </td>


                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>


        </div>

    );

}









