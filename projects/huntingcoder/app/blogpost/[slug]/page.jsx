import React from "react";
// import {useParams} from "next/navigation"
import styles from "@/styles/blogPost.module.css";
import { promises as fs } from "fs";

// Step1: Find the file corresponsing to the slug
// Step3 : Populate them inside the page
async function page({ params }) {
  const { slug } = await params;
  function createMarkup(c) {
    return { __html: c };
  }

  let blog;
  try {
    const data = await fs.readFile(`blogData/${slug}.json`, "utf-8");
    blog = await JSON.parse(data);
  } catch (ex) {

  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.slug}</h1>
        <hr />
        <div>
          {blog && (
            <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  let myBlogs = await fs.promises.readdir("blogdata")
  console.log(myBlogs)
  myBlogs = myBlogs.map((item)=>{
    return { slug: item.split(".")[0]}
  })
  return myBlogs;
}

export default page;
