"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hub() {
  const [githubRepos, setGithubRepos] = useState<number | string>("...");
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // 1. SINCRONIZZA IL TEMA ALL'APERTURA DELLA PAGINA (Risolve il bug dello sfondo/bottone)
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  // Recupero dati GitHub
  useEffect(() => {
    fetch('https://api.github.com/users/alessandros0tgiu')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setGithubRepos(data.public_repos);
      })
      .catch(() => {
        setGithubRepos("45+"); 
      });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <div className="container">
      {/* Container Switch Tema Animato Isolato per la Home */}
      <div className="theme-switch-wrapper" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '20px' }}>
        <label className="theme-switch-label">
          <input 
            type="checkbox" 
            className="theme-switch-checkbox" 
            checked={theme === 'light'} 
            onChange={toggleTheme} 
          />
          <div className="theme-slider round">
            <div className="sun-moon">
              <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
              <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={50} />
              </svg>
            </div>
            <div className="stars">
              <svg id="star-1" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
              </svg>
              <svg id="star-2" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
              </svg>
              <svg id="star-3" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
              </svg>
              <svg id="star-4" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
              </svg>
            </div>
          </div>
        </label>
      </div>

      {/* Header */}
      <img src="https://github.com/alessandros0tgiu.png" alt="Profile" className="profile-img" />
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Alessandro</h1>
      <p style={{ color: 'var(--accent)', fontWeight: 500 }}>Junior Developer</p>

      {/* Progetti */}
      <h2 className="section-title">I Miei Progetti</h2>
      
      <Link href="/progetti/taskflow-premium" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
        TaskFlow Dark
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      <Link href="/progetti/taskflow-app-s" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        TaskFlow App
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      <Link href="/progetti/app-meteo" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a3.5 3.5 0 1 1-5.83-2.66h.01a5 5 0 1 1 9.32-2.34h.01A3 3 0 1 1 17.5 19z"/></svg>
        App Meteo
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      <Link href="/progetti/barbershop" className="hub-card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="9.8" y1="8.2" x2="21" y2="19"/><line x1="9.8" y1="15.8" x2="21" y2="5"/></svg>
        Barbershop Luxury
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
      </Link>

      {/* SEZIONE SOCIAL */}
      <h2 className="section-title">Social & Contacts</h2>
      
      <div className="social-row">
        
        {/* GITHUB */}
        <div className="tooltip-container brand-github">
          <div className="tooltip">
            <div className="profile-tooltip">
              <div className="user-tooltip">
                <div className="img-tooltip">Gh</div>
                <div className="details-tooltip">
                  <div className="name-tooltip">Alessandro</div>
                  <div className="username-tooltip">@alessandros0tgiu</div>
                </div>
              </div>
              <div className="about-tooltip">{githubRepos} Repositories</div>
            </div>
          </div>
          <a className="icon-btn brand-github" href="https://github.com/alessandros0tgiu" target="_blank" rel="noopener noreferrer">
            <div className="layer">
              <span /><span /><span /><span />
              <span className="githubSVG">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </span>
            </div>
            <div className="text-btn text-github">GitHub</div>
          </a>
        </div>

        {/* INSTAGRAM */}
        <div className="tooltip-container brand-instagram">
          <div className="tooltip">
            <div className="profile-tooltip">
              <div className="user-tooltip">
                <div className="img-tooltip">Ig</div>
                <div className="details-tooltip">
                  <div className="name-tooltip">Alessandro</div>
                  <div className="username-tooltip">@alessandro.sotgiuu</div>
                </div>
              </div>
              <div className="about-tooltip">+900 Followers</div>
            </div>
          </div>
          <a className="icon-btn brand-instagram" href="https://instagram.com/alessandro.sotgiuu" target="_blank" rel="noopener noreferrer">
            <div className="layer">
              <span /><span /><span /><span />
              <span className="instagramSVG">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
            </div>
            <div className="text-btn text-instagram">Instagram</div>
          </a>
        </div>

        {/* LINKEDIN */}
        <div className="tooltip-container brand-linkedin">
          <div className="tooltip">
            <div className="profile-tooltip">
              <div className="user-tooltip">
                <div className="img-tooltip">In</div>
                <div className="details-tooltip">
                  <div className="name-tooltip">Alessandro</div>
                  <div className="username-tooltip">@alessandro-sotgiu</div>
                </div>
              </div>
              <div className="about-tooltip">View Profile</div>
            </div>
          </div>
          <a className="icon-btn brand-linkedin" href="https://www.linkedin.com/in/alessandro-sotgiu-7931693a1/" target="_blank" rel="noopener noreferrer">
            <div className="layer">
              <span /><span /><span /><span />
              <span className="linkedinSVG">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </span>
            </div>
            <div className="text-btn text-linkedin">LinkedIn</div>
          </a>
        </div>

      </div>

      <footer style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        © 2026 • Built with Next.js
      </footer>
    </div>
  );
}