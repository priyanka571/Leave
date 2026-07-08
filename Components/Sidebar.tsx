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

} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/utils/axios";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, route: "/dashboard", roles: ["admin", "employee"] },
    { label: "Employee", icon: Users, route: "/employee", roles: ["admin"] },
    { label: "Profile", icon: User, route: "/profile", roles: ["admin", "employee"] },
    { label: "Calendar", icon: Calendar, route: "/calendar", roles: ["admin", "employee"] },
    { label: "Department", icon: Building2, route: "/department", roles: ["admin"] },
    { label: "Attendance", icon: ClipboardCheck, route: "/attendance", roles: ["admin"] },
    { label: "Notifications", icon: Bell, route: "/notifications", roles: ["admin"] },
];


export default function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {

            try {

                const res = await api.get("/user/me");
                //  console.log("API Response:", res.data);

                setUser(res.data.user);

            }
            catch (error) {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };


        getUser();

    }, []);
    useEffect(() => {
        console.log("User:", user);
    }, [user]);
    if (loading) {
        return null;
    }

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

                    {navItems
                        .filter(
                            item => item.roles.includes(user?.role)
                        ).map((item) => {
                            const active = pathname === item.route;
                            const Icon = item.icon;

                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.route}
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
                        })}
                </ul>
            </nav>

            <div className="mt-auto px-4 pb-6">
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
                </ul>
            </div>


        </aside>

    );
}