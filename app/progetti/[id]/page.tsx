"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { projectsData } from '@/lib/projects';
import Link from 'next/link';

export default function ProjectDetail() {
    const params = useParams();
    
    // Recupero sicuro dell'ID: gestisce sia stringa che array
    const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
    const project = id ? projectsData[id] : null;

    // Stati per il modulo feedback
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");

    // Stato per il tema (Chiaro / Scuro)
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    // Sincronizza lo stato locale del bottone con il tema attualmente attivo sull'HTML
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, []);

    // Cambia il tema sul tag HTML e aggiorna lo stato locale
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
    };

    // FUNZIONE DI INVIO FORM (Mancava e causava l'errore)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const nameInput = formData.get("name") as string;
        setUserName(nameInput);

        try {
            const response = await fetch("https://formspree.io/f/xrejvwpr", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Errore nell'invio. Riprova.");
            }
        } catch (error) {
            alert("Errore di connessione.");
        } finally {
            setLoading(false);
        }
    };

    // Controllo esistenza progetto
    if (!project) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1 style={{ color: 'var(--text-main)' }}>Progetto non trovato</h1>
                <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    Torna alla Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ textAlign: 'left', maxWidth: '600px' }}>
            
            {/* Barra superiore: contiene il tasto torna indietro e lo Switch del Tema */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    ← Torna alla Home
                </Link>

                {/* Bottone Switch Giorno/Notte */}
                <button 
                    onClick={toggleTheme} 
                    className="theme-toggle-btn" 
                    aria-label="Cambia Tema"
                    style={{ padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {theme === 'dark' ? (
                        /* Icona della Luna */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                    ) : (
                        /* Icona del Sole */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    )}
                </button>
            </div>

            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '10px' }}>{project.title}</h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '20px' }}>
                {project.description}
            </p>

            {/* VISUALIZZAZIONE TAGS */}
            <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '25px', 
                flexWrap: 'wrap' 
            }}>
                {project.tags.map((tag) => (
                    <span 
                        key={tag} 
                        style={{
                            fontSize: '0.75rem',
                            background: 'var(--accent-glow)',
                            color: 'var(--accent)',
                            padding: '5px 12px',
                            borderRadius: '50px',
                            border: '1px solid var(--accent)',
                            fontWeight: '500',
                            letterSpacing: '0.5px',
                            opacity: 0.9
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hub-card">
                Vai al Progetto Live
            </a>

            {/* SEZIONE FEEDBACK */}
            <div style={{
                marginTop: '50px', padding: '30px', border: '1px solid var(--border)',
                borderRadius: '24px', background: 'var(--panel)', boxShadow: '0 10px 30px var(--accent-glow)'
            }}>

                {!submitted ? (
                    <>
                        <h3 style={{ marginBottom: '10px', color: 'var(--text-main)' }}>Lascia un feedback</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Il tuo Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Esempio: Mario Rossi"
                                    style={{
                                        width: '100%', padding: '12px', background: 'var(--background)', border: '1px solid var(--border)',
                                        color: 'var(--text-main)', borderRadius: '10px', outline: 'none', boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Valutazione</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer', outline: 'none',
                                                fontSize: '1.8rem', color: (hover || rating) >= star ? 'var(--accent)' : 'var(--border)',
                                                transition: 'transform 0.1s, color 0.2s',
                                                transform: (hover || rating) >= star ? 'scale(1.1)' : 'scale(1)'
                                            }}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <input type="hidden" name="rating" value={rating} />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Suggerimenti</label>
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Cosa posso migliorare?"
                                    style={{
                                        width: '100%', padding: '12px', background: 'var(--background)', border: '1px solid var(--border)',
                                        color: 'var(--text-main)', borderRadius: '10px', minHeight: '100px', outline: 'none', boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <input type="hidden" name="_subject" value={`Nuovo Feedback per ${project.title}`} />
                            <input type="hidden" name="project_name" value={project.title} />

                            <button
                                type="submit"
                                disabled={rating === 0 || loading}
                                style={{
                                    width: '100%', 
                                    background: rating > 0 ? 'var(--accent)' : 'var(--border)',
                                    color: rating > 0 ? '#000000' : 'var(--text-muted)', 
                                    border: 'none',
                                    padding: '15px', borderRadius: '12px', fontWeight: 'bold',
                                    cursor: rating > 0 ? 'pointer' : 'not-allowed', transition: '0.3s',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? "Invio in corso..." : "Invia Feedback"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>✨</div>
                        <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Grazie, {userName}!</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                            Il tuo feedback per <strong>{project.title}</strong> è stato inviato correttamente.
                        </p>
                        <button
                            onClick={() => { setSubmitted(false); setRating(0); }}
                            style={{
                                background: 'var(--accent-glow)', border: '1px solid var(--accent)',
                                color: 'var(--accent)', padding: '10px 20px', borderRadius: '10px',
                                cursor: 'pointer', marginTop: '25px', fontSize: '0.9rem'
                            }}
                        >
                            Invia un altro suggerimento
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}