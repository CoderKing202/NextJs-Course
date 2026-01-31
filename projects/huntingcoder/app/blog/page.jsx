import React from 'react'
import styles from "@/styles/blog.module.css"
import Link from "next/link"

// Step 1: Collect all the files from blogData directory 
// Step 2: It Displays 
function page() {
  return (
     <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.siteTitle}>Latest Blogs</h2>
        <Link href="blogpost/learn-javascript">
          <h3 >How to learn Javascript in 2026?</h3></Link>
          <p>Javascript is the language used to design logic for the web</p>
        
        <div className="blogItem">
          <h3>How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web</p>
        </div>
        <div className="blogItem">
          <h3>How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web</p>
        </div>
     
     </main>
      </div>

  )
}

export default page