"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/utils/axios";
import { Pencil, Trash2, Plus, BellRing } from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
}

export default function NotificationPage() {


  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const messageRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const [showViewMore, setShowViewMore] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "announcement",
  });




  const fetchUser = async () => {
    try {
      const res = await api.get("/user/me");
      console.log("API Response:", res.data)
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };


  const checkOverflow = () => {
    const temp: Record<string, boolean> = {};

    notifications.forEach((item) => {
      const el = messageRefs.current[item._id];

      if (el) {
        temp[item._id] = el.scrollHeight > el.clientHeight;
      }
    });

    setShowViewMore(temp);
  };
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchNotifications();
  }, []);

  // useEffect(() => {
  //   const temp: Record<string, boolean> = {};

  //   notifications.forEach((item) => {
  //     const el = messageRefs.current[item._id];
  //     if (el) {
  //       temp[item._id] = el.scrollWidth > el.clientWidth;
  //     }
  //   });

  //   setShowViewMore(temp);
  // }, [notifications]);

  useEffect(() => {
    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [notifications]);

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this notice?")) return;

    await api.delete(`/notifications/${id}`);

    fetchNotifications();
  }

  const handleEdit = (notice: Notification) => {

    setForm({
      title: notice.title,
      message: notice.message,
      type: notice.type
    });

    setEditingId(notice._id);

    setOpenCreate(true);

  }

  const handleSubmit = async () => {

    if (editingId) {

      await api.put(`/notifications/${editingId}`, form);

    } else {

      await api.post("/notifications", form);

    }



    // setOpenCreate(false);
    setForm({
      title: "",
      message: "",
      type: "announcement",
    });

    setEditingId(null);
    fetchNotifications();
    setOpenCreate(false);

  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  console.log("User:", user);

  return (


    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <BellRing className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Stay updated with the latest announcements and system alerts.
            </p>
          </div>



          {user?.role === "admin" && (
            <button
              onClick={() => {
                setEditingId(null);

                setForm({
                  title: "",
                  message: "",
                  type: "announcement",
                });

                setOpenCreate(true);
              }}
              className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2.5 font-bold text-sm text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              + Create Notice
            </button>
          )}
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-slate-500">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <BellRing className="mb-4 h-14 w-14 text-slate-300" />
              <h2 className="text-xl font-semibold text-slate-700">
                No Notifications
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                You're all caught up.
              </p>
            </div>
          ) : (
            <div className="space-y-5 p-5">
              {notifications.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-4">

                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                        <BellRing className="h-5 w-5 text-blue-600" />
                      </div>



                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-semibold text-slate-900">
                            {item.title}
                          </h2>

                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {item.type}
                          </span>



                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>

                        <p
                          ref={(el) => {
                            messageRefs.current[item._id] = el;
                          }}
                          className={`mt-4 text-sm leading-7 text-slate-600 ${expandedId === item._id ? "" : "line-clamp-1"
                            }`}
                        >
                          {item.message}
                        </p>
                        {/* 
                        {user?.role === "admin" && (
                        <div className="flex gap-2">

                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>
                      )} */}



                        {(showViewMore[item._id] || expandedId === item._id) && (
                          <button
                            onClick={() =>
                              setExpandedId(expandedId === item._id ? null : item._id)
                            }
                            className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                          >
                            {expandedId === item._id ? "View Less" : "View More"}
                          </button>
                        )}
                      </div>

                    </div>

                    {user?.role === "admin" && (
                      <div className="flex gap-2">

                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {openCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="mb-5 text-xl font-semibold text-slate-800">
              {editingId ? "Edit Notice" : "Create Notice"}
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Notice Title"
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3"
              >
                <option value="announcement">Announcement</option>
                <option value="holiday">Holiday</option>
                <option value="event">Event</option>
                <option value="alert">Alert</option>
              </select>

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setOpenCreate(false)}
                className="rounded-xl border border-slate-300 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                {editingId ? "Update" : "Create"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}