import React from "react";
// import {useParams} from "next/navigation"
import styles from "@/styles/blogPost.module.css";

// Step1: Find the file corresponsing to the slug
// Step3 : Populate them inside the page
async function page({ params }) {
  console.log(params);
  const { slug } = await params;
  let data = await fetch(`http://localhost:3000/api/getBlog?slug=${slug}`);
  let blog = await data.json();

  console.log(slug);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog.slug}</h1>
        <hr />
        <div>{blog.content}</div>
      </main>
    </div>
  );
}

export default page;
