// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/utils/axios";
// import {
//   Mail,
//   Phone,
//   Building2,
//   CalendarDays,
//   User,
//   MapPin,
//   Briefcase,
//   IndianRupee,
//   UserRound,
//   ShieldCheck
// } from "lucide-react";


// interface Employee {

//   employeeId:string;
//   firstName:string;
//   lastName:string;
//   phone:string;
//   department:string;
//   designation:string;
//   joiningDate:string;
//   manager:string;
//   salary:number;
//   gender:string;
//   dob:string;
//   address:string;
//   profileImage:string;
//   role:string;
//   status:string;
//   remainingLeaves:number;
//   email:string;

// }



// export default function EmployeeProfilePage(){


//   const params = useParams();

//   const id = params.id as string;


//   const [employee,setEmployee] = useState<Employee | null>(null);

//   const [loading,setLoading] = useState(true);

//   const [error,setError] = useState("");




//   useEffect(()=>{


//     const getEmployee = async()=>{

//       try{

//         const res = await api.get(`/employee/${id}`);

//         setEmployee(res.data.employee);


//       }
//       catch(error:any){

//         setError(
//           error.response?.data?.message ||
//           "Unable to fetch profile"
//         );

//       }
//       finally{

//         setLoading(false);

//       }

//     };


//     getEmployee();


//   },[id]);





//   if(loading){

//     return(
//       <div className="flex justify-center p-10">
//         Loading profile...
//       </div>
//     )

//   }





//   if(error){

//     return(
//       <p className="p-10 text-red-500">
//         {error}
//       </p>
//     )

//   }





//   return (

//     <div className="p-8 bg-gray-50 min-h-screen">


//       <div className="bg-white rounded-2xl shadow-sm border p-8">


//         {/* Profile Header */}

//         <div className="flex items-center gap-6 border-b pb-6">


//           {
//             employee?.profileImage ?

//             <img
//               src={employee.profileImage}
//               className="w-24 h-24 rounded-full object-cover"
//             />

//             :

//             <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">

//               {employee?.firstName.charAt(0)}

//             </div>

//           }




//           <div>

//             <h1 className="text-3xl font-bold text-gray-900">

//               {employee?.firstName} {employee?.lastName}

//             </h1>


//             <p className="text-gray-500 mt-1">

//               {employee?.designation}

//             </p>


//             <span className="inline-block mt-3 rounded-full bg-green-100 px-4 py-1 text-sm text-green-700">

//               {employee?.status}

//             </span>


//           </div>


//         </div>





//         {/* Personal Information */}

//         <section className="mt-8">


//           <h2 className="text-xl font-semibold mb-5">
//             Personal Information
//           </h2>


//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


//             <Info
//               icon={<User/>}
//               title="Employee ID"
//               value={employee?.employeeId}
//             />


//             <Info
//               icon={<Mail/>}
//               title="Email"
//               value={employee?.email}
//             />


//             <Info
//               icon={<Phone/>}
//               title="Phone"
//               value={employee?.phone}
//             />


//             <Info
//               icon={<UserRound/>}
//               title="Gender"
//               value={employee?.gender}
//             />


//             <Info
//               icon={<CalendarDays/>}
//               title="Date of Birth"
//               value={
//                 employee?.dob
//                 ? new Date(employee.dob).toLocaleDateString()
//                 : "-"
//               }
//             />


//             <Info
//               icon={<MapPin/>}
//               title="Address"
//               value={employee?.address}
//             />


//           </div>


//         </section>






//         {/* Job Information */}


//         <section className="mt-10">


//           <h2 className="text-xl font-semibold mb-5">
//             Job Information
//           </h2>



//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


//             <Info
//               icon={<Building2/>}
//               title="Department"
//               value={employee?.department}
//             />


//             <Info
//               icon={<Briefcase/>}
//               title="Designation"
//               value={employee?.designation}
//             />


//             <Info
//               icon={<CalendarDays/>}
//               title="Joining Date"
//               value={
//                 employee?.joiningDate
//                 ? new Date(employee.joiningDate)
//                 .toLocaleDateString()
//                 : "-"
//               }
//             />


//             <Info
//               icon={<User/>}
//               title="Manager"
//               value={employee?.manager}
//             />



//             <Info
//               icon={<IndianRupee/>}
//               title="Salary"
//               value={`₹ ${employee?.salary}`}
//             />



//             <Info
//               icon={<ShieldCheck/>}
//               title="Role"
//               value={employee?.role}
//             />


//           </div>


//         </section>







//         {/* Leave Information */}

//         <section className="mt-10">


//           <h2 className="text-xl font-semibold mb-5">
//             Leave Information
//           </h2>


//           <Info
//             icon={<CalendarDays/>}
//             title="Remaining Paid Leaves"
//             // value={`${employee?.remainingLeaves} Days`}
//              value={`${employee?.leaveBalance?.paidLeaves?.remaining ?? 0} Days`}
//           />


//         </section>



//       </div>


//     </div>

//   );

// }





// function Info(
// {
//  icon,
//  title,
//  value
// }:{
//  icon:any;
//  title:string;
//  value:any;
// }

// ){

// return(

// <div className="flex gap-4 items-start rounded-xl bg-gray-50 p-5">


// <div className="text-indigo-600">
//  {icon}
// </div>


// <div>

// <p className="text-sm text-gray-500">
//  {title}
// </p>


// <p className="font-medium text-gray-900 mt-1">
//  {value || "-"}
// </p>


// </div>


// </div>

// )

// }



"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";
import {
  Mail,
  Phone,
  Building2,
  CalendarDays,
  User,
  MapPin,
  Briefcase,
  IndianRupee,
  UserRound,
  ShieldCheck,
  ArrowLeft,
  Edit3,
  Check,
  X,
  Lock
} from "lucide-react";
interface Employee {
  _id: string;
  employeeId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  manager?: string;
  salary?: number;
  gender?: string;
  dob?: string;
  address?: string;
  profileImage?: string;
  role?: string;
  status?: string;
  remainingLeaves?: number;
  leaveBalance?: {
    paidLeaves?: {
      remaining?: number;
    };
  };
}
interface CurrentUser {
  _id: string;
  role: string;
}
// Helper to format Date strings specifically for HTML input elements (YYYY-MM-DD)
const formatDateToInput = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Admin Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    manager: "",
    salary: 0,
    gender: "",
    dob: "",
    address: "",
    profileImage: "",
    status: "",
    remainingLeaves: 0,
  });
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 1. Fetch current user session
        const userRes = await api.get("/user/me");
        const user = userRes.data?.user || userRes.data?.data?.user || userRes.data;
        setCurrentUser(user);
        // 2. Fetch the target employee profile details
        const res = await api.get(`/employee/${id}`);
        const empData = res.data.employee;
        setEmployee(empData);
        // 3. Pre-fill edit form details
        setEditFormData({
          firstName: empData.firstName || "",
          lastName: empData.lastName || "",
          email: empData.email || "",
          phone: empData.phone || "",
          department: empData.department || "",
          designation: empData.designation || "",
          joiningDate: formatDateToInput(empData.joiningDate),
          manager: empData.manager || "",
          salary: empData.salary || 0,
          gender: empData.gender || "",
          dob: formatDateToInput(empData.dob),
          address: empData.address || "",
          profileImage: empData.profileImage || "",
          status: empData.status || "",
          remainingLeaves: empData.remainingLeaves || empData.leaveBalance?.paidLeaves?.remaining || 0,
        });
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          "Unable to fetch profile details"
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProfileData();
    }
  }, [id]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleStartEditing = () => {
    if (!employee) return;
    setEditFormData({
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      email: employee.email || "",
      phone: employee.phone || "",
      department: employee.department || "",
      designation: employee.designation || "",
      joiningDate: formatDateToInput(employee.joiningDate),
      manager: employee.manager || "",
      salary: employee.salary || 0,
      gender: employee.gender || "",
      dob: formatDateToInput(employee.dob),
      address: employee.address || "",
      profileImage: employee.profileImage || "",
      status: employee.status || "",
      remainingLeaves: employee.remainingLeaves || employee.leaveBalance?.paidLeaves?.remaining || 0,
    });
    setIsEditing(true);
  };

  // Submit patches
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await api.patch(`/employee/${id}`, editFormData);
      if (res.data.success) {
        setEmployee(res.data.employee);
        setIsEditing(false);
      } else {
        setError(res.data.message || "Failed to update profile");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to save changes"
      );
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-500 font-semibold text-sm">Loading Profile...</p>
        </div>
      </div>
    );
  }
  if (error && !employee) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-12 bg-white rounded-3xl border border-slate-100 shadow-xl ">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h3>
        <p className="text-slate-500 text-sm mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-sm text-slate-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }
  const isAdmin = currentUser?.role === "admin";
  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Back Navigation Bar (Only for admin) */}
        {isAdmin && (
          <div className="mb-6">
            <button
              onClick={() => router.push("/employees")}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-all"
            >
              <ArrowLeft className="w-4.5 h-4.5" /> Back to Directory
            </button>
          </div>
        )}
        {/* Profile Container Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">

          {/* PROFILE HEADER PANEL */}
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {employee?.profileImage ? (
                <img
                  src={employee.profileImage}
                  alt={`${employee.firstName}'s Avatar`}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200/50 shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-md shadow-indigo-100">
                  {employee?.firstName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {employee?.firstName} {employee?.lastName}
                </h1>
                <p className="text-slate-500 text-sm font-semibold mt-1">
                  {employee?.designation}
                </p>
                {!isEditing && (
                  <span className={`inline-flex mt-2 px-2.5 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider ${employee?.status === "active"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : "bg-amber-50 border-amber-100 text-amber-600"
                    }`}>
                    {employee?.status || "Active"}
                  </span>
                )}
              </div>
            </div>
            {/* Admin Action Button Toggles */}
            {isAdmin && !isEditing && (
              <button
                onClick={handleStartEditing}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
          {error && (
            <div className="m-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-semibold text-red-600">
              {error}
            </div>
          )}
          {/* RENDERING OPTION A: EMPLOYEE-RESTRICTED VIEW */}
          {!isAdmin ? (
            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <RestrictedCard
                  label="Full Name"
                  val={`${employee?.firstName} ${employee?.lastName}`}
                  desc="Employee Identity Name"
                />
                <RestrictedCard
                  label="Designation"
                  val={employee?.designation || "-"}
                  desc="Assigned Workplace Role"
                />
                <RestrictedCard
                  label="Remaining Paid Leaves"
                  val={`${employee?.leaveBalance?.paidLeaves?.remaining ?? employee?.remainingLeaves ?? 0} Days`}
                  desc="Current Paid Leave Balance"
                  highlight={true}
                />
              </div>
            </div>
          ) : (
            /* RENDERING OPTION B: ADMIN VIEW (READ OR EDIT MODES) */
            <div className="p-6 md:p-8">
              {isEditing ? (
                <form onSubmit={handleSaveChanges} className="space-y-6">
                  {/* Personal details fields group */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label="First Name" name="firstName" value={editFormData.firstName} onChange={handleInputChange} required />
                      <FormInput label="Last Name" name="lastName" value={editFormData.lastName} onChange={handleInputChange} required />
                      <FormInput label="Email" name="email" type="email" value={editFormData.email} onChange={handleInputChange} required />
                      <FormInput label="Phone" name="phone" value={editFormData.phone} onChange={handleInputChange} required />
                      <FormSelect label="Gender" name="gender" value={editFormData.gender} onChange={handleInputChange} options={["male", "female", "other"]} />
                      <FormInput label="Date of Birth" name="dob" type="date" value={editFormData.dob} onChange={handleInputChange} />
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Address</label>
                        <textarea
                          name="address"
                          value={editFormData.address}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 font-medium text-slate-800 text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Job detail fields group */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                      Job & Leave Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label="Department" name="department" value={editFormData.department} onChange={handleInputChange} required />
                      <FormInput label="Designation" name="designation" value={editFormData.designation} onChange={handleInputChange} required />
                      <FormInput label="Joining Date" name="joiningDate" type="date" value={editFormData.joiningDate} onChange={handleInputChange} required />
                      <FormInput label="Manager" name="manager" value={editFormData.manager} onChange={handleInputChange} />
                      <FormInput label="Salary (₹)" name="salary" type="number" value={editFormData.salary} onChange={handleInputChange} />
                      <FormInput label="Remaining Leaves" name="remainingLeaves" type="number" value={editFormData.remainingLeaves} onChange={handleInputChange} />
                      <FormSelect label="Status" name="status" value={editFormData.status} onChange={handleInputChange} options={["active", "inactive"]} />
                    </div>
                  </div>
                  {/* Submit actions */}
                  <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1 px-5 py-2.5 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition active:scale-95"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition active:scale-95 disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      {submitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                /* ADMIN READ MODE DETAILS LAYOUT */
                <div className="space-y-8">
                  {/* Section 1 */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoCard icon={<User />} label="Employee ID" value={employee?.employeeId} />
                      <InfoCard icon={<Mail />} label="Email Address" value={employee?.email} />
                      <InfoCard icon={<Phone />} label="Phone Number" value={employee?.phone} />
                      <InfoCard icon={<UserRound />} label="Gender" value={employee?.gender} />
                      <InfoCard icon={<CalendarDays />} label="Date of Birth" value={employee?.dob ? new Date(employee.dob).toLocaleDateString("en-IN") : "-"} />
                      <InfoCard icon={<MapPin />} label="Address" value={employee?.address} colSpan={2} />
                    </div>
                  </div>
                  {/* Section 2 */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                      Job Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoCard icon={<Building2 />} label="Department" value={employee?.department} />
                      <InfoCard icon={<Briefcase />} label="Designation" value={employee?.designation} />
                      <InfoCard icon={<CalendarDays />} label="Joining Date" value={employee?.joiningDate ? new Date(employee.joiningDate).toLocaleDateString("en-IN") : "-"} />
                      <InfoCard icon={<User />} label="Manager" value={employee?.manager} />
                      <InfoCard icon={<IndianRupee />} label="Salary" value={employee?.salary ? `₹ ${employee.salary.toLocaleString("en-IN")}` : "-"} />
                      <InfoCard icon={<ShieldCheck />} label="User Access Role" value={employee?.role} />
                    </div>
                  </div>
                  {/* Section 3 */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                      Leave Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <InfoCard
                        icon={<CalendarDays />}
                        label="Remaining Paid Leaves"
                        value={`${employee?.leaveBalance?.paidLeaves?.remaining ?? employee?.remainingLeaves ?? 0} Days`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// Subcomponent: Restricted cards for employee view
function RestrictedCard({ label, val, desc, highlight = false }: { label: string; val: string; desc: string; highlight?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${highlight
      ? "bg-indigo-50/40 border-indigo-100/50 hover:bg-indigo-50/60"
      : "bg-slate-50/30 border-slate-100/80 hover:bg-slate-50/50"
      }`}>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</h4>
      <p className={`mt-2 text-lg font-extrabold tracking-tight ${highlight ? "text-indigo-600" : "text-slate-800"}`}>
        {val}
      </p>
      <span className="text-[10px] text-slate-400 mt-1 block font-medium">
        {desc}
      </span>
    </div>
  );
}
// Subcomponent: Info card row
function InfoCard({ icon, label, value, colSpan = 1 }: { icon: React.ReactNode; label: string; value?: string | number | null; colSpan?: number }) {
  return (
    <div className={`flex gap-4 items-start rounded-2xl bg-slate-50/40 border border-slate-100/50 p-4 transition-all hover:bg-slate-50/80 ${colSpan === 2 ? "md:col-span-2" : ""
      }`}>
      <div className="text-indigo-600 mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="font-bold text-slate-800 mt-1 text-sm">{value || "-"}</p>
      </div>
    </div>
  );
}
// Form Field Components for Edit Mode
function FormInput({ label, name, type = "text", value, onChange, required = false }: { label: string; name: string; type?: string; value: string | number; onChange: (e: any) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label} {required && "*"}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 font-medium text-slate-800 text-sm transition-all"
      />
    </div>
  );
}
function FormSelect({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (e: any) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none font-medium text-slate-800 text-sm bg-white transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="capitalize">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
