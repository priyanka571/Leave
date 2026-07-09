"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";

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
            <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">
                    Loading...
                </p>
            </div>
        );

    }



    return (

        <div className="p-8">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        My Leaves
                    </h1>

                    <p className="text-sm text-gray-500">
                        View all your leave requests
                    </p>

                </div>

                <div className="rounded-xl bg-indigo-50 px-4 py-2 text-indigo-600">

                    <span className="font-semibold">
                        {leaves.length} Leaves
                    </span>

                </div>

            </div>



            {
                error &&
                <p className="mb-4 text-red-500">
                    {error}
                </p>
            }



            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-gray-100 text-sm text-gray-500">

                                <th className="px-4 py-4">Leave Type</th>

                                <th className="px-4 py-4">From</th>

                                <th className="px-4 py-4">To</th>

                                <th className="px-4 py-4">Days</th>

                                <th className="px-4 py-4">Reason</th>

                                <th className="px-4 py-4">Status</th>

                                <th className="px-4 py-4">Approved By</th>
                                <th className="px-4 py-4">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                leaves.map((leave) => (

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
                                                className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${leave.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : leave.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
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
                                                        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                                    >
                                                        Delete
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

    );

}