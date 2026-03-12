"use client"
import React from 'react'
import {useParams} from "next/navigation"
const page = () => {
    const params = useParams()
  return (
    <div>
        Slug is {params.slug}        
    </div>
  ) 
}

export default page
