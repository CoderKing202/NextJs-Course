import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hunting Coder</title>
        <meta name="description" content="A blog for hunting coders by a hunting coder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 700,
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.05em'
        }}>
          Hunting Coder
        </h1>
        
        <p style={{
          color: '#666',
          fontSize: '1.2rem',
          margin: '0 0 3rem 0',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          A blog for hunting coders by a hunting coder
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          width: '100%',
          maxWidth: '800px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          <a href="/docs" style={cardStyle}>
            <h2 style={h2Style}>Documentation →</h2>
            <p style={pStyle}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>
          
          <a href="/learn" style={cardStyle}>
            <h2 style={h2Style}>Learn →</h2>
            <p style={pStyle}>
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>
          
          <a href="/examples" style={cardStyle}>
            <h2 style={h2Style}>Examples →</h2>
            <p style={pStyle}>
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>
          
          <a href="/deploy" style={cardStyle}>
            <h2 style={h2Style}>Deploy →</h2>
            <p style={pStyle}>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
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
