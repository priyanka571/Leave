"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

export default function ApplyLeavePage() {

  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    days: "",
    reason: "",
    attachment: "",
  });


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();



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

      const res = await api.post(
        "/leaves",
        {
          ...formData,
          days: Number(formData.days)
        }
      );


      setMessage(
        res.data.message
      );


      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        days: "",
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

    <div className="p-8">


      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-900">
          Apply Leave
        </h1>


        <p className="text-sm text-gray-500">
          Submit your leave request
        </p>


      </div>





      <div className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">


        {
          message &&
          <div className="mb-5 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-600">
            {message}
          </div>
        }




        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >




          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Leave Type
            </label>


            <select

              name="leaveType"

              value={formData.leaveType}

              onChange={handleChange}

              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"

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

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                From Date
              </label>


              <input

                type="date"

                name="fromDate"

                value={formData.fromDate}

                onChange={handleChange}

                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"

                required

              />

            </div>





            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                To Date
              </label>


              <input

                type="date"

                name="toDate"

                value={formData.toDate}

                onChange={handleChange}

                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"

                required

              />

            </div>


          </div>






          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Total Days
            </label>


            <input

              type="number"

              name="days"

              value={formData.days}

              onChange={handleChange}

              placeholder="Enter total leave days"

              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"

              required

            />

          </div>






          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Reason
            </label>


            <textarea

              name="reason"

              value={formData.reason}

              onChange={handleChange}

              rows={4}

              placeholder="Enter leave reason"

              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"

              required

            />


          </div>







          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Attachment URL (optional)
            </label>


            <input

              type="text"

              name="attachment"

              value={formData.attachment}

              onChange={handleChange}

              placeholder="Enter attachment link"

              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"

            />


          </div>







          <button

            type="submit"

            disabled={loading}

            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"

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

  );

}