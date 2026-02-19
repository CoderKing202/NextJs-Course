"use client"
import Heads from 'next/head';
import Script from 'next/script';
import styles from "./home.module.css"
import Link from 'next/link';
import styles1 from "./home1.module.css"
import Image from 'next/image';

export default function Home() {
  console.log(styles)
  return (
    <>
      
        <meta name="description" content="A blog for hunting coders by a hunting coder" />
        <link rel="icon" href="/favicon.ico" />
        {/* <Script src="/sc.js" strategy='lazyOnload'>
        </Script> */}
     
      <main style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        lineHeight: 1.4
      }}>
        <h1 className='mySpan'>
          Hunting Coder
        </h1>
         <img alt="" className={styles.myImg} src={"/coder.avif"} width={237} height={158}/>
        <p style={{
          color: '#666',
          fontSize: '1.2rem',
          margin: '0 0 3rem 0',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          A blog for hunting coders by a hunting coder
        </p>
       
      {/* <div className={`${styles.col} ${styles1.col}`}> */}
      <div>
        <h2 className={styles.siteTitle}>Latest Blogs</h2>
        <div className="blogItem">
          <h3 >How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web</p>
        </div>
        <div className="blogItem">
          <h3>How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web</p>
        </div>
        <div className="blogItem">
          <h3>How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web</p>
        </div>
     
     
      </div>
      </main>
    </>
  );
}

const cardStyle = {
  border: '1px solid #eaeaea',
  borderRadius: '10px',
  padding: '1.75rem',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer'
};

const h2Style = {
  margin: '0 0 0.75rem 0',
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#000'
};

const pStyle = {
  margin: 0,
  color: '#666',
  fontSize: '1rem',
  lineHeight: 1.5
};
