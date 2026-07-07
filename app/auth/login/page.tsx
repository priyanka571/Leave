"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();


  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");



  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setError("");

      const res = await api.post(
        "/auth/login",
        {
          firstName,
          password
        }
      );


      console.log(res.data);


      // login successful
      router.push("/dashboard");


    } catch (error:any) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };



  return (

    <div>

      <h1>
        Login
      </h1>


      {
        error &&
        <p>
          {error}
        </p>
      }



      <form onSubmit={handleLogin}>


        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
        />



        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />



        <button type="submit">
          Login
        </button>


      </form>


    </div>

  );
}