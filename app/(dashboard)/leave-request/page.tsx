"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/utils/axios";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  Filter,
  Eye,
  Building2,
  Users,
} from "lucide-react";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
}

interface Leave {
  _id: string;
  employee: Employee;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: string;
}

export default function LeaveRequestsPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    try {
      const res = await api.get("/leaves");
      setLeaves(res.data.leaves);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "Failed to fetch leave requests"
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchesSearch =
        `${leave.employee.firstName} ${leave.employee.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        leave.employee.department
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        leave.leaveType
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" ||
        leave.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [leaves, searchQuery, selectedStatus]);

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
            Loading Leave Requests...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Leave Requests
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Review and manage employee leave requests.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-indigo-100/50 bg-indigo-50 px-4 py-2.5 text-indigo-700">

            <Users className="h-5 w-5" />

            <span className="text-sm font-bold">
              {leaves.length} Requests
            </span>

          </div>

        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}


        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search employee, department or leave type..."
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

                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Leave Type</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Days</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>

                </tr>

              </thead>
              <tbody>

                {leaves.length > 0 ? (

                  filteredLeaves.map((leave) => (

                    <tr
                      key={leave._id}
                      className="border-b border-gray-50 transition hover:bg-indigo-50/40"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">

                            {leave.employee.firstName.charAt(0)}

                          </div>

                          <div>

                            <h3 className="text-sm font-bold text-slate-800">
                              {leave.employee.firstName} {leave.employee.lastName}
                            </h3>

                            <p className="text-xs text-slate-400">
                              {leave.employee.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">

                          <Building2 className="h-4 w-4 text-slate-400" />

                          {leave.employee.department}

                        </span>

                      </td>

                      <td className="px-4 py-4 capitalize">
                        {leave.leaveType}
                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          leave.fromDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          leave.toDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4">
                        {leave.days}
                      </td>

                      <td className="px-6 py-4 text-right">

                        <Link
                          href={`/leave-request/${leave._id}`}
                          className="inline-flex rounded-xl p-2 text-indigo-500 transition-all hover:border hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
                          title={leave.status === "Pending" ? "Review Request" : "View Request"}
                        >

                          <Eye className="h-5 w-5" />

                        </Link>

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

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={8}
                      className="py-8 text-center text-gray-500"
                    >
                      No leave requests found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}