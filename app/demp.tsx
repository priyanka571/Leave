"use client";

import { useState } from "react";

// ---------- Types ----------
type LeaveType = "Annual Leave" | "Sick Leave";
type Status = "Pending" | "Approved";

interface LeaveRequest {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  hasNotification?: boolean;
  leaveType: LeaveType;
  from: string;
  to: string;
  days: number;
  status: Status;
}

// ---------- Mock data (swap for real API data) ----------
const requests: LeaveRequest[] = [
  {
    id: "1",
    name: "Brooklyn Simmons",
    initials: "BS",
    avatarColor: "bg-rose-200 text-rose-700",
    hasNotification: true,
    leaveType: "Annual Leave",
    from: "Jan 23, 2024",
    to: "Jan 24, 2024",
    days: 1,
    status: "Pending",
  },
  {
    id: "2",
    name: "Ralph Edwards",
    initials: "RE",
    avatarColor: "bg-sky-200 text-sky-700",
    hasNotification: true,
    leaveType: "Sick Leave",
    from: "Jan 23, 2024",
    to: "Jan 27, 2024",
    days: 4,
    status: "Pending",
  },
  {
    id: "3",
    name: "Leslie Alexander",
    initials: "LA",
    avatarColor: "bg-amber-200 text-amber-700",
    leaveType: "Annual Leave",
    from: "Jan 12, 2024",
    to: "Jan 14, 2024",
    days: 2,
    status: "Approved",
  },
  {
    id: "4",
    name: "Cody Fisher",
    initials: "CF",
    avatarColor: "bg-emerald-200 text-emerald-700",
    leaveType: "Sick Leave",
    from: "Jan 04, 2024",
    to: "Jan 06, 2024",
    days: 2,
    status: "Approved",
  },
  {
    id: "5",
    name: "Arlene McCoy",
    initials: "AM",
    avatarColor: "bg-violet-200 text-violet-700",
    leaveType: "Annual Leave",
    from: "Jan 03, 2024",
    to: "Jan 08, 2024",
    days: 5,
    status: "Approved",
  },
];

const departments = [
  { name: "Bussines and Marketing", color: "bg-blue-500" },
  { name: "Design", color: "bg-emerald-500" },
  { name: "Project Manager", color: "bg-amber-500" },
  { name: "Human Resource", color: "bg-purple-500" },
  { name: "Development", color: "bg-blue-600" },
];

const navItems = [
  { label: "Dashboard", icon: "grid" },
  { label: "Employee", icon: "users" },
  { label: "Recruitment", icon: "user-plus" },
  { label: "Payroll", icon: "card" },
  { label: "Schedule", icon: "calendar" },
];

// ---------- Small inline icon set (no external deps) ----------
function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
  };
  switch (name) {
    case "grid":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15 14.2c2.6.5 4.5 2.5 4.5 5.8" />
        </svg>
      );
    case "user-plus":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" />
          <path d="M19 8v6M16 11h6" />
        </svg>
      );
    case "card":
      return (
        <svg {...props}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M3 9.5h18M8 3v3M16 3v3" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z" />
          <path d="M10 20a2 2 0 004 0" />
        </svg>
      );
    case "share":
      return (
        <svg {...props}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" />
        </svg>
      );
    case "filter":
      return (
        <svg {...props}>
          <path d="M4 5h16M7 12h10M10 19h4" />
        </svg>
      );
    case "export":
      return (
        <svg {...props}>
          <path d="M12 15V4M8 8l4-4 4 4" />
          <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.6 1z" />
        </svg>
      );
    case "help":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 015 .5c0 1.7-2.3 2-2.3 3.5" />
          <path d="M12 17h.01" />
        </svg>
      );
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: Status }) {
  const styles =
    status === "Pending"
      ? "bg-orange-50 text-orange-500"
      : "bg-emerald-50 text-emerald-600";
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function LeaveTypeBadge({ type }: { type: LeaveType }) {
  const styles =
    type === "Annual Leave"
      ? "bg-blue-50 text-blue-600"
      : "bg-emerald-50 text-emerald-600";
  const dot = type === "Annual Leave" ? "bg-blue-500" : "bg-emerald-500";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {type}
    </span>
  );
}

export default function LeaveManagementHome() {
  const [activeTab, setActiveTab] = useState<"manage" | "org" | "request">("request");
  const [search, setSearch] = useState("");

  const filtered = requests.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="font-semibold text-gray-900 text-lg">LeaveUp™</span>
        </div>

        <div className="px-4 pt-4">
          <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
                R
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 leading-tight">Rocks Company</p>
                <p className="text-xs text-gray-400 leading-tight">Team · 20 Members</p>
              </div>
            </div>
            <span className="text-gray-400 text-xs">⌄</span>
          </button>
        </div>

        <nav className="px-4 mt-6">
          <p className="text-xs font-semibold text-gray-400 px-2 mb-2 tracking-wide">MAIN MENU</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = item.label === "Employee";
              return (
                <li key={item.label}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Icon name={item.icon} className="w-4.5 h-4.5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 mt-6">
          <div className="flex items-center justify-between px-2 mb-2">
            <p className="text-xs font-semibold text-gray-400 tracking-wide">DEPARTMENT</p>
            <span className="text-gray-400 text-sm">+</span>
          </div>
          <ul className="space-y-1">
            {departments.map((d) => (
              <li key={d.name}>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                  <span className={`w-2 h-2 rounded-full ${d.color}`} />
                  {d.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 px-2 mb-2 tracking-wide">OTHER</p>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                <Icon name="settings" className="w-4.5 h-4.5" />
                Setting
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                <Icon name="help" className="w-4.5 h-4.5" />
                Help Center
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="relative w-full max-w-md">
            <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword..."
              className="w-full pl-9 pr-16 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
              ⌘+K
            </span>
          </div>
          <div className="flex items-center gap-3 ml-6 shrink-0">
            <button className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              <Icon name="bell" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              <Icon name="share" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page header */}
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Icon name="users" className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Employee</h1>
                <p className="text-sm text-gray-400">Manage your employee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Icon name="export" className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                <Icon name="plus" className="w-4 h-4" />
                Add Employee
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-6 border-b border-gray-100">
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "manage"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon name="users" className="w-4 h-4" />
              Manage Employees
            </button>
            <button
              onClick={() => setActiveTab("org")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "org"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon name="grid" className="w-4 h-4" />
              Organization Chart
            </button>
            <button
              onClick={() => setActiveTab("request")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "request"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon name="calendar" className="w-4 h-4" />
              Request Time Off
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-6 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Request Time Off</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search keyword..."
                  className="pl-9 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Icon name="filter" className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
                  <th className="font-medium px-6 py-3">Employee Name</th>
                  <th className="font-medium px-6 py-3">Leave Type</th>
                  <th className="font-medium px-6 py-3">Leave From</th>
                  <th className="font-medium px-6 py-3">Leave To</th>
                  <th className="font-medium px-6 py-3">Days</th>
                  <th className="font-medium px-6 py-3">Status</th>
                  <th className="font-medium px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${r.avatarColor}`}>
                          {r.initials}
                        </div>
                        <span className="font-medium text-gray-800">{r.name}</span>
                        {r.hasNotification && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <LeaveTypeBadge type={r.leaveType} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{r.from}</td>
                    <td className="px-6 py-4 text-gray-500">{r.to}</td>
                    <td className="px-6 py-4 text-gray-500">{r.days}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {r.status === "Pending" ? (
                          <>
                            <button className="px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-600 text-xs font-medium hover:bg-emerald-50">
                              Approve
                            </button>
                            <button className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-500 text-xs font-medium hover:bg-rose-50">
                              Reject
                            </button>
                          </>
                        ) : (
                          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-medium hover:bg-gray-50">
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
