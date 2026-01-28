"use client"
import React from 'react'
import {useParams} from "next/navigation"
import styles from "@/styles/blogPost.module.css"

function page() {
    const {slug} = useParams()
    
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>
        Title of the page {slug}</h1>
        <hr />
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed tempora et accusantium repellat deserunt numquam nisi, rem optio vero beatae sint similique nulla ex culpa excepturi iste eum amet magni consequuntur? Aspernatur quia autem delectus corrupti quasi molestiae, illo accusamus placeat aliquam mollitia distinctio reprehenderit consequatur cumque et nam. Voluptatum eveniet excepturi non at sapiente quia quaerat laborum harum recusandae. Dolore tenetur blanditiis fuga. Assumenda culpa, sunt, facere quam corporis sed nesciunt animi soluta molestiae dolorem deserunt dolorum maxime incidunt, magni unde delectus. Numquam itaque quaerat iure necessitatibus est totam rem sapiente at! Harum exercitationem perferendis quis, eveniet asperiores consectetur?</div>
      </main>
    </div>
  )
}

export default page