"use client"
import React from 'react'
import styles from "../app/home.module.css"
import Link from 'next/link'
const NavBar = () => {
  return (
    <div>
       <nav className={styles.mainnav}>
              <style jsx>
                {
                  `
                  .mySpan{
                  color:blue;
                  }
                  `
                  // it is not supported in app router
                }
              </style>
              <ul>
                <Link href="/"><li>Home</li></Link>
                <Link href="/about"><li>About</li></Link>
                <Link href="/blog"><li>Blog</li></Link>
                <Link href="/contact"><li>Contact</li></Link>
                <Link href="/#hello" scroll={false}><li>Hello</li></Link>
              </ul>
            </nav>
    </div>
  )
}

export default NavBar
