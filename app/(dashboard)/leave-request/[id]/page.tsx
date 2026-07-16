

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";
import {
  User,
  Mail,
  Building2,
  Briefcase,
  CalendarDays,
  FileText,
  Paperclip,
  CheckCircle2,
  XCircle,
  Clock3,
  ArrowLeft,
} from "lucide-react";


interface Employee {
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
  attachment: string;
  status: string;
  comments: string;
  rejectedReason: string;
}

export default function LeaveDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [leave, setLeave] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeave();
  }, []);

  async function fetchLeave() {
    try {
      const res = await api.get(`/leaves/${id}`);
      setLeave(res.data.leave);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function approveLeave() {
    try {
      await api.patch(`/leaves/${id}`, {
        status: "Approved",
        comments: "Approved by Admin",
      });

      alert("Leave Approved");
      router.push("/leave-request");
    } catch (error) {
      console.log(error);
    }
  }

  async function rejectLeave() {
    const reason = prompt("Enter reject reason");

    if (!reason) return;

    try {
      await api.patch(`/leaves/${id}`, {
        status: "Rejected",
        rejectedReason: reason,
        comments: "Rejected by Admin",
      });

      alert("Leave Rejected");
      router.push("/leave-request");
    } catch (error) {
      console.log(error);
    }
  }

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
            Loading Leave Details...
          </p>
        </div>
      </div>
    );
  }

  if (!leave) {
    return <p className="p-6">Leave not found</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Leave Details
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Review employee leave request.
              </p>

            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-indigo-700">

              <span className="font-bold text-sm">
                Request Details
              </span>

            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                <User className="h-4 w-4" />

                Employee

              </div>

              <p className="text-base font-semibold text-slate-900">

                {leave.employee.firstName} {leave.employee.lastName}

              </p>

            </div>

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                <Mail className="h-4 w-4" />

                Email

              </div>

              <p className="text-base font-semibold text-slate-900">

                {leave.employee.email}

              </p>

            </div>

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                <Building2 className="h-4 w-4" />

                Department

              </div>

              <p className="text-base font-semibold text-slate-900">

                {leave.employee.department}

              </p>

            </div>

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                <Briefcase className="h-4 w-4" />

                Designation

              </div>

              <p className="text-base font-semibold text-slate-900">

                {leave.employee.designation}

              </p>

            </div>

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                <FileText className="h-4 w-4" />

                Leave Type

              </div>

              <p className="text-base font-semibold text-slate-900">

                {leave.leaveType}

              </p>

            </div>

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                <CalendarDays className="h-4 w-4" />

                Days

              </div>

              <p className="text-base font-semibold text-slate-900">

                {leave.days}

              </p>

            </div>

            <div>

                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                  <CalendarDays className="h-4 w-4" />

                  From

                </div>

                <p className="text-base font-semibold text-slate-900">

                  {new Date(leave.fromDate).toLocaleDateString()}

                </p>

              </div>

              <div>

                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500">

                  <CalendarDays className="h-4 w-4" />

                  To

                </div>

                <p className="text-base font-semibold text-slate-900">

                  {new Date(leave.toDate).toLocaleDateString()}

                </p>

              </div>

            <div>

              

              <div className="col-span-2">

                <div className="mb-2 text-sm font-bold text-slate-500">

                  Reason

                </div>

                <div className="rounded-2xl bg-slate-50 p-5 text-slate-700">

                  {leave.reason}

                </div>

              </div>

              {leave.attachment && (
                <div className="col-span-2">
                  <p className="font-semibold">Attachment</p>

                  <a
                    href={leave.attachment}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 font-semibold text-indigo-700 hover:bg-indigo-100"
                  >
                    <Paperclip className="h-4 w-4" />
                    View Attachment
                  </a>
                </div>
              )}

              <div>
                <p className="font-semibold">Status</p>

                <span
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold
                ${leave.status === "Approved"
                      ? "border-green-100 bg-green-50 text-green-700"
                      : leave.status === "Rejected"
                        ? "border-red-100 bg-red-50 text-red-700"
                        : "border-yellow-100 bg-yellow-50 text-yellow-700"
                    }`}
                >

                  {
                    leave.status === "Approved"
                      ? <CheckCircle2 className="h-4 w-4" />
                      : leave.status === "Rejected"
                        ? <XCircle className="h-4 w-4" />
                        : <Clock3 className="h-4 w-4" />
                  }

                  {leave.status}

                </span>
              </div>

            </div>


          </div>

          {leave.status === "Pending" && (
            // <div className="flex gap-4 mt-8">
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <button
                onClick={approveLeave}
                className="rounded-2xl bg-green-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-green-700 hover:shadow-green-100 active:scale-[0.98]"
              >
                Approve
              </button>

              <button
                onClick={rejectLeave}
                className="rounded-2xl bg-rose-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-rose-700 hover:shadow-rose-100 active:scale-[0.98]"
              >
                Reject
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}