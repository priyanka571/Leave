"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  ShieldCheck
} from "lucide-react";


interface Employee {

  employeeId:string;
  firstName:string;
  lastName:string;
  phone:string;
  department:string;
  designation:string;
  joiningDate:string;
  manager:string;
  salary:number;
  gender:string;
  dob:string;
  address:string;
  profileImage:string;
  role:string;
  status:string;
  remainingLeaves:number;
  email:string;

}



export default function EmployeeProfilePage(){


  const params = useParams();

  const id = params.id as string;


  const [employee,setEmployee] = useState<Employee | null>(null);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");




  useEffect(()=>{


    const getEmployee = async()=>{

      try{

        const res = await api.get(`/employee/${id}`);

        setEmployee(res.data.employee);


      }
      catch(error:any){

        setError(
          error.response?.data?.message ||
          "Unable to fetch profile"
        );

      }
      finally{

        setLoading(false);

      }

    };


    getEmployee();


  },[id]);





  if(loading){

    return(
      <div className="flex justify-center p-10">
        Loading profile...
      </div>
    )

  }





  if(error){

    return(
      <p className="p-10 text-red-500">
        {error}
      </p>
    )

  }





  return (

    <div className="p-8 bg-gray-50 min-h-screen">


      <div className="bg-white rounded-2xl shadow-sm border p-8">


        {/* Profile Header */}

        <div className="flex items-center gap-6 border-b pb-6">


          {
            employee?.profileImage ?

            <img
              src={employee.profileImage}
              className="w-24 h-24 rounded-full object-cover"
            />

            :

            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">

              {employee?.firstName.charAt(0)}

            </div>

          }




          <div>

            <h1 className="text-3xl font-bold text-gray-900">

              {employee?.firstName} {employee?.lastName}

            </h1>


            <p className="text-gray-500 mt-1">

              {employee?.designation}

            </p>


            <span className="inline-block mt-3 rounded-full bg-green-100 px-4 py-1 text-sm text-green-700">

              {employee?.status}

            </span>


          </div>


        </div>





        {/* Personal Information */}

        <section className="mt-8">


          <h2 className="text-xl font-semibold mb-5">
            Personal Information
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <Info
              icon={<User/>}
              title="Employee ID"
              value={employee?.employeeId}
            />


            <Info
              icon={<Mail/>}
              title="Email"
              value={employee?.email}
            />


            <Info
              icon={<Phone/>}
              title="Phone"
              value={employee?.phone}
            />


            <Info
              icon={<UserRound/>}
              title="Gender"
              value={employee?.gender}
            />


            <Info
              icon={<CalendarDays/>}
              title="Date of Birth"
              value={
                employee?.dob
                ? new Date(employee.dob).toLocaleDateString()
                : "-"
              }
            />


            <Info
              icon={<MapPin/>}
              title="Address"
              value={employee?.address}
            />


          </div>


        </section>






        {/* Job Information */}


        <section className="mt-10">


          <h2 className="text-xl font-semibold mb-5">
            Job Information
          </h2>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <Info
              icon={<Building2/>}
              title="Department"
              value={employee?.department}
            />


            <Info
              icon={<Briefcase/>}
              title="Designation"
              value={employee?.designation}
            />


            <Info
              icon={<CalendarDays/>}
              title="Joining Date"
              value={
                employee?.joiningDate
                ? new Date(employee.joiningDate)
                .toLocaleDateString()
                : "-"
              }
            />


            <Info
              icon={<User/>}
              title="Manager"
              value={employee?.manager}
            />



            <Info
              icon={<IndianRupee/>}
              title="Salary"
              value={`₹ ${employee?.salary}`}
            />



            <Info
              icon={<ShieldCheck/>}
              title="Role"
              value={employee?.role}
            />


          </div>


        </section>







        {/* Leave Information */}

        <section className="mt-10">


          <h2 className="text-xl font-semibold mb-5">
            Leave Information
          </h2>


          <Info
            icon={<CalendarDays/>}
            title="Remaining Leaves"
            value={`${employee?.remainingLeaves} Days`}
          />


        </section>



      </div>


    </div>

  );

}





function Info(
{
 icon,
 title,
 value
}:{
 icon:any;
 title:string;
 value:any;
}

){

return(

<div className="flex gap-4 items-start rounded-xl bg-gray-50 p-5">


<div className="text-indigo-600">
 {icon}
</div>


<div>

<p className="text-sm text-gray-500">
 {title}
</p>


<p className="font-medium text-gray-900 mt-1">
 {value || "-"}
</p>


</div>


</div>

)

}