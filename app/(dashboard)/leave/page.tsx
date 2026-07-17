"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { CalendarDays } from "lucide-react";
// import { Preahvihear } from "next/font/google";

export default function ApplyLeavePage() {

  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    duration: "Full Day",
    days: "",
    reason: "",
    attachment: "",
  });


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");




  const router = useRouter();

  // useEffect(() => {
  //   if (formData.duration === "Half Day") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       days: "0.5",
  //       toDate: prev.fromDate,
  //     }))

  //   }
  // }, [formData.duration, formData.fromDate]);
  const calculateWorkingDays = (from: string, to: string) => {
    if (!from || !to) return "0";

    let count = 0;
    const current = new Date(from);
    const end = new Date(to);

    while (current <= end) {
      const day = current.getDay();

      if (day !== 0 && day !== 6) {
        count++;
      }

      current.setDate(current.getDate() + 1);
    }

    return count.toString();
  };

  useEffect(() => {
    if (formData.duration === "Half Day") {
      setFormData((prev) => ({
        ...prev,
        days: "0.5",
        toDate: prev.fromDate,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      days: calculateWorkingDays(prev.fromDate, prev.toDate),
    }));
  }, [formData.fromDate, formData.toDate, formData.duration]);



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);
      setMessage("");

      // const res = await api.post(
      //   "/leaves",
      //   {
      //     ...formData,
      //     days: Number(formData.days)
      //   }
      // );


      const res = await api.post("/leaves", {
        leaveType: formData.leaveType,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        duration: formData.duration,
        reason: formData.reason,
        attachment: formData.attachment,
      });


      setMessage(
        res.data.message
      );


      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        days: "",
        duration: "Full Day",
        reason: "",
        attachment: "",
      });

      setTimeout(() => {
        router.push("/leave/my");
      }, 1500);
    }
    catch (error: any) {

      setMessage(
        error.response?.data?.message ||
        "Failed to apply leave"
      );

    }
    finally {

      setLoading(false);

    }

  };





  return (

    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">


        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Apply Leave
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Submit your leave request for approval.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-indigo-100/50 bg-indigo-50 px-4 py-2.5 text-indigo-700">
            <CalendarDays className="h-5 w-5" />
            <span className="text-sm font-bold">
              Leave Request
            </span>
          </div>
        </div>





        <div className="max-w-3xl rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50">


          {
            message &&
            <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm font-semibold text-indigo-700">
              {message}
            </div>
          }




          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >




            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Leave Type
              </label>


              <select

                name="leaveType"

                value={formData.leaveType}

                onChange={handleChange}

                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required

              >


                <option value="">
                  Select Leave Type
                </option>


                <option value="Casual Leave">
                  Casual Leave
                </option>


                <option value="Sick Leave">
                  Sick Leave
                </option>


                <option value="Earned Leave">
                  Earned Leave
                </option>

                <option value="Maternity Leave">
                  Maternity Leave
                </option>
                <option value="Paternity Leave">
                  Paternity Leave
                </option>
                <option value="Compensatory Off">
                  Compensatory Off
                </option>
                <option value="Work From Home">
                  Work From Home
                </option>
                <option value="Unpaid Leave">
                  Unpaid Leave
                </option>


              </select>

            </div>







            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  From Date
                </label>


                <input

                  type="date"

                  name="fromDate"

                  value={formData.fromDate}
                  min={new Date().toISOString().split("T")[0]}

                  onChange={handleChange}

                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"

                  required

                />

              </div>





              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  To Date
                </label>


                <input

                  type="date"

                  name="toDate"

                  value={formData.toDate}
                  min={formData.fromDate || new Date().toISOString().split("T")[0]}

                  onChange={handleChange}

                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"

                  required

                />

              </div>


            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Duration
              </label>


              <select

                name="duration"

                value={formData.duration}

                onChange={handleChange}

                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required

              >


                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>


              </select>

            </div>












            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Total Days
              </label>


              {/* <input

                type="number"

                name="days"

                value={formData.days}

                onChange={handleChange}
                disabled={formData.duration === "Half Day"}

                placeholder="Enter total leave days"

                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required

              /> */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                {formData.days || 0} Day(s)
              </div>

            </div>






            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Reason
              </label>


              <textarea

                name="reason"

                value={formData.reason}

                onChange={handleChange}

                rows={4}

                placeholder="Enter leave reason"

                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"

                required

              />


            </div>







            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Attachment URL (optional)
              </label>


              <input

                type="text"

                name="attachment"

                value={formData.attachment}

                onChange={handleChange}

                placeholder="Enter attachment link"

                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"

              />


            </div>







            <button

              type="submit"

              disabled={loading}

              className="flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] disabled:opacity-50"

            >

              {
                loading
                  ? "Applying..."
                  : "Apply Leave"
              }


            </button>




          </form>


        </div>


      </div>
    </div>

  );

}


