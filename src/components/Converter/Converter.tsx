'use client';

import React, { useState, useCallback } from 'react';

interface ConverterProps {
  from: string;
  to: string;
}

export default function Converter({ from, to }: ConverterProps) {
  const [results, setResults] = useState<{ blob: Blob; url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults([]);
      setError(null);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResults([]);
      setError(null);
      setProgress(0);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);
    setProgress(0);
    setResults([]);

    try {
      let blobs: Blob[] = [];

      const imageFormats = ['PNG', 'JPG', 'WEBP', 'HEIC', 'SVG', 'TIFF'];
      const mediaFormats = ['MP3', 'MP4', 'GIF', 'WEBM', 'MOV', 'WAV'];
      const isPdf = to === 'PDF';

      if (imageFormats.includes(to) && imageFormats.includes(from)) {
        const { convertImage } = await import('@/lib/converters/imageConverter');
        const blob = await convertImage(file, to as any);
        blobs = [blob];
      } else if (mediaFormats.includes(to)) {
        const { convertMedia } = await import('@/lib/converters/videoConverter');
        const blob = await convertMedia(file, to, (p) => setProgress(p));
        blobs = [blob];
      } else if (isPdf && (from === 'JPG' || from === 'PNG')) {
        const { convertImagesToPdf } = await import('@/lib/converters/pdfConverter');
        const blob = await convertImagesToPdf([file]);
        blobs = [blob];
      } else if (from === 'PDF' && (to === 'JPG' || to === 'PNG')) {
        const { convertPdfToImages } = await import('@/lib/converters/pdfConverter');
        blobs = await convertPdfToImages(file, to as any);
      } else {
        throw new Error(`Conversion from ${from} to ${to} is not yet supported in this beta.`);
      }

      const newResults = blobs.map((blob, index) => ({
        blob,
        url: URL.createObjectURL(blob),
        name: blobs.length > 1 
          ? `page-${index + 1}.${to.toLowerCase()}` 
          : `converted-file.${to.toLowerCase()}`
      }));
      setResults(newResults);
    } catch (err: any) {
      setError(err.message || 'Conversion failed. Please try again.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: '2px dashed var(--border)',
          borderRadius: 'var(--radius)',
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'var(--secondary)',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          marginBottom: '2rem'
        }}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input 
          id="fileInput"
          type="file" 
          onChange={handleFileChange} 
          style={{ display: 'none' }}
        />
        
        {file ? (
          <div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{file.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Click or drop your {from} file here</p>
            <p style={{ color: 'var(--text-muted)' }}>Secure, local-only processing</p>
          </div>
        )}
      </div>

      {isConverting && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${progress > 0 ? progress : 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s', animation: progress === 0 ? 'pulse 2s infinite' : 'none' }}></div>
          </div>
          
          <div className="interstitial-ad" style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--secondary)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Processing your file locally... while you wait:</p>
            <div style={{ height: '100px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              ADVERTISEMENT - INTERSTITIAL (Mobile 320x100 or Desktop 468x60)
            </div>
          </div>
        </div>
      )}

      {!isConverting && results.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleConvert}
            disabled={!file}
            style={{
              padding: '1.2rem 4rem',
              fontSize: '1.2rem',
              fontWeight: 800,
              backgroundColor: !file ? 'var(--text-muted)' : 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius)',
              cursor: file ? 'pointer' : 'default',
              transition: 'transform 0.2s, background-color 0.2s',
              boxShadow: file ? '0 4px 14px 0 rgba(0,118,255,0.39)' : 'none'
            }}
            onMouseOver={(e) => file && (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => file && (e.currentTarget.style.transform = 'scale(1)')}
          >
            Convert to {to}
          </button>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center', padding: '2.5rem', background: 'rgba(40, 167, 69, 0.05)', borderRadius: 'var(--radius)', border: '2px solid #28a745' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <p style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.5rem', color: '#28a745' }}>Conversion Successful!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', flexDirection: results.length > 1 ? 'column' : 'row', alignItems: 'center' }}>
            {results.map((res, i) => (
              <a 
                key={i}
                href={res.url} 
                download={res.name}
                style={{
                  padding: results.length > 1 ? '0.75rem 1.5rem' : '1rem 3rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: 'var(--radius)',
                  fontWeight: 800,
                  fontSize: results.length > 1 ? '0.9rem' : '1.1rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px 0 rgba(40, 167, 69, 0.39)',
                  width: results.length > 1 ? '100%' : 'auto',
                  maxWidth: '300px'
                }}
              >
                Download {results.length > 1 ? `Page ${i + 1}` : to}
              </a>
            ))}
            
            <button 
              onClick={() => { setFile(null); setResults([]); }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: 'var(--text-muted)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: results.length > 1 ? '1rem' : '0'
              }}
            >
              Convert Another
            </button>
          </div>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', background: '#ffeef0', borderRadius: 'var(--radius)', border: '1px solid #ffccd3', color: '#d73a49' }}>
          {error}
        </div>
      )}
    </div>
  );
}
