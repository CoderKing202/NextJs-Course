"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/blog.module.css";
import Link from "next/link";

// Step 1: Collect all the files from blogData directory
// Step 2: Iterate through Displays them
function page() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    console.log("useEffect is running");
    fetch(`http://localhost:3000/api/blogs`)
      .then((a) => {
        return a.json();
      })
      .then((parsed) => {
        console.log(parsed);
        setBlogs(parsed);
      });
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.siteTitle}>Latest Blogs</h2>
        {blogs.map((blogItem)=>{
          return <div className ="blogItem" key={blogItem.slug}>
        
        <Link href={`blogpost/${blogItem.slug}`}>
          <h3>{blogItem.title}</h3>
        </Link>
        <p className={styles.blogItemp}>{blogItem.content.substr(0,100)}</p>
        
          </div>
        })}
        
      </main>
    </div>
  );
}

export default page;
