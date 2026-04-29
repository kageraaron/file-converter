import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Local File Converter | Privacy-First & Fast',
  description: 'Convert your files locally in your browser. No uploads, total privacy, and high performance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              FileConverter
            </a>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
              <a href="/tools">Tools</a>
              <a href="/pricing">Premium</a>
              <a href="/about">About</a>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <p>&copy; {new Date().getFullYear()} FileConverter. All files processed locally.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
