"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{item.title}</h2>

                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                  {item.type}
                </span>
              </div>

              <p className="mt-2 text-gray-700">{item.message}</p>

              <p className="mt-3 text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}