"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { BellRing } from "lucide-react";

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

  useEffect(() => {
    fetchNotifications();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-white px-4 sm:px-6 lg:px-8 py-8">
      {/* <h1 className="text-3xl font-bold text-gray-900">Notifications</h1> */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 shadow-sm">
          <BellRing className="h-7 w-7 text-blue-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notifications
          </h1>
          
        </div>
        
      </div>
      <br />

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-3xl font-bold text-gray-900">No notifications available.</p>
      ) : (
        <div className="space-y-8">
          {notifications.map((item) => (
            <div
              key={item._id}
              className="
                      group
                      rounded-2xl
                      border border-blue-100
                      bg-gradient-to-r from-blue-50 via-white to-blue-50
                      p-5
                      shadow-sm
                      transition-all
                      duration-300
                    hover:border-blue-300
                      hover:shadow-lg
                      hover:-translate-y-1
                      "
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">{item.title}</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {item.type}
                </span>
              </div>

              {/* <p className="mt-2 text-gray-700">{item.message}</p> */}
              <div className="mt-4">
                <p
                  className={`text-sm leading-7 text-gray-600 transition-all duration-300 ${expandedId === item._id ? "" : "line-clamp-1"
                    }`}
                >
                  {item.message}
                </p>

                {item.message.length > 80 && (
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === item._id ? null : item._id)
                    }
                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {expandedId === item._id ? "View Less" : "View More"}
                  </button>
                )}
              </div>


            </div>
          ))}
        </div>
      )}
    </div>
  );
}