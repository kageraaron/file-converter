import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrivaConvert — Local-First File Converter',
  description:
    'Convert images, video, audio and documents directly in your browser. Files never leave your device. No uploads, no limits, free forever.',
  openGraph: {
    title: 'PrivaConvert — Local-First File Converter',
    description:
      'Convert images, video, audio and documents directly in your browser. Files never leave your device.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container site-header__inner">
            <Link href="/" className="brand" aria-label="PrivaConvert home">
              <span className="brand__mark">PC</span>
              <span>
                Priva<span style={{ color: 'var(--primary)' }}>Convert</span>
              </span>
            </Link>
            <nav className="nav-links" aria-label="Primary">
              <Link href="/#tools">All tools</Link>
              <Link href="/#why">Why local</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/" className="nav-cta btn btn--primary" style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}>
                Start converting
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="container">
            <div className="site-footer__row">
              <div style={{ maxWidth: 320 }}>
                <div className="brand" style={{ marginBottom: '0.75rem' }}>
                  <span className="brand__mark">PC</span>
                  <span>
                    Priva<span style={{ color: 'var(--primary)' }}>Convert</span>
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Files are converted on your own device using WebAssembly. Nothing is uploaded, stored, or shared.
                </p>
              </div>

              <div className="site-footer__links">
                <div className="site-footer__col">
                  <h4>Images</h4>
                  <Link href="/convert/heic-to-jpg">HEIC → JPG</Link>
                  <Link href="/convert/heic-to-png">HEIC → PNG</Link>
                  <Link href="/convert/webp-to-png">WebP → PNG</Link>
                  <Link href="/convert/png-to-jpg">PNG → JPG</Link>
                </div>
                <div className="site-footer__col">
                  <h4>Documents</h4>
                  <Link href="/convert/pdf-to-png">PDF → PNG</Link>
                  <Link href="/convert/pdf-to-jpg">PDF → JPG</Link>
                  <Link href="/convert/jpg-to-pdf">JPG → PDF</Link>
                  <Link href="/convert/png-to-pdf">PNG → PDF</Link>
                </div>
                <div className="site-footer__col">
                  <h4>Media</h4>
                  <Link href="/convert/mp4-to-mp3">MP4 → MP3</Link>
                  <Link href="/convert/mov-to-mp4">MOV → MP4</Link>
                  <Link href="/convert/webm-to-mp4">WebM → MP4</Link>
                  <Link href="/convert/mp4-to-gif">MP4 → GIF</Link>
                </div>
              </div>
            </div>

            <div className="site-footer__legal">
              <span>&copy; {new Date().getFullYear()} PrivaConvert. All processing happens locally.</span>
              <span>
                <Link href="/">Privacy</Link> &nbsp;·&nbsp; <Link href="/">Terms</Link>
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
