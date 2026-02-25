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
                 <img alt="" className={styles.myImg} src={"/coder.avif"} width={237} height={158}/>
        <h1 className={styles.mySpan}>
          &lt;HuntingCoder/&gt;
        </h1>

       
       
      {/* <div className={`${styles.col} ${styles1.col}`}> */}
      <div>
        <h2 className={styles.h2}>Latest Blogs</h2>
        <div >
          <h3 className={styles.h3} >How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet ex inventore quisquam natus! Consequatur, doloremque maxime repudiandae officia veritatis est? Ipsa officia libero consequuntur fugiat magni.</p>
          <button className={styles.btn}>Read More</button>
        </div>
        <div >
          <h3 className={styles.h3}>How to learn Javascript in 2026?</h3>
          <p className={styles.p}>Javascript is the language used to design logic for the web</p>
          <button className={styles.btn}>Read More</button>
        </div>
        <div >
          <h3 className={styles.h3}>How to learn Javascript in 2026?</h3>
          <p>Javascript is the language used to design logic for the web</p>
          <button className={styles.btn}>Read More</button>
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
