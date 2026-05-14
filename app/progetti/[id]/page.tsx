"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { projectsData } from '@/lib/projects';
import Link from 'next/link';

export default function ProjectDetail() {
    const params = useParams();
    const id = params.id as string;
    const project = projectsData[id];

    // Stati per il modulo feedback
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Funzione per gestire l'invio senza ricaricare la pagina
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Prendiamo i dati dal form
        const form = e.currentTarget;
        const formData = new FormData(form);

        // DEBUG: Vediamo nel terminale del browser cosa stiamo inviando
        console.log("Dati in invio:", Object.fromEntries(formData.entries()));

        try {
            const response = await fetch("https://formspree.io/f/xrejvwpr", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log("Risposta da Formspree:", data);

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Errore Formspree: " + (data.error || "Riprova"));
            }
        } catch (error) {
            console.error("Errore Fetch:", error);
            alert("Errore di connessione. Controlla il terminale (F12).");
        } finally {
            setLoading(false);
        }
    };

    if (!project) return <div className="container">Progetto non trovato</div>;

    return (
        <div className="container" style={{ textAlign: 'left', maxWidth: '600px' }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem' }}>
                ← Torna alla Home
            </Link>

            <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{project.title}</h1>
            <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '30px' }}>
                {project.description}
            </p>

            <a href={project.link} target="_blank" className="hub-card">
                Vai al Progetto Live
            </a>

            {/* SEZIONE FEEDBACK */}
            <div style={{
                marginTop: '50px', padding: '30px', border: '1px solid var(--border)',
                borderRadius: '24px', background: 'var(--panel)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <h3 style={{ marginBottom: '10px' }}>Lascia un feedback</h3>

                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        {/* Campo Nome */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Il tuo Nome</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Esempio: Mario Rossi"
                                style={{
                                    width: '100%', padding: '12px', background: '#000', border: '1px solid #222',
                                    color: 'white', borderRadius: '10px', outline: 'none'
                                }}
                            />
                        </div>

                        {/* Valutazione in Stelle */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Valutazione</label>
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
                                            fontSize: '1.8rem', color: (hover || rating) >= star ? 'var(--accent)' : '#222',
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

                        {/* Commento */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Suggerimenti</label>
                            <textarea
                                name="message"
                                required
                                placeholder="Cosa posso migliorare?"
                                style={{
                                    width: '100%', padding: '12px', background: '#000', border: '1px solid #222',
                                    color: 'white', borderRadius: '10px', minHeight: '100px', outline: 'none'
                                }}
                            />
                        </div>

                        {/* Dati nascosti per Formspree */}
                        <input type="hidden" name="_subject" value={`Nuovo Feedback per ${project.title}`} />
                        <input type="hidden" name="project_name" value={project.title} />

                        <button
                            type="submit"
                            disabled={rating === 0 || loading}
                            style={{
                                width: '100%', background: rating > 0 ? 'var(--accent)' : '#111',
                                color: rating > 0 ? 'black' : '#444', border: 'none',
                                padding: '15px', borderRadius: '12px', fontWeight: 'bold',
                                cursor: rating > 0 ? 'pointer' : 'not-allowed', transition: '0.3s',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? "Invio in corso..." : "Invia Feedback"}
                        </button>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
                        <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>Feedback inviato!</p>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>Grazie Alessandro, riceverai una notifica via mail.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', textDecoration: 'underline', marginTop: '20px' }}
                        >
                            Invia un altro suggerimento
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}