// "use client";

// import { useEffect, useState } from "react";
// import api from "@/utils/axios";
// import Link from "next/link";

// interface Employee {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     department: string;
//     designation: string;
// }

// interface Leave {
//     _id: string;
//     employee: Employee;
//     leaveType: string;
//     fromDate: string;
//     toDate: string;
//     days: number;
//     reason: string;
//     status: string;
// }

// export default function LeaveRequestsPage() {
//     const [leaves, setLeaves] = useState<Leave[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchLeaves();
//     }, []);

//     async function fetchLeaves() {
//         try {
//             const res = await api.get("/leaves");
//             setLeaves(res.data.leaves);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     if (loading) {
//         return <p className="p-6">Loading...</p>;
//     }

//     return (
//         <div className="p-6">

//             <h1 className="text-3xl font-bold mb-6">
//                 Leave Requests
//             </h1>

//             <div className="overflow-x-auto bg-white rounded-xl shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-100">

//                         <tr>
//                             <th className="p-3 text-left">Employee</th>
//                             <th className="p-3 text-left">Department</th>
//                             <th className="p-3 text-left">Leave Type</th>
//                             <th className="p-3 text-left">From</th>
//                             <th className="p-3 text-left">To</th>
//                             <th className="p-3 text-left">Days</th>
//                             <th className="p-3 text-left">Status</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {leaves.map((leave) => (

//                             <tr key={leave._id} className="border-b">

//                                 <td className="p-3">
//                                     {leave.employee.firstName} {leave.employee.lastName}
//                                 </td>

//                                 <td className="p-3">
//                                     {leave.employee.department}
//                                 </td>

//                                 <td className="p-3">
//                                     {leave.leaveType}
//                                 </td>

//                                 <td className="p-3">
//                                     {new Date(leave.fromDate).toLocaleDateString()}
//                                 </td>

//                                 <td className="p-3">
//                                     {new Date(leave.toDate).toLocaleDateString()}
//                                 </td>

//                                 <td className="p-3">
//                                     {leave.days}
//                                 </td>

//                                 <td className="p-3">
//                                     {/* <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       leave.status === "Approved"
//                         ? "bg-green-100 text-green-700"
//                         : leave.status === "Rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {leave.status}
//                   </span> */}
//                                     <Link href={`/leave-request/${leave._id}`}>
//                                         View Details
//                                     </Link>



//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     );
// }




"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import Link from "next/link";

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

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">
          Loading leave requests...
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
            Leave Requests
          </h1>

          <p className="text-sm text-gray-500">
            View and manage employee leave requests
          </p>

        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-2 text-indigo-600">

          <span className="font-semibold">
            {leaves.length} Requests
          </span>

        </div>

      </div>

      {error && (
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b border-gray-100 text-sm text-gray-500">

                <th className="px-4 py-4">Employee</th>

                <th className="px-4 py-4">Department</th>

                <th className="px-4 py-4">Leave Type</th>

                <th className="px-4 py-4">From</th>

                <th className="px-4 py-4">To</th>

                <th className="px-4 py-4">Days</th>

                <th className="px-4 py-4">Action</th>

                <th className="px-4 py-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {leaves.length > 0 ? (

                leaves.map((leave) => (

                  <tr
                    key={leave._id}
                    className="border-b border-gray-50 transition hover:bg-indigo-50/40"
                  >

                    <td className="px-4 py-4 font-medium text-gray-900">
                      {leave.employee.firstName} {leave.employee.lastName}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {leave.employee.department}
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

                    <td className="px-4 py-4">

                      <Link
                        href={`/leave-request/${leave._id}`}
                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition
                        ${
                          leave.status === "Pending"
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        {leave.status === "Pending"
                          ? "Review"
                          : "View"}
                      </Link>

                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
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
  );
}