"use client";

import {
    LayoutDashboard,
    Users,
    Calendar,
    Building2,
    ClipboardCheck,
    Bell,
    Settings,
    HelpCircle,
    Search,
    User,
    LogOut,

} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/utils/axios";

interface SidebarProps {
    user: any; // Baad me iski proper type bana sakti hain
}

const navItems = [
    { label: "Leave", icon: Users, route: "/leave-request", roles: ["admin"] },
    { label: "Leave Apply", icon: Users, route: "/leave", roles: ["employee"] },
    { label: "My Leave", icon: Users, route: "/leave/my", roles: ["employee"] },

    { label: "Employee", icon: Users, route: "/employee", roles: ["admin"] },
    { label: "Profile", icon: User, route: (user: any) => `/employee/${user._id}`, roles: ["admin", "employee"] },
    { label: "Holidays", icon: Calendar, route: "/holidays", roles: ["admin", "employee"], },

    { label: "Notifications", icon: Bell, route: "/notifications", roles: ["admin", "employee"], },
    { label: "Create-Message", icon: Bell, route: "/notice", roles: ["admin"] },
];

const otherItems = [
    {
        label: "Setting",
        route: "/settings",
        icon: Settings,
    },
    {
        label: "Help Center",
        route: "/help",
        icon: HelpCircle,
    },
];


export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();



    useEffect(() => {
        console.log("User:", user);
    }, [user]);

    const handleLogout = async () => {
        try {

            await api.post("/auth/logout");

            router.push("/");
            router.refresh();

        } catch (error) {

            console.log("Logout error:", error);

        }
    };


    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
            <div className="px-5 py-5 flex items-center gap-2 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    S
                </div>
                <span className="font-semibold text-gray-900 text-lg">LeaveUp™</span>
            </div>


            <nav className="px-4 mt-6">
                <p className="text-xs font-semibold text-gray-400 px-2 mb-2 tracking-wide">MAIN MENU</p>
                <ul className="space-y-1">

                    {user ? navItems
                        .filter((item) => {

                            if (user) {
                                return item.roles.includes(user.role);
                            }

                            // return item.public === true;

                        })

                        .map((item) => {
                            const active = pathname === item.route;
                            const Icon = item.icon;

                            return (
                                <li key={item.label}>
                                    <Link
                                        href={typeof item.route === "function"
                                            ? item.route(user)
                                            : item.route}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active
                                            ? "bg-indigo-50 text-indigo-600 font-medium"
                                            : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Icon className="w-4.5 h-4.5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        }) : otherItems.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.route;

                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.route}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active
                                            ? "bg-indigo-50 text-indigo-600 font-medium"
                                            : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Icon className="w-4.5 h-4.5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })
                    }
                    {!user && (
                        <li>
                            <Link
                                href="/auth/login"
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                            >
                                <User className="w-4.5 h-4.5" />
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            {/* <div className="mt-auto px-4 pb-6">
                <p className="text-xs font-semibold text-gray-400 px-2 mb-2 tracking-wide">OTHER</p>
                <ul className="space-y-1">
                    <li>
                        <Link href="/settings" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                            <Settings className="w-4.5 h-4.5" />
                            Setting
                        </Link>
                    </li>
                    <li>
                        <Link href="/help" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                            <HelpCircle className="w-4.5 h-4.5" />
                            Help Center
                        </Link>
                    </li>
                    {user ? (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                            >
                                <LogOut className="w-4.5 h-4.5" />
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link
                                href="/auth/login"
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                            >
                                <User className="w-4.5 h-4.5" />
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div> */}
            {user && (
                <div className="mt-auto px-4 pb-6">
                    <p className="text-xs font-semibold text-gray-400 px-2 mb-2 tracking-wide">
                        OTHER
                    </p>

                    <ul className="space-y-1">
                        {otherItems.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.route;

                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.route}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active
                                                ? "bg-indigo-50 text-indigo-600 font-medium"
                                                : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Icon className="w-4.5 h-4.5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                            >
                                <LogOut className="w-4.5 h-4.5" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}


        </aside>

    );
}




