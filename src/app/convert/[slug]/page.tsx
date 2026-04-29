import { Metadata } from 'next';
import Converter from '@/components/Converter/Converter';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split('-to-');
  if (parts.length !== 2) return { title: 'File Converter' };
  
  const [from, to] = parts;
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  const title = `Free ${fromUpper} to ${toUpper} Converter - 100% Private & Local`;
  const description = `Convert ${fromUpper} to ${toUpper} instantly in your browser. No file uploads, no limits, and total privacy. Fast, secure, and free online file conversion.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate static params for the most common conversions to boost SEO
export async function generateStaticParams() {
  const commonConversions = [
    'heic-to-jpg',
    'heic-to-png',
    'pdf-to-jpg',
    'pdf-to-png',
    'jpg-to-pdf',
    'png-to-pdf',
    'mp4-to-mp3',
    'mov-to-mp4',
  ];
  return commonConversions.map((slug) => ({ slug }));
}

export default async function ConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const parts = slug.split('-to-');
  
  if (parts.length !== 2) {
    return (
      <main className="main container">
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>Invalid Conversion Type</h1>
          <p>Please return to the home page and select a valid format.</p>
        </div>
      </main>
    );
  }

  const [from, to] = parts;
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  // Schema.org HowTo and FAQ data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to convert ${fromUpper} to ${toUpper} locally`,
    "description": `Step-by-step guide to convert your ${fromUpper} files to ${toUpper} format using your browser's local processing power.`,
    "step": [
      {
        "@type": "HowToStep",
        "text": `Select or drag and drop your ${fromUpper} file into the converter area.`,
        "name": "Upload File"
      },
      {
        "@type": "HowToStep",
        "text": `Click the 'Convert to ${toUpper}' button. The processing happens entirely on your device.`,
        "name": "Process Locally"
      },
      {
        "@type": "HowToStep",
        "text": `Once finished, click the 'Download' button to save your new ${toUpper} file.`,
        "name": "Download Result"
      }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is it safe to convert ${fromUpper} to ${toUpper} online?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our tool is 100% safe because it works locally. Unlike other converters, your files never leave your computer or get uploaded to any server.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the file size limit for ${fromUpper} to ${toUpper} conversion?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Since the conversion happens on your own device, there are no artificial file size limits. It only depends on your browser's memory and CPU.`
        }
      }
    ]
  };

  return (
    <main className="main container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="ad-container ad-banner" style={{ margin: '1rem 0' }}>
        {/* AdSense/Ezoic Placeholder */}
        <div style={{ height: '90px', background: '#f0f0f0', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          ADVERTISEMENT - TOP BANNER (970x90 or 728x90)
        </div>
      </div>

      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 800 }}>
          {fromUpper} to {toUpper} <span style={{ color: 'var(--primary)' }}>Converter</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.5' }}>
          Fast, free, and 100% private. Your {fromUpper} files are processed locally in your browser and never touch our servers.
        </p>
      </section>

      <div style={{ display: 'flex', gap: '2.5rem', width: '100%', alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Converter from={fromUpper} to={toUpper} />
          
          <div className="content-block" style={{ marginTop: '4rem', width: '100%' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Why use our {fromUpper} to {toUpper} converter?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🔒 Total Privacy</h3>
                <p style={{ color: 'var(--text-muted)' }}>We use WebAssembly technology to process files on your device. Your data stays with you.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>⚡ Blazing Fast</h3>
                <p style={{ color: 'var(--text-muted)' }}>Skip the upload and download queues. Local processing is often faster than remote servers.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>💰 100% Free</h3>
                <p style={{ color: 'var(--text-muted)' }}>No subscriptions, no "pro" limits, and no hidden fees for large files.</p>
              </div>
            </div>
          </div>
        </div>
        
        <aside style={{ flex: '1 1 300px', position: 'sticky', top: '2rem' }}>
          <div className="ad-container ad-rectangle" style={{ marginBottom: '2rem' }}>
            <div style={{ height: '250px', background: '#f0f0f0', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', textAlign: 'center', padding: '1rem' }}>
              ADVERTISEMENT<br/>SIDEBAR RECTANGLE<br/>(300x250 or 300x600)
            </div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            background: 'var(--secondary)',
          }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Steps</h4>
            <ol style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <li style={{ marginBottom: '0.8rem' }}><strong>Select:</strong> Choose your {fromUpper} file.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Convert:</strong> Hit the button to process locally.</li>
              <li><strong>Save:</strong> Download your {toUpper} instantly.</li>
            </ol>
          </div>
        </aside>
      </div>

      <div className="ad-container ad-banner" style={{ margin: '4rem 0' }}>
        <div style={{ height: '250px', background: '#f0f0f0', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          ADVERTISEMENT - MID-CONTENT BOARD (728x250)
        </div>
      </div>

      <section className="faq-section" style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Is this {fromUpper} to {toUpper} converter safe for sensitive documents?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Absolutely. Because the conversion is done via WebWorkers in your own browser, the file content is never transmitted over the internet to our servers. It's as safe as offline software.</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Do I need to install anything?</h3>
            <p style={{ color: 'var(--text-muted)' }}>No. Everything runs in your browser using modern web standards like WASM and Web Workers. No plugins or software downloads required.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
