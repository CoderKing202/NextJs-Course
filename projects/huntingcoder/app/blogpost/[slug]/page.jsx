"use client"
import React from 'react'
import {useParams} from "next/navigation"

function page() {
    const {slug} = useParams()
    
  return (
    <div>{slug}</div>
  )
}

export default page