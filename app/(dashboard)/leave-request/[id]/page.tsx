"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";

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
    return <p className="p-6">Loading...</p>;
  }

  if (!leave) {
    return <p className="p-6">Leave not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Leave Details
        </h1>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="font-semibold">Employee</p>
            <p>{leave.employee.firstName} {leave.employee.lastName}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{leave.employee.email}</p>
          </div>

          <div>
            <p className="font-semibold">Department</p>
            <p>{leave.employee.department}</p>
          </div>

          <div>
            <p className="font-semibold">Designation</p>
            <p>{leave.employee.designation}</p>
          </div>

          <div>
            <p className="font-semibold">Leave Type</p>
            <p>{leave.leaveType}</p>
          </div>

          <div>
            <p className="font-semibold">Days</p>
            <p>{leave.days}</p>
          </div>

          <div>
            <p className="font-semibold">From</p>
            <p>{new Date(leave.fromDate).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="font-semibold">To</p>
            <p>{new Date(leave.toDate).toLocaleDateString()}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Reason</p>
            <p>{leave.reason}</p>
          </div>

          {leave.attachment && (
            <div className="col-span-2">
              <p className="font-semibold">Attachment</p>

              <a
                href={leave.attachment}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Attachment
              </a>
            </div>
          )}

          <div>
            <p className="font-semibold">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                leave.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : leave.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {leave.status}
            </span>
          </div>

        </div>

        {leave.status === "Pending" && (
          <div className="flex gap-4 mt-8">

            <button
              onClick={approveLeave}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Approve
            </button>

            <button
              onClick={rejectLeave}
              className="bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Reject
            </button>

          </div>
        )}

      </div>

    </div>
  );
}