// "use client";

// import { useEffect, useState } from "react";
// import api from "@/utils/axios";

// interface Leave {

//     _id: string;

//     leaveType: string;

//     fromDate: string;

//     toDate: string;

//     days: number;

//     reason: string;

//     status: string;

//     approvedBy?: {

//         firstName: string;

//         lastName: string;

//         email: string;

//     };

// }

// export default function MyLeaves() {

//     const [leaves, setLeaves] = useState<Leave[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const handleDelete = async (id: string) => {

//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this leave request?"
//   );

//   if (!confirmDelete) return;

//   try {

//     await api.delete(`/leaves/${id}`);

//     setLeaves((prev) =>
//       prev.filter((leave) => leave._id !== id)
//     );

//   } catch (error: any) {

//     alert(
//       error.response?.data?.message ||
//       "Failed to delete leave"
//     );

//   }

// };



//     useEffect(() => {

//         const fetchLeaves = async () => {

//             try {

//                 const res = await api.get("/leaves/my");

//                 setLeaves(res.data.leaves);

//             }
//             catch (error: any) {

//                 setError(
//                     error.response?.data?.message ||
//                     "Failed to fetch leaves"
//                 );

//             }
//             finally {

//                 setLoading(false);

//             }

//         };

//         fetchLeaves();

//     }, []);



//     if (loading) {

//         return (
//             <div className="flex h-full items-center justify-center">
//                 <p className="text-gray-500">
//                     Loading...
//                 </p>
//             </div>
//         );

//     }



//     return (

//         <div className="p-8">

//             <div className="mb-6 flex items-center justify-between">

//                 <div>

//                     <h1 className="text-2xl font-bold text-gray-900">
//                         My Leaves
//                     </h1>

//                     <p className="text-sm text-gray-500">
//                         View all your leave requests
//                     </p>

//                 </div>

//                 <div className="rounded-xl bg-indigo-50 px-4 py-2 text-indigo-600">

//                     <span className="font-semibold">
//                         {leaves.length} Leaves
//                     </span>

//                 </div>

//             </div>



//             {
//                 error &&
//                 <p className="mb-4 text-red-500">
//                     {error}
//                 </p>
//             }



//             <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

//                 <div className="overflow-x-auto">

//                     <table className="w-full text-left">

//                         <thead>

//                             <tr className="border-b border-gray-100 text-sm text-gray-500">

//                                 <th className="px-4 py-4">Leave Type</th>

//                                 <th className="px-4 py-4">From</th>

//                                 <th className="px-4 py-4">To</th>

//                                 <th className="px-4 py-4">Days</th>

//                                 <th className="px-4 py-4">Reason</th>

//                                 <th className="px-4 py-4">Status</th>

//                                 <th className="px-4 py-4">Approved By</th>
//                                 <th className="px-4 py-4">Action</th>

//                             </tr>

//                         </thead>

//                         <tbody>

//                             {
//                                 leaves.map((leave) => (

//                                     <tr
//                                         key={leave._id}
//                                         className="border-b border-gray-50 hover:bg-indigo-50/40"
//                                     >

//                                         <td className="px-4 py-4 capitalize">
//                                             {leave.leaveType}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             {new Date(leave.fromDate).toLocaleDateString()}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             {new Date(leave.toDate).toLocaleDateString()}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             {leave.days}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             {leave.reason}
//                                         </td>

//                                         <td className="px-4 py-4">

//                                             <span
//                                                 className={`rounded-full px-3 py-1 text-xs font-semibold
//                         ${leave.status === "Approved"
//                                                         ? "bg-green-100 text-green-700"
//                                                         : leave.status === "Rejected"
//                                                             ? "bg-red-100 text-red-700"
//                                                             : "bg-yellow-100 text-yellow-700"
//                                                     }`}
//                                             >

//                                                 {leave.status}

//                                             </span>

//                                         </td>

//                                         <td className="px-4 py-4">

//                                             {
//                                                 leave.approvedBy
//                                                     ? `${leave.approvedBy.firstName} ${leave.approvedBy.lastName}`
//                                                     : "-"
//                                             }

//                                         </td>
//                                         <td className="px-4 py-4">

//                                             {
//                                                 leave.status === "Pending" ? (

//                                                     <button
//                                                         onClick={() => handleDelete(leave._id)}
//                                                         className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
//                                                     >
//                                                         Delete
//                                                     </button>

//                                                 ) : (

//                                                     <span className="text-sm text-gray-400">
//                                                         -
//                                                     </span>

//                                                 )
//                                             }

//                                         </td>

//                                     </tr>

//                                 ))
//                             }

//                         </tbody>

//                     </table>

//                 </div>

//             </div>

//         </div>

//     );

// }




"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/utils/axios";
import {
    CalendarDays,
    Search,
    Filter,
    Trash2,
    FileText,
} from "lucide-react";

interface Leave {

    _id: string;

    leaveType: string;

    fromDate: string;

    toDate: string;

    days: number;

    reason: string;

    status: string;

    approvedBy?: {

        firstName: string;

        lastName: string;

        email: string;

    };

}

export default function MyLeaves() {

    const [leaves, setLeaves] = useState<Leave[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const filteredLeaves = useMemo(() => {
        return leaves.filter((leave) => {
            const matchesSearch =
                leave.leaveType
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                leave.reason
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesStatus =
                selectedStatus === "all" ||
                leave.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [leaves, searchQuery, selectedStatus]);




    const handleDelete = async (id: string) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this leave request?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/leaves/${id}`);

            setLeaves((prev) =>
                prev.filter((leave) => leave._id !== id)
            );

        } catch (error: any) {

            alert(
                error.response?.data?.message ||
                "Failed to delete leave"
            );

        }

    };



    useEffect(() => {

        const fetchLeaves = async () => {

            try {

                const res = await api.get("/leaves/my");

                setLeaves(res.data.leaves);

            }
            catch (error: any) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch leaves"
                );

            }
            finally {

                setLoading(false);

            }

        };

        fetchLeaves();

    }, []);



    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50/50">
                <div className="flex flex-col items-center gap-3">
                    <svg
                        className="h-8 w-8 animate-spin text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0..."
                        />
                    </svg>

                    <p className="text-sm font-semibold text-slate-500">
                        Loading Leave History...
                    </p>
                </div>
            </div>
        );
    }



    return (

        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            My Leaves
                        </h1>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                            View and manage your leave history.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-indigo-100/50 bg-indigo-50 px-4 py-2.5 text-indigo-700">

                        <CalendarDays className="h-5 w-5" />

                        <span className="text-sm font-bold">
                            {leaves.length} Total
                        </span>

                    </div>

                </div>



                {
                    error && (
                        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600">
                            {error}
                        </div>
                    )}

                <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row">

                    <div className="relative flex-1">

                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search leave type or reason..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 py-2.5 pl-11 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />

                    </div>

                    <div className="flex w-full items-center gap-2 md:w-64">

                        <Filter className="h-4 w-4 text-slate-400" />

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                    </div>

                </div>



                <div className="rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/50 overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-400">

                                    <th className="px-6 py-4">Leave Type</th>
                                    <th className="px-6 py-4">From</th>
                                    <th className="px-6 py-4">To</th>
                                    <th className="px-6 py-4">Days</th>
                                    <th className="px-6 py-4">Reason</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Approved By</th>
                                    <th className="px-6 py-4 text-right">Action</th>

                                </tr>
                            </thead>

                            <tbody>

                                {
                                    filteredLeaves.map((leave) => (

                                        <tr
                                            key={leave._id}
                                            className="border-b border-gray-50 hover:bg-indigo-50/40"
                                        >

                                            <td className="px-4 py-4 capitalize">
                                                {leave.leaveType}
                                            </td>

                                            <td className="px-4 py-4">
                                                {new Date(leave.fromDate).toLocaleDateString()}
                                            </td>

                                            <td className="px-4 py-4">
                                                {new Date(leave.toDate).toLocaleDateString()}
                                            </td>

                                            <td className="px-4 py-4">
                                                {leave.days}
                                            </td>

                                            <td className="px-4 py-4">
                                                {leave.reason}
                                            </td>

                                            <td className="px-4 py-4">

                                                <span
                                                    className={`rounded-xl border px-3 py-1.5 text-xs font-bold
                                                                ${leave.status === "Approved"
                                                                ? "border-green-100 bg-green-50 text-green-700"
                                                                 : leave.status === "Rejected"
                                                                ? "border-red-100 bg-red-50 text-red-700"
                                                                : "border-yellow-100 bg-yellow-50 text-yellow-700"
                                                        }`}
                                                >
                                                    {leave.status}
                                                </span>

                                            </td>

                                            <td className="px-4 py-4">

                                                {
                                                    leave.approvedBy
                                                        ? `${leave.approvedBy.firstName} ${leave.approvedBy.lastName}`
                                                        : "-"
                                                }

                                            </td>
                                            <td className="px-4 py-4">

                                                {
                                                    leave.status === "Pending" ? (

                                                        <button
                                                            onClick={() => handleDelete(leave._id)}
                                                            className="rounded-xl p-2 text-rose-400 transition-all hover:border hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                                                            title="Delete Leave"
                                                        >
                                                         <Trash2 className="h-4.5 w-4.5"/>  
                                                        </button>

                                                    ) : (

                                                        <span className="text-sm text-gray-400">
                                                            -
                                                        </span>

                                                    )
                                                }

                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>

    );

}