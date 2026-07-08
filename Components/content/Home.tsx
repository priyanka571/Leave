import Link from "next/link";
export default function Home() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-5xl font-bold text-gray-900 md:text-6xl animate-[fade-in_0.8s_ease-out]">
                    Employee Management System
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-gray-600">
                    Manage employees, attendance, leave requests, payroll, and employee
                    records from one place.
                </p>

                <div className="mt-10 flex gap-4">
                    <Link
                        href="/auth/login"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:scale-105 hover:bg-blue-700"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
