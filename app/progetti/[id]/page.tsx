"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { projectsData } from '@/lib/projects';
import Link from 'next/link';

export default function ProjectDetail() {
    const params = useParams();
    
    // CORREZIONE 1: Gestione sicura dell'ID per evitare errori di build
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const project = id ? projectsData[id] : null;

    // Stati per il modulo feedback
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");

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

    // CORREZIONE 2: Controllo esistenza progetto prima del rendering
    if (!project) {
        return (
            <div className="container">
                <h1 style={{ color: 'white' }}>Progetto non trovato</h1>
                <Link href="/" style={{ color: 'var(--accent)' }}>Torna alla Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ textAlign: 'left', maxWidth: '600px' }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem' }}>
                ← Torna alla Home
            </Link>

            <h1 style={{ marginTop: '20px', fontSize: '2.5rem', color: 'white' }}>{project.title}</h1>
            <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '30px' }}>
                {project.description}
            </p>

            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hub-card">
                Vai al Progetto Live
            </a>

            <div style={{
                marginTop: '50px', padding: '30px', border: '1px solid var(--border)',
                borderRadius: '24px', background: 'var(--panel)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                
                {!submitted ? (
                    <>
                        <h3 style={{ marginBottom: '10px', color: 'white' }}>Lascia un feedback</h3>
                        <form onSubmit={handleSubmit}>
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
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>✨</div>
                        <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Grazie, {userName}!</h2>
                        <p style={{ color: '#ccc', lineHeight: '1.5' }}>
                            Il tuo feedback per <strong>{project.title}</strong> è stato inviato correttamente.
                        </p>
                        <button
                            onClick={() => { setSubmitted(false); setRating(0); }}
                            style={{ 
                                background: 'rgba(45, 212, 191, 0.1)', border: '1px solid var(--accent)', 
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