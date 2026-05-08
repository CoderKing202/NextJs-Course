"use client"
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter()
    useEffect(()=>{
        if(!localStorage.getItem("token")){
          router.push("/")
        }
      },[])
  return (
    <div className='min-h-screen'>
      MyAccount
    </div>
  )
}

export default page
