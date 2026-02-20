import React from "react";
// import {useParams} from "next/navigation"
import styles from "@/styles/blogPost.module.css";
import {promises as fs} from "fs"

// Step1: Find the file corresponsing to the slug
// Step3 : Populate them inside the page
async function page({ params }) {
  console.log(params);
  const { slug } = await params;
  function createMarkup(c){
    return{__html:c}
  }
  console.log(slug);
  let blog
   try{
  const data = await fs.readFile(`blogData/${slug}.json`,"utf-8")
  blog = JSON.parse(data)
  console.log(blog)
    }
    catch(ex){
        console.log(ex)
    }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.slug}</h1>
        <hr />
        <div>{blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}</div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug:"how-to-learn-flask"},
    { slug:"how-to-learn-javascript"},
    { slug:"how-to-learn-nextjs"}

  ];
}

export default page;
