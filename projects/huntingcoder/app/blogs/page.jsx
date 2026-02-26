
import React from "react";
import styles from "@/styles/blog.module.css";
import Link from "next/link";
// import { useState,useEffect } from "react";
// import { promises as fs } from "fs";
// import InfiniteScroll from "react-infinite-scroll-component";
import Blogs from "../../components/Blogs";

// Step 1: Collect all the files from blogData directory
// Step 2: Iterate through Displays them
function page() {
 


  // let data = await fs.readdir(`blogData`, "utf-8");

  // let blogs = [];

  // for (const item of data) {
  //   let file = await fs.readFile("blogData/" + item, "utf-8");
  //   blogs.push(JSON.parse(file));
  // }
  
  
  return (
    <>
    <h1>Hello</h1>
    <Blogs/>
    </>
  );
}

export default page;
