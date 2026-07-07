"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";


export default function RegisterPage() {

  const router = useRouter();


  const [formData, setFormData] = useState({

    employeeId:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    department:"",
    password:"",
    designation:"",
    joiningDate:"",
    manager:"",
    salary:"",
    gender:"",
    dob:"",
    address:"",
    role:"employee",
    status:"active",
    remainingLeaves:""

  });


  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  )=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };




  const handleRegister = async(
    e:React.FormEvent
  )=>{

    e.preventDefault();


    try{

      setError("");
      setSuccess("");


      const res = await api.post(
        "/auth/register",
        {
          ...formData,
          salary:Number(formData.salary),
          remainingLeaves:Number(formData.remainingLeaves)
        }
      );


      console.log(res.data);


      setSuccess(
        "Registration successful"
      );


      setTimeout(()=>{

        router.push("/login");

      },1500);



    }
    catch(error:any){

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }


  };



return (

<div>

<h1>
Employee Registration
</h1>


{
error &&
<p style={{color:"red"}}>
{error}
</p>
}


{
success &&
<p style={{color:"green"}}>
{success}
</p>
}



<form onSubmit={handleRegister}>


<input
name="employeeId"
placeholder="Employee ID"
onChange={handleChange}
/>


<input
name="firstName"
placeholder="First Name"
onChange={handleChange}
/>



<input
name="lastName"
placeholder="Last Name"
onChange={handleChange}
/>



<input
name="email"
type="email"
placeholder="Email"
onChange={handleChange}
/>



<input
name="phone"
placeholder="Phone"
onChange={handleChange}
/>



<input
name="department"
placeholder="Department"
onChange={handleChange}
/>



<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
/>



<input
name="designation"
placeholder="Designation"
onChange={handleChange}
/>



<label>
Joining Date
</label>

<input
name="joiningDate"
type="date"
onChange={handleChange}
/>



<input
name="manager"
placeholder="Manager Name"
onChange={handleChange}
/>



<input
name="salary"
type="number"
placeholder="Salary"
onChange={handleChange}
/>



<select
name="gender"
onChange={handleChange}
>

<option value="">
Select Gender
</option>

<option value="Male">
Male
</option>

<option value="Female">
Female
</option>

</select>



<label>
Date of Birth
</label>

<input
name="dob"
type="date"
onChange={handleChange}
/>



<input
name="address"
placeholder="Address"
onChange={handleChange}
/>



<select
name="role"
value={formData.role}
onChange={handleChange}
>

<option value="employee">
Employee
</option>


<option value="admin">
Admin
</option>

</select>



<input
name="remainingLeaves"
type="number"
placeholder="Remaining Leaves"
onChange={handleChange}
/>



<select
name="status"
value={formData.status}
onChange={handleChange}
>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>


</select>



<button type="submit">
Register
</button>


</form>


</div>

);

}