"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import {
    Users,
    Search,
    Building2,
    Briefcase,
    CalendarDays,
    Trash2,
    Eye,
    Plus,
    Filter
} from "lucide-react";
interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    joiningDate: string;
}
interface CurrentUser {
    _id: string;
    role: string;
}
export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    
    const router = useRouter();
    useEffect(() => {
        const verifyRoleAndFetchData = async () => {
            try {
                // 1. Fetch current logged in user details to check role
                const meRes = await api.get("/user/me");
                const user = meRes.data?.user || meRes.data?.data?.user || meRes.data;
                setCurrentUser(user);
                // 2. If employee, redirect them straight to their profile page
                if (user && user.role === "employee") {
                    router.push(`/employees/${user._id}`);
                    return;
                }
                // 3. If admin, fetch all employees
                const res = await api.get("/employee");
                setEmployees(res.data.employees || []);
            } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                    "Failed to fetch employee database"
                );
            } finally {
                setLoading(false);
            }
        };
        verifyRoleAndFetchData();
    }, [router]);
    // Delete handler
    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete the profile of ${name}?`)) return;
        setDeletingId(id);
        try {
            await api.delete(`/employee/${id}`);
            setEmployees(prev => prev.filter(emp => emp._id !== id));
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete employee");
        } finally {
            setDeletingId(null);
        }
    };
    // Extract departments for the filter dropdown
    const departments = useMemo(() => {
        const list = employees.map(emp => emp.department).filter(Boolean);
        return ["all", ...Array.from(new Set(list))];
    }, [employees]);
    // Search and filter list
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesSearch = 
                `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.designation.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesDept = 
                selectedDepartment === "all" || 
                emp.department === selectedDepartment;
            return matchesSearch && matchesDept;
        });
    }, [employees, searchQuery, selectedDepartment]);
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50/50">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-slate-500 font-semibold text-sm">Loading Employee Directory...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Employee Directory
                        </h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">
                            Manage records, view profile details, and administer access roles.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 border border-indigo-100/50 px-4 py-2.5 text-indigo-700">
                            <Users className="h-5 w-5" />
                            <span className="font-bold text-sm">
                                {employees.length} Total
                            </span>
                        </div>
                        {currentUser?.role === "admin" && (
                            <button
                                onClick={() => router.push("/auth/register")}
                                className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2.5 font-bold text-sm text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all active:scale-[0.98]"
                            >
                                <Plus className="h-4.5 w-4.5" />
                                <span>Add Employee</span>
                            </button>
                        )}
                    </div>
                </div>
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-semibold text-red-600 flex items-center gap-2">
                        <span>{error}</span>
                    </div>
                )}
                {/* Filter and Search Bar */}
                <div className="mb-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
                    {/* Search Field */}
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or designation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 placeholder-slate-400 text-sm transition-all"
                        />
                    </div>
                    {/* Department Filter */}
                    <div className="relative w-full md:w-64 flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-400" />
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none font-medium text-slate-800 text-sm bg-white transition-all cursor-pointer"
                        >
                            <option value="all">All Departments</option>
                            {departments.filter(dept => dept !== "all").map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Employee Directory Table Card */}
                <div className="rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <th className="px-6 py-4.5 font-bold">Employee</th>
                                    <th className="px-6 py-4.5 font-bold">Department</th>
                                    <th className="px-6 py-4.5 font-bold">Designation</th>
                                    <th className="px-6 py-4.5 font-bold">Joining Date</th>
                                    <th className="px-6 py-4.5 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee) => (
                                        <tr
                                            key={employee._id}
                                            className="transition hover:bg-slate-50/40 align-middle"
                                        >
                                            {/* Profile avatar and details */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-100">
                                                        {employee.firstName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800 text-sm">
                                                            {employee.firstName} {employee.lastName}
                                                        </h3>
                                                        <span className="text-xs text-slate-400 font-medium">
                                                            {employee.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                                <span className="flex items-center gap-1.5">
                                                    <Building2 className="h-4 w-4 text-slate-400" />
                                                    {employee.department}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-xl bg-indigo-50/50 border border-indigo-100/50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                                                    {employee.designation}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <CalendarDays className="h-4 w-4 text-slate-400" />
                                                    {new Date(employee.joiningDate).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </td>
                                            {/* Action triggers */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={() => router.push(`/employee/${employee._id}`)}
                                                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all active:scale-95"
                                                        title="View Profile"
                                                    >
                                                        <Eye className="h-4.5 w-4.5" />
                                                    </button>
                                                    
                                                    {currentUser?.role === "admin" && (
                                                        <button
                                                            onClick={() => handleDelete(employee._id, `${employee.firstName} ${employee.lastName}`)}
                                                            disabled={deletingId === employee._id}
                                                            className="p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all active:scale-95 disabled:opacity-50"
                                                            title="Delete Employee"
                                                        >
                                                            <Trash2 className="h-4.5 w-4.5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                            No employees found matching the filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}








