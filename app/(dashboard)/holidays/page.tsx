// "use client";
// import { useEffect, useMemo, useState } from "react";
// import api from "@/utils/axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// interface Holiday {
//     _id: string;
//     title: string;
//     description: string;
//     holidayDate: string;
//     type: "government" | "festival" | "office" | "optional";
//     color?: string;
//     isActive?: boolean;
//     source?: "API" | "ADMIN";
// }
// interface User {
//     role: string;
//     [key: string]: any;
// }
// interface HolidayPageProps {
//     user?: User | null;
// }
// // Utility function to check if two dates match, preventing timezone shifts
// const isSameDay = (holidayDateStr: string, calendarDate: Date): boolean => {
//     if (!holidayDateStr) return false;
    
//     // Parse "YYYY-MM-DD..." by extracting year, month, and day directly.
//     // This avoids timezone shifts where UTC dates could show on the wrong day locally.
//     const datePart = holidayDateStr.split("T")[0];
//     const parts = datePart.split("-");
//     if (parts.length === 3) {
//         const year = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
//         const day = parseInt(parts[2], 10);
        
//         return calendarDate.getFullYear() === year &&
//                calendarDate.getMonth() === month &&
//                calendarDate.getDate() === day;
//     }
    
//     // Fallback if formatting differs
//     const d1 = new Date(holidayDateStr);
//     return d1.toDateString() === calendarDate.toDateString();
// };
// export default function HolidayPage({ user: propUser }: HolidayPageProps) {
//     const [holidays, setHolidays] = useState<Holiday[]>([]);
//     const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
    
//     // Modals visibility states
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
//     const [loading, setLoading] = useState(true);
//     // Auth / User Role State (defaults to false / employee)
//     const [isAdmin, setIsAdmin] = useState(false);
//     // Check actual role from server prop or client-side fetch on mount
   

//         useEffect(() => {
//         if (propUser) {
//             setIsAdmin(propUser.role === "admin");
//             return;
//         }
//         const fetchCurrentUser = async () => {
//             try {
//                 // Call same-origin endpoint to get logged-in user.
//                 // The browser automatically propagates the cookie with this request.
//                 const res = await api.get("/user/me");
//                 // Parse standard return formats
//                 const userData = res.data?.user || res.data?.data?.user || res.data;
//                 if (userData && (userData.role === "admin" || userData.isAdmin)) {
//                     setIsAdmin(true);
//                 } else {
//                     setIsAdmin(false);
//                 }
//             } catch (err) {
//                 console.error("Client side failed to fetch user session from cookies:", err);
//                 setIsAdmin(false);
//             }
//         };
//         fetchCurrentUser();
//         }, [propUser]);
//     // Create Holiday Form State
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         holidayDate: "",
//         type: "government" as Holiday["type"],
//         color: "#6366f1",
//         isActive: true,
//         source: "ADMIN" as const
//     });
//     const [submitting, setSubmitting] = useState(false);
//     const [formError, setFormError] = useState("");
//     // Fetch holidays helper
//     const fetchHolidayData = async () => {
//         try {
//             const res = await api.get("/holidays");
//             // API return data could be in res.data.data or res.data
//             const fetchedHolidays = res.data.data || res.data;
//             if (Array.isArray(fetchedHolidays)) {
//                 setHolidays(fetchedHolidays);
//             }
//         } catch (error) {
//             console.error("Failed to fetch holidays:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchHolidayData();
//     }, []);
//     // Filter holidays for the display based on role & active state
//     const visibleHolidays = useMemo(() => {
//         if (isAdmin) return holidays;
//         return holidays.filter(h => h.isActive !== false);
//     }, [holidays, isAdmin]);
//     // Format events for FullCalendar
//     const events = useMemo(() => {
//         return visibleHolidays.map((holiday) => ({
//             id: holiday._id,
//             title: holiday.title,
//             start: holiday.holidayDate,
//             allDay: true,
//             extendedProps: {
//                 description: holiday.description,
//                 type: holiday.type,
//                 isActive: holiday.isActive !== false,
//             },
//         }));
//     }, [visibleHolidays]);
//     // Form inputs change handlers
//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, checked } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: checked }));
//     };
//     // Submit Custom Holiday (matching backend schema)
//     const handleFormSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setSubmitting(true);
//         setFormError("");
//         try {
//             // Post payload matching Mongoose schema exactly
//             const response = await api.post("/holidays", {
//                 ...formData,
//                 // Ensure date format is correct for DB parsing
//                 holidayDate: new Date(formData.holidayDate).toISOString(),
//             });
//             if (response.data.success) {
//                 // Refresh list & close modal
//                 await fetchHolidayData();
//                 setIsAddModalOpen(false);
//                 // Reset form values
//                 setFormData({
//                     title: "",
//                     description: "",
//                     holidayDate: "",
//                     type: "government",
//                     color: "#6366f1",
//                     isActive: true,
//                     source: "ADMIN"
//                 });
//             } else {
//                 setFormError(response.data.message || "Failed to create holiday");
//             }
//         } catch (error: any) {
//             console.error("Create Holiday Error:", error);
//             setFormError(
//                 error.response?.data?.message || 
//                 error.message || 
//                 "An error occurred while creating the holiday."
//             );
//         } finally {
//             setSubmitting(false);
//         }
//     };
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-[60vh] text-slate-500 font-medium">
//                 <div className="flex flex-col items-center gap-3">
//                     <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Loading Holiday Calendar...</span>
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen">
//             {/* Custom styled calendar styles injected directly into the document */}
//             <style jsx global>{`
//                 /* General custom overrides for FullCalendar */
               
//             `}</style>
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//                     <div>
//                         <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
//                             Holiday Calendar
//                         </h1>
//                         <p className="text-slate-500 mt-1 font-medium">
//                             Official company holidays, corporate events, and government listings.
//                         </p>
//                     </div>
//                     {/* Action Panel: Add button & Legend */}
//                     <div className="flex flex-wrap items-center gap-4">
//                         {/* Legend */}
//                         <div className="flex flex-wrap items-center gap-4.5 text-xs font-bold text-slate-600 bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
//                             <span className="text-slate-400 uppercase tracking-wider text-[10px]">Legend:</span>
//                             <div className="flex items-center gap-1.5">
//                                 <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
//                                 <span>Government</span>
//                             </div>
//                             <div className="flex items-center gap-1.5">
//                                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
//                                 <span>Festival</span>
//                             </div>
//                             <div className="flex items-center gap-1.5">
//                                 <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
//                                 <span>Office</span>
//                             </div>
//                             <div className="flex items-center gap-1.5">
//                                 <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
//                                 <span>Optional</span>
//                             </div>
//                         </div>
//                         {/* Add Holiday Button (Only Visible to Admin) */}
//                         {isAdmin && (
//                             <button
//                                 onClick={() => setIsAddModalOpen(true)}
//                                 className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98]"
//                             >
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
//                                 </svg>
//                                 <span>Add Holiday</span>
//                             </button>
//                         )}
//                     </div>
//                 </div>
//                 {/* Calendar Layout */}
//                 <div className="bg-white rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100 p-6 md:p-8">
//                     <FullCalendar
//                         plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
//                         initialView="dayGridMonth"
//                         height="auto"
//                         events={events}
//                         headerToolbar={{
//                             left: "prev,next today",
//                             center: "title",
//                             right: "dayGridMonth,listMonth",
//                         }}
                        
//                         // Handle date cell rendering to color cells based on holiday type
//                         dayCellDidMount={(info) => {
//                             const holiday = visibleHolidays.find((h) => isSameDay(h.holidayDate, info.date));
//                             if (holiday) {
//                                 const type = holiday.type?.toLowerCase() || "";
                                
//                                 // Apply specific category classes
//                                 if (type.includes("government")) {
//                                     info.el.classList.add("government-holiday-cell");
//                                 } else if (type.includes("festival")) {
//                                     info.el.classList.add("festival-holiday-cell");
//                                 } else if (type.includes("office")) {
//                                     info.el.classList.add("office-holiday-cell");
//                                 } else {
//                                     info.el.classList.add("optional-holiday-cell");
//                                 }
//                                 // Apply styling if inactive
//                                 if (holiday.isActive === false) {
//                                     info.el.classList.add("inactive-holiday-cell");
//                                 }
                                
//                                 // Set native tooltip info for accessibility/quick reference
//                                 info.el.setAttribute("title", `${holiday.title} (${holiday.type}${holiday.isActive === false ? ' - Inactive' : ''})`);
//                             }
//                         }}
//                         // Click handlers to pop up details modal
//                         dateClick={(info) => {
//                             const holiday = visibleHolidays.find((h) => isSameDay(h.holidayDate, info.date));
//                             if (holiday) {
//                                 setSelectedHoliday(holiday);
//                                 setIsDetailsModalOpen(true);
//                             }
//                         }}
//                         eventClick={(info) => {
//                             const holiday = visibleHolidays.find((h) => h._id === info.event.id);
//                             if (holiday) {
//                                 setSelectedHoliday(holiday);
//                                 setIsDetailsModalOpen(true);
//                             }
//                         }}
//                         // Custom Event rendering to display holiday title inside cells nicely
//                         eventContent={(eventInfo) => {
//                             const type = eventInfo.event.extendedProps.type?.toLowerCase() || "";
//                             const isActive = eventInfo.event.extendedProps.isActive;
//                             let badgeStyles = "";
                            
//                             if (type.includes("government")) {
//                                 badgeStyles = "bg-rose-500/10 text-rose-700 border-rose-100";
//                             } else if (type.includes("festival")) {
//                                 badgeStyles = "bg-emerald-500/10 text-emerald-700 border-emerald-100";
//                             } else if (type.includes("office")) {
//                                 badgeStyles = "bg-indigo-500/10 text-indigo-700 border-indigo-100";
//                             } else {
//                                 badgeStyles = "bg-amber-500/10 text-amber-700 border-amber-100";
//                             }
//                             return (
//                                 <div className={`px-2 py-1 rounded-lg text-xs font-semibold border truncate transition-all hover:scale-[1.02] shadow-sm select-none flex items-center justify-between gap-1 ${badgeStyles}`}>
//                                     <span className="truncate">{eventInfo.event.title}</span>
//                                     {!isActive && (
//                                         <span className="text-[9px] px-1 bg-slate-200 text-slate-600 rounded">Draft</span>
//                                     )}
//                                 </div>
//                             );
//                         }}
//                     />
//                 </div>
//             </div>
//             {/* Premium Details Popup Modal */}
//             {isDetailsModalOpen && selectedHoliday && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
//                     <div 
//                         className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 scale-100"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         {/* Type indicator top bar */}
//                         <div className={`h-2.5 w-full ${
//                             selectedHoliday.type?.toLowerCase().includes("government")
//                                 ? "bg-rose-500"
//                                 : selectedHoliday.type?.toLowerCase().includes("festival")
//                                 ? "bg-emerald-500"
//                                 : selectedHoliday.type?.toLowerCase().includes("office")
//                                 ? "bg-indigo-500"
//                                 : "bg-amber-500"
//                         }`} />
                        
//                         {/* Close button */}
//                         <button 
//                             onClick={() => setIsDetailsModalOpen(false)}
//                             className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all"
//                             aria-label="Close modal"
//                         >
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                         <div className="p-8">
//                             <div className="flex items-center gap-2">
//                                 <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full border ${
//                                     selectedHoliday.type?.toLowerCase().includes("government")
//                                         ? "bg-rose-50 border-rose-100 text-rose-600"
//                                         : selectedHoliday.type?.toLowerCase().includes("festival")
//                                         ? "bg-emerald-50 border-emerald-100 text-emerald-600"
//                                         : selectedHoliday.type?.toLowerCase().includes("office")
//                                         ? "bg-indigo-50 border-indigo-100 text-indigo-600"
//                                         : "bg-amber-50 border-amber-100 text-amber-600"
//                                 }`}>
//                                     {selectedHoliday.type}
//                                 </span>
//                                 {selectedHoliday.isActive === false && (
//                                     <span className="inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full border bg-slate-50 border-slate-200 text-slate-500">
//                                         Inactive / Draft
//                                     </span>
//                                 )}
//                             </div>
//                             <h3 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
//                                 {selectedHoliday.title}
//                             </h3>
//                             <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-slate-500">
//                                 <div className="flex items-center gap-2.5">
//                                     <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     <span>
//                                         {new Date(selectedHoliday.holidayDate).toLocaleDateString("en-IN", {
//                                             weekday: "long",
//                                             day: "numeric",
//                                             month: "long",
//                                             year: "numeric",
//                                         })}
//                                     </span>
//                                 </div>
                                
//                                 {selectedHoliday.source && (
//                                     <div className="flex items-center gap-2.5 text-xs text-slate-400">
//                                         <span>Source:</span>
//                                         <span className="font-bold uppercase tracking-wider">{selectedHoliday.source}</span>
//                                     </div>
//                                 )}
//                             </div>
//                             {selectedHoliday.description && (
//                                 <div className="mt-6 pt-6 border-t border-slate-100">
//                                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
//                                     <p className="text-sm text-slate-600 leading-relaxed font-medium">
//                                         {selectedHoliday.description}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                         {/* Footer button */}
//                         <div className="bg-slate-50 px-8 py-5 flex justify-end">
//                             <button
//                                 onClick={() => setIsDetailsModalOpen(false)}
//                                 className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {/* Admin: Create Custom Holiday Popup Modal */}
//             {isAddModalOpen && isAdmin && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
//                     <div 
//                         className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 scale-100"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div className="h-2 w-full bg-indigo-600" />
                        
//                         {/* Close button */}
//                         <button 
//                             onClick={() => setIsAddModalOpen(false)}
//                             className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all"
//                             type="button"
//                         >
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                         <form onSubmit={handleFormSubmit} className="p-8">
//                             <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
//                                 Add Custom Holiday
//                             </h3>
//                             {formError && (
//                                 <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2">
//                                     <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                                     </svg>
//                                     <span>{formError}</span>
//                                 </div>
//                             )}
//                             <div className="space-y-5">
//                                 {/* Title */}
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Holiday Title *</label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleInputChange}
//                                         required
//                                         placeholder="e.g. Independence Day"
//                                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 placeholder-slate-400 transition-all"
//                                     />
//                                 </div>
//                                 {/* Date & Type Row */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {/* Date */}
//                                     <div>
//                                         <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Holiday Date *</label>
//                                         <input
//                                             type="date"
//                                             name="holidayDate"
//                                             value={formData.holidayDate}
//                                             onChange={handleInputChange}
//                                             required
//                                             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 transition-all"
//                                         />
//                                     </div>
//                                     {/* Type dropdown (Mongoose schema enum options) */}
//                                     <div>
//                                         <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Holiday Type *</label>
//                                         <select
//                                             name="type"
//                                             value={formData.type}
//                                             onChange={handleInputChange}
//                                             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white transition-all cursor-pointer"
//                                         >
//                                             <option value="government">Government/Public</option>
//                                             <option value="festival">Festival</option>
//                                             <option value="office">Office/Company Wide</option>
//                                             <option value="optional">Optional/Restricted</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 {/* Description */}
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
//                                     <textarea
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleInputChange}
//                                         placeholder="Brief details about the holiday..."
//                                         rows={3}
//                                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 placeholder-slate-400 transition-all resize-none"
//                                     />
//                                 </div>
//                                 {/* Predefined colors picker */}
//                                 <div>
//                                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Custom Color Code (Optional)</label>
//                                     <div className="flex items-center gap-3">
//                                         <input
//                                             type="color"
//                                             name="color"
//                                             value={formData.color}
//                                             onChange={handleInputChange}
//                                             className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
//                                         />
//                                         <span className="text-xs text-slate-400 font-medium">Select a custom color tag for the database</span>
//                                     </div>
//                                 </div>
//                                 {/* Is Active Toggle */}
//                                 <div className="flex items-center gap-3 py-2">
//                                     <input
//                                         type="checkbox"
//                                         name="isActive"
//                                         id="isActive"
//                                         checked={formData.isActive}
//                                         onChange={handleCheckboxChange}
//                                         className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
//                                     />
//                                     <label htmlFor="isActive" className="text-sm font-semibold text-slate-600 cursor-pointer select-none">
//                                         Make this holiday active immediately (Visible to employees)
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsAddModalOpen(false)}
//                                     className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={submitting}
//                                     className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
//                                 >
//                                     {submitting ? (
//                                         <>
//                                             <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             <span>Creating...</span>
//                                         </>
//                                     ) : (
//                                         <span>Create Holiday</span>
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
           
//         </div>
//     );
// }



"use client";
import { useEffect, useMemo, useState } from "react";
import api from "@/utils/axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
interface Holiday {
    _id: string;
    title: string;
    description: string;
    holidayDate: string;
    type: "government" | "festival" | "office" | "optional";
    color?: string;
    isActive?: boolean;
    source?: "API" | "ADMIN";
}
interface User {
    role: string;
    [key: string]: any;
}
interface HolidayPageProps {
    user?: User | null;
}
// Helper to format date strings specifically for HTML date inputs (YYYY-MM-DD)
const formatDateToInput = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
// Utility function to check if two dates match, preventing timezone shifts
const isSameDay = (holidayDateStr: string, calendarDate: Date): boolean => {
    if (!holidayDateStr) return false;
    
    const datePart = holidayDateStr.split("T")[0];
    const parts = datePart.split("-");
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
        const day = parseInt(parts[2], 10);
        
        return calendarDate.getFullYear() === year &&
               calendarDate.getMonth() === month &&
               calendarDate.getDate() === day;
    }
    
    const d1 = new Date(holidayDateStr);
    return d1.toDateString() === calendarDate.toDateString();
};
export default function HolidayPage({ user: propUser }: HolidayPageProps) {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
    
    // Modals visibility states
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Admin Edit & Delete States
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    // Create Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        holidayDate: "",
        type: "government" as Holiday["type"],
        color: "#6366f1",
        isActive: true,
        source: "ADMIN" as const
    });
    // Edit Form State
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        holidayDate: "",
        type: "government" as Holiday["type"],
        color: "#6366f1",
        isActive: true,
    });
    // Check actual role from server prop or client-side fetch on mount (relying purely on cookies)
    useEffect(() => {
        if (propUser) {
            setIsAdmin(propUser.role === "admin");
            return;
        }
        const fetchCurrentUser = async () => {
            try {
                const res = await api.get("/user/me");
                const userData = res.data?.user || res.data?.data?.user || res.data;
                if (userData && (userData.role === "admin" || userData.isAdmin)) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (err) {
                console.error("Client side failed to fetch user session from cookies:", err);
                setIsAdmin(false);
            }
        };
        fetchCurrentUser();
    }, [propUser]);
    // Fetch holidays helper
    const fetchHolidayData = async () => {
        try {
            const res = await api.get("/holidays");
            const fetchedHolidays = res.data.data || res.data;
            if (Array.isArray(fetchedHolidays)) {
                setHolidays(fetchedHolidays);
            }
        } catch (error) {
            console.error("Failed to fetch holidays:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchHolidayData();
    }, []);
    // Filter holidays for the display based on role & active state
    const visibleHolidays = useMemo(() => {
        if (isAdmin) return holidays;
        return holidays.filter(h => h.isActive !== false);
    }, [holidays, isAdmin]);
    // Format events for FullCalendar
    const events = useMemo(() => {
        return visibleHolidays.map((holiday) => ({
            id: holiday._id,
            title: holiday.title,
            start: holiday.holidayDate,
            allDay: true,
            extendedProps: {
                description: holiday.description,
                type: holiday.type,
                isActive: holiday.isActive !== false,
            },
        }));
    }, [visibleHolidays]);
    // Form inputs change handlers (Create)
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Form inputs change handlers (Edit)
    const handleEditInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Submit Custom Holiday (POST API)
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError("");
        try {
            const response = await api.post("/holidays", {
                ...formData,
                holidayDate: new Date(formData.holidayDate).toISOString(),
            });
            if (response.data.success) {
                await fetchHolidayData();
                setIsAddModalOpen(false);
                setFormData({
                    title: "",
                    description: "",
                    holidayDate: "",
                    type: "government",
                    color: "#6366f1",
                    isActive: true,
                    source: "ADMIN"
                });
            } else {
                setFormError(response.data.message || "Failed to create holiday");
            }
        } catch (error: any) {
            console.error("Create Holiday Error:", error);
            setFormError(error.response?.data?.message || error.message || "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };
    // Populate and open edit mode
    const handleStartEditing = () => {
        if (!selectedHoliday) return;
        setEditFormData({
            title: selectedHoliday.title,
            description: selectedHoliday.description || "",
            holidayDate: formatDateToInput(selectedHoliday.holidayDate),
            type: selectedHoliday.type,
            color: selectedHoliday.color || "#6366f1",
            isActive: selectedHoliday.isActive !== false,
        });
        setIsEditing(true);
    };
    // Submit Edited Holiday (PATCH API)
    const handleEditFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedHoliday) return;
        setSubmitting(true);
        setFormError("");
        try {
            const response = await api.patch(`/holidays/${selectedHoliday._id}`, {
                ...editFormData,
                holidayDate: new Date(editFormData.holidayDate).toISOString(),
            });
            if (response.data.success) {
                await fetchHolidayData();
                setIsEditing(false);
                setSelectedHoliday(response.data.data); // Update read-view details
            } else {
                setFormError(response.data.message || "Failed to update holiday");
            }
        } catch (error: any) {
            console.error("Edit Holiday Error:", error);
            setFormError(error.response?.data?.message || error.message || "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };
    // Handle Delete Holiday (DELETE API)
    const handleDeleteHoliday = async () => {
        if (!selectedHoliday) return;
        setDeleting(true);
        setFormError("");
        try {
            const response = await api.delete(`/holidays/${selectedHoliday._id}`);
            if (response.data.success) {
                await fetchHolidayData();
                setIsDeleteConfirmOpen(false);
                setIsDetailsModalOpen(false);
                setSelectedHoliday(null);
            } else {
                setFormError(response.data.message || "Failed to delete holiday");
            }
        } catch (error: any) {
            console.error("Delete Holiday Error:", error);
            setFormError(error.response?.data?.message || error.message || "An error occurred.");
        } finally {
            setDeleting(false);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-slate-500 font-medium">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading Holiday Calendar...</span>
                </div>
            </div>
        );
    }
    return (
        <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen">
            {/* Custom styled calendar styles injected directly into the document */}
           
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            Holiday Calendar
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium">
                            Official company holidays, corporate events, and government listings.
                        </p>
                    </div>
                    {/* Action Panel */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-wrap items-center gap-4.5 text-xs font-bold text-slate-600 bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Legend:</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                                <span>Government</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                <span>Festival</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                                <span>Office</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                <span>Optional</span>
                            </div>
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98]"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Holiday</span>
                            </button>
                        )}
                    </div>
                </div>
                {/* Calendar Layout */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100 p-6 md:p-8">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        height="auto"
                        events={events}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,listMonth",
                        }}
                        
                        dayCellDidMount={(info) => {
                            const holiday = visibleHolidays.find((h) => isSameDay(h.holidayDate, info.date));
                            if (holiday) {
                                const type = holiday.type?.toLowerCase() || "";
                                
                                if (type.includes("government")) {
                                    info.el.classList.add("government-holiday-cell");
                                } else if (type.includes("festival")) {
                                    info.el.classList.add("festival-holiday-cell");
                                } else if (type.includes("office")) {
                                    info.el.classList.add("office-holiday-cell");
                                } else {
                                    info.el.classList.add("optional-holiday-cell");
                                }
                                if (holiday.isActive === false) {
                                    info.el.classList.add("inactive-holiday-cell");
                                }
                                info.el.setAttribute("title", `${holiday.title} (${holiday.type}${holiday.isActive === false ? ' - Inactive' : ''})`);
                            }
                        }}
                        dateClick={(info) => {
                            const holiday = visibleHolidays.find((h) => isSameDay(h.holidayDate, info.date));
                            if (holiday) {
                                setSelectedHoliday(holiday);
                                setIsEditing(false);
                                setIsDetailsModalOpen(true);
                            }
                        }}
                        eventClick={(info) => {
                            const holiday = visibleHolidays.find((h) => h._id === info.event.id);
                            if (holiday) {
                                setSelectedHoliday(holiday);
                                setIsEditing(false);
                                setIsDetailsModalOpen(true);
                            }
                        }}
                        eventContent={(eventInfo) => {
                            const type = eventInfo.event.extendedProps.type?.toLowerCase() || "";
                            const isActive = eventInfo.event.extendedProps.isActive;
                            let badgeStyles = "";
                            
                            if (type.includes("government")) {
                                badgeStyles = "bg-rose-500/10 text-rose-700 border-rose-100";
                            } else if (type.includes("festival")) {
                                badgeStyles = "bg-emerald-500/10 text-emerald-700 border-emerald-100";
                            } else if (type.includes("office")) {
                                badgeStyles = "bg-indigo-500/10 text-indigo-700 border-indigo-100";
                            } else {
                                badgeStyles = "bg-amber-500/10 text-amber-700 border-amber-100";
                            }
                            return (
                                <div className={`px-2 py-1 rounded-lg text-xs font-semibold border truncate transition-all hover:scale-[1.02] shadow-sm select-none flex items-center justify-between gap-1 ${badgeStyles}`}>
                                    <span className="truncate">{eventInfo.event.title}</span>
                                    {!isActive && (
                                        <span className="text-[9px] px-1 bg-slate-200 text-slate-600 rounded">Draft</span>
                                    )}
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
            {/* Details & Edit Popup Modal */}
            {isDetailsModalOpen && selectedHoliday && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
                    <div 
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Type Indicator bar */}
                        <div className={`h-2.5 w-full ${
                            (isEditing ? editFormData.type : selectedHoliday.type)?.toLowerCase().includes("government")
                                ? "bg-rose-500"
                                : (isEditing ? editFormData.type : selectedHoliday.type)?.toLowerCase().includes("festival")
                                ? "bg-emerald-500"
                                : (isEditing ? editFormData.type : selectedHoliday.type)?.toLowerCase().includes("office")
                                ? "bg-indigo-500"
                                : "bg-amber-500"
                        }`} />
                        
                        {/* Close button */}
                        <button 
                            onClick={() => {
                                setIsDetailsModalOpen(false);
                                setIsEditing(false);
                            }}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* MODE 1: EDIT MODE */}
                        {isEditing && isAdmin ? (
                            <form onSubmit={handleEditFormSubmit} className="p-8">
                                <h3 className="text-xl font-extrabold text-slate-900 mb-6">
                                    Edit Holiday details
                                </h3>
                                {formError && (
                                    <div className="mb-4 p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
                                        {formError}
                                    </div>
                                )}
                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editFormData.title}
                                            onChange={handleEditInputChange}
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 font-medium text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                    {/* Date & Type */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date</label>
                                            <input
                                                type="date"
                                                name="holidayDate"
                                                value={editFormData.holidayDate}
                                                onChange={handleEditInputChange}
                                                required
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 font-medium text-slate-800 text-sm transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Type</label>
                                            <select
                                                name="type"
                                                value={editFormData.type}
                                                onChange={handleEditInputChange}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none font-medium text-slate-800 text-sm bg-white transition-all cursor-pointer"
                                            >
                                                <option value="government">Government/Public</option>
                                                <option value="festival">Festival</option>
                                                <option value="office">Office</option>
                                                <option value="optional">Optional</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                                        <textarea
                                            name="description"
                                            value={editFormData.description}
                                            onChange={handleEditInputChange}
                                            rows={2}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 font-medium text-slate-800 text-sm transition-all resize-none"
                                        />
                                    </div>
                                    {/* Predefined colors picker */}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            name="color"
                                            value={editFormData.color}
                                            onChange={handleEditInputChange}
                                            className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                                        />
                                        <span className="text-[10px] text-slate-400 font-medium">Customize database color tag</span>
                                    </div>
                                    {/* Is Active Toggle */}
                                    <div className="flex items-center gap-2.5 py-1">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            id="editIsActive"
                                            checked={editFormData.isActive}
                                            onChange={(e) => setEditFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 cursor-pointer"
                                        />
                                        <label htmlFor="editIsActive" className="text-xs font-semibold text-slate-600 cursor-pointer select-none">
                                            Make active (Visible to employees)
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                                    >
                                        Back to Details
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-lg transition-all active:scale-95"
                                    >
                                        {submitting ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* MODE 2: DETAILS READ MODE */
                            <div className="p-8">
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full border ${
                                        selectedHoliday.type?.toLowerCase().includes("government")
                                            ? "bg-rose-50 border-rose-100 text-rose-600"
                                            : selectedHoliday.type?.toLowerCase().includes("festival")
                                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                            : selectedHoliday.type?.toLowerCase().includes("office")
                                            ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                                            : "bg-amber-50 border-amber-100 text-amber-600"
                                    }`}>
                                        {selectedHoliday.type}
                                    </span>
                                    {selectedHoliday.isActive === false && (
                                        <span className="inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full border bg-slate-50 border-slate-200 text-slate-500">
                                            Inactive / Draft
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                    {selectedHoliday.title}
                                </h3>
                                <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-slate-500">
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>
                                            {new Date(selectedHoliday.holidayDate).toLocaleDateString("en-IN", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    
                                    {selectedHoliday.source && (
                                        <div className="flex items-center gap-2.5 text-xs text-slate-400">
                                            <span>Source:</span>
                                            <span className="font-bold uppercase tracking-wider">{selectedHoliday.source}</span>
                                        </div>
                                    )}
                                </div>
                                {selectedHoliday.description && (
                                    <div className="mt-6 pt-6 border-t border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                            {selectedHoliday.description}
                                        </p>
                                    </div>
                                )}
                                {/* Admin Action Toolbar inside Modal */}
                                {isAdmin && (
                                    <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                        <button
                                            onClick={() => setIsDeleteConfirmOpen(true)}
                                            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 transition-all active:scale-95"
                                        >
                                            Delete
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleStartEditing}
                                                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setIsDetailsModalOpen(false)}
                                                className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition-all active:scale-95"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Employee view footer */}
                                {!isAdmin && (
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                        <button
                                            onClick={() => setIsDetailsModalOpen(false)}
                                            className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Admin: Confirm Delete Sub-Modal */}
            {isDeleteConfirmOpen && selectedHoliday && isAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-all">
                    <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-slate-100">
                        <h4 className="text-lg font-extrabold text-slate-900 mb-2">Delete Holiday?</h4>
                        <p className="text-sm text-slate-500 mb-6">
                            Are you sure you want to permanently delete <strong className="text-slate-800 font-semibold">"{selectedHoliday.title}"</strong>? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end gap-2.5">
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteHoliday}
                                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 rounded-xl shadow-lg shadow-rose-100 transition-all active:scale-95"
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Confirm Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Admin: Create Custom Holiday Popup Modal */}
            {isAddModalOpen && isAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
                    <div 
                        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-2 w-full bg-indigo-600" />
                        
                        <button 
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all"
                            type="button"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form onSubmit={handleFormSubmit} className="p-8">
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
                                Add Custom Holiday
                            </h3>
                            {formError && (
                                <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>{formError}</span>
                                </div>
                            )}
                            <div className="space-y-5">
                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Holiday Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. Independence Day"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 placeholder-slate-400 transition-all"
                                    />
                                </div>
                                {/* Date & Type Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Date */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Holiday Date *</label>
                                        <input
                                            type="date"
                                            name="holidayDate"
                                            value={formData.holidayDate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 transition-all"
                                        />
                                    </div>
                                    {/* Type */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Holiday Type *</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white transition-all cursor-pointer"
                                        >
                                            <option value="government">Government/Public</option>
                                            <option value="festival">Festival</option>
                                            <option value="office">Office/Company Wide</option>
                                            <option value="optional">Optional/Restricted</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Brief details about the holiday..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 placeholder-slate-400 transition-all resize-none"
                                    />
                                </div>
                                {/* Custom color label */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Custom Color Code (Optional)</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleInputChange}
                                            className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                                        />
                                        <span className="text-xs text-slate-400 font-medium">Select a custom color tag for the database</span>
                                    </div>
                                </div>
                                {/* Is Active Toggle */}
                                <div className="flex items-center gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-semibold text-slate-600 cursor-pointer select-none">
                                        Make this holiday active immediately (Visible to employees)
                                    </label>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <span>Create Holiday</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
        </div>
    );
}
