"use client";
import Link from 'next/link';

export default function Hub() {
  return (
    <div className="container">
      {/* Header */}
      <img src="https://github.com/alessandros0tgiu.png" alt="Profile" className="profile-img" />
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Alessandro</h1>
      <p style={{ color: 'var(--accent)', fontWeight: 500 }}>Junior Developer</p>

      {/* Progetti */}
      <h2 className="section-title">I Miei Progetti</h2>
      
      {/* TaskFlow Premium */}
      <Link href="/progetti/taskflow-premium" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
        TaskFlow Premium
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      {/* TaskFlow App S */}
      <Link href="/progetti/taskflow-app-s" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        TaskFlow App S
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      {/* App Meteo */}
      <Link href="/progetti/app-meteo" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a3.5 3.5 0 1 1-5.83-2.66h.01a5 5 0 1 1 9.32-2.34h.01A3 3 0 1 1 17.5 19z"/></svg>
        App Meteo
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      {/* Social Links */}
      <h2 className="section-title">Social & Contacts</h2>

      <a href="https://github.com/alessandros0tgiu" target="_blank" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        GitHub
      </a>

      <a href="https://instagram.com/alessandro.sotgiuu" target="_blank" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        Instagram
      </a>

      <a href="https://www.linkedin.com/in/alessandro-sotgiu-7931693a1/" target="_blank" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        LinkedIn
      </a>

      <footer style={{ marginTop: '60px', color: '#333', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} • Built with Next.js
      </footer>
    </div>
  );
}