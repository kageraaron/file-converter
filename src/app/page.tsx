import Link from 'next/link';

const CONVERSION_CATEGORIES = [
  {
    name: 'Images',
    description: 'Convert between popular image formats locally.',
    conversions: [
      { from: 'HEIC', to: 'JPG' },
      { from: 'HEIC', to: 'PNG' },
      { from: 'WebP', to: 'PNG' },
      { from: 'WebP', to: 'JPG' },
      { from: 'PNG', to: 'JPG' },
      { from: 'JPG', to: 'PNG' },
      { from: 'SVG', to: 'PNG' },
      { from: 'TIFF', to: 'PNG' },
    ]
  },
  {
    name: 'Video & Audio',
    description: 'Extract audio or change video formats in your browser.',
    conversions: [
      { from: 'MP4', to: 'MP3' },
      { from: 'WAV', to: 'MP3' },
      { from: 'MOV', to: 'MP4' },
      { from: 'WEBM', to: 'MP4' },
      { from: 'MP4', to: 'GIF' },
    ]
  },
  {
    name: 'Documents',
    description: 'Securely handle your documents with local processing.',
    conversions: [
      { from: 'PDF', to: 'JPG' },
      { from: 'PDF', to: 'PNG' },
      { from: 'JPG', to: 'PDF' },
      { from: 'PNG', to: 'PDF' },
    ]
  }
];

export default function Home() {
  return (
    <div className="container">
      <main className="main">
        <div className="ad-container ad-banner">
          ADVERTISEMENT - TOP LEADERBOARD (970x90)
        </div>
        
        <section style={{ textAlign: 'center', margin: '4rem 0 6rem' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Privacy-First <span style={{ color: 'var(--primary)' }}>File Conversion.</span>
          </h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            The world's fastest local-only converter. No uploads, no server-side processing, 
            and 100% privacy. Your files never leave your device.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ padding: '0.8rem 1.5rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem' }}>
              ✓ No File Size Limits
            </div>
            <div style={{ padding: '0.8rem 1.5rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem' }}>
              ✓ 100% Free
            </div>
            <div style={{ padding: '0.8rem 1.5rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem' }}>
              ✓ Offline Ready
            </div>
          </div>
        </section>

        {CONVERSION_CATEGORIES.map((category) => (
          <section key={category.name} style={{ width: '100%', marginBottom: '5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{category.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{category.description}</p>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {category.conversions.map((conv) => (
                <Link 
                  key={`${conv.from}-${conv.to}`}
                  href={`/convert/${conv.from.toLowerCase()}-to-${conv.to.toLowerCase()}`}
                  style={{
                    padding: '2rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    background: 'var(--secondary)',
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  className="card-hover"
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>
                    Convert
                  </span>
                  <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                    {conv.from} to {conv.to}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="ad-container ad-banner" style={{ margin: '4rem 0' }}>
          ADVERTISEMENT - LARGE DISCOVERY (970x250)
        </div>
        
        <section style={{ 
          marginTop: '4rem', 
          width: '100%', 
          padding: '5rem', 
          background: 'var(--secondary)', 
          borderRadius: 'var(--radius)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Why choose PrivaConvert?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Privacy by Design</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Most "online" converters upload your files to a cloud server. We use WebAssembly (WASM) 
                to run the conversion engine directly in your browser. Your data stays on your machine.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🚀</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Instant Results</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                By removing the upload/download step, we save you time and bandwidth. 
                Large video or high-res image conversions start immediately.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💎</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>No Limits</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Because you are using your own computer's power, we don't need to cap your 
                file size or usage. Convert 1GB videos just as easily as small icons.
              </p>
            </div>
          </div>
        </section>

        <footer style={{ 
          marginTop: '8rem', 
          padding: '4rem 0', 
          borderTop: '1px solid var(--border)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>
            Priva<span style={{ color: 'var(--primary)' }}>Convert</span>
          </div>
          <div style={{ display: 'flex', gap: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Link href="/">Home</Link>
            <Link href="/convert/heic-to-jpg">HEIC to JPG</Link>
            <Link href="/convert/pdf-to-png">PDF to PNG</Link>
            <Link href="/convert/mp4-to-mp3">MP4 to MP3</Link>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            &copy; 2026 PrivaConvert. All files are processed locally. No data is stored or transmitted.
          </p>
        </footer>
      </main>
    </div>
  );
}
