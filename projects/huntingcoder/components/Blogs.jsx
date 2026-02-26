"use client"
import React from 'react'

import styles from "@/styles/blog.module.css";
import Link from "next/link";
import { useState,useEffect } from "react";
// import { promises as fs } from "fs";
import InfiniteScroll from "react-infinite-scroll-component";
function Blogs() {
    
 const [blogs, setBlogs] = useState([]);
  const [count,setCount] = useState(2)
  const [blogLength, setBlogLength] = useState(0)
  useEffect(() => {
    console.log("useEffect is running");
    fetch(`http://localhost:3000/api/blogs`)
      .then((a) => {
        return a.json();
      })
      .then((parsed) => {
        console.log(parsed);
        setBlogs(parsed.allBlogs);
      });
  }, []);

  // let data = await fs.readdir(`blogData`, "utf-8");

  // let blogs = [];

  // for (const item of data) {
  //   let file = await fs.readFile("blogData/" + item, "utf-8");
  //   blogs.push(JSON.parse(file));
  // }
  const fetchData = ()=>{
fetch(`http://localhost:3000/api/blogs?count=${count+2}`)
      .then((a) => {
        return a.json();
      })
      .then((parsed) => 
        {
          setCount(count+2)
        console.log(parsed);
        setBlogs(parsed.allBlogs);
        setBlogLength(parsed.length)
      });
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
       
        <h2 className={styles.siteTitle}>Latest Blogs</h2>
       <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={blogs.length !== blogLength}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          
        >
          {blogs.map((blogItem) => {
          return (
            <div className="blogItem" key={blogItem.slug}>
              <h3>{blogItem.title}</h3>

              <p className={styles.blogItemp}>
                {blogItem.metadesc.substr(0, 100)}
              </p>
              <Link href={`/blogpost/${blogItem.slug}`}>
                <button className={styles.btn}>Read More</button>
              </Link>
            </div>
          );
        })} 
        </InfiniteScroll>
      </main>
    </div>
  );
}

export default Blogs