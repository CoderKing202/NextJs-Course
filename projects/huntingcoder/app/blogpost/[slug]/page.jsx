"use client"
import React, { useEffect,useState } from 'react'
import {useParams} from "next/navigation"
import styles from "@/styles/blogPost.module.css"

// Step1: Find the file corresponsing to the slug 
// Step3 : Populate them inside the page
function page() {
    const [blog,setBlog] = useState({})
    useEffect(()=>{
         fetch(`http://localhost:3000/api/getBlog?slug=${slug}`)
      .then((a) => {
        return a.json();
      })
      .then((parsed) => {
        
        setBlog(parsed);
      });
    },[])
    const {slug} = useParams()
    console.log(slug)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>
         {blog.slug}</h1>
        <hr />
        <div>{blog.content}</div>
      </main>
    </div>
  )
}

export default page