import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { id: 'ai', title: 'Artificial Intelligence', icon: '🤖', description: 'Master Neural Networks, Machine Learning, and the history of AI.' },
    { id: 'data science', title: 'Data Science', icon: '📊', description: 'Deep dive into statistics, data structures, and predictive modeling.' },
    { id: 'os', title: 'Operating Systems', icon: '💻', description: 'Understand kernels, process management, and memory architecture.' },
];

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#020617' }}>
            {/* STABLE PREMIUM BACKGROUND (CSS ONLY) */}
            <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0,
                background: `
                    radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 1) 0%, transparent 80%)
                `
            }} />
            
            {/* Animated Mesh Gradients */}
            <div style={{
                position: 'fixed',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                animation: 'rotateMesh 30s linear infinite',
                opacity: 0.4,
                zIndex: 0,
                background: 'radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 1) 70%), repeating-radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.05) 0%, transparent 10%)'
            }} />

            {/* CONTENT LAYER */}
            <div style={{ position: 'relative', zIndex: 1 }} className="container">
                {/* Hero Section */}
                <header className="animate-fade-in" style={{ textAlign: 'center', padding: '120px 0 80px' }}>
                    <div className="glass-card" style={{ 
                        display: 'inline-block', 
                        padding: '8px 20px', 
                        background: 'rgba(99, 102, 241, 0.1)', 
                        borderRadius: '100px', 
                        color: '#818cf8', 
                        fontSize: '0.875rem', 
                        fontWeight: '600',
                        marginBottom: '24px',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        ⚡ High Performance Assessment Engine
                    </div>
                    <h1 style={{ 
                        fontSize: 'max(48px, 5.5vw)', 
                        lineHeight: '1.05', 
                        fontWeight: '900', 
                        marginBottom: '28px',
                        background: 'linear-gradient(to bottom, #ffffff 30%, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-2px'
                    }}>
                        Master the Tech <br /> Digital Frontier
                    </h1>
                    <p style={{ 
                        fontSize: '1.35rem', 
                        color: 'var(--text-secondary)', 
                        maxWidth: '650px', 
                        margin: '0 auto 48px',
                        fontWeight: '400',
                        lineHeight: '1.5'
                    }}>
                        The web's most sophisticated quiz platform for AI, Systems, and Data Excellence. Optimized for speed and visual fidelity.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn btn-primary glow-on-hover"
                            style={{ padding: '18px 48px', fontSize: '1.1rem' }}
                            onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Started
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            style={{ padding: '18px 48px', fontSize: '1.1rem' }}
                            onClick={() => navigate('/leaderboard')}
                        >
                            Leaderboard
                        </button>
                    </div>
                </header>

                {/* Categories Section */}
                <section id="categories" style={{ padding: '80px 0 160px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>Select Module</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px' }}></div>
                    </div>

                    <div className="grid-categories" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '32px' 
                    }}>
                        {categories.map((cat, index) => (
                            <div 
                                key={cat.id} 
                                className="glass-panel animate-fade-in" 
                                style={{ 
                                    padding: '48px', 
                                    cursor: 'pointer',
                                    animationDelay: `${index * 0.1}s`,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onClick={() => navigate(`/quiz/${cat.id}`)}
                            >
                                <div style={{ 
                                    width: '72px', 
                                    height: '72px', 
                                    background: 'rgba(99, 102, 241, 0.1)', 
                                    borderRadius: '20px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    fontSize: '2.8rem',
                                    marginBottom: '32px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    {cat.icon}
                                </div>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', fontWeight: '800' }}>{cat.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6' }}>{cat.description}</p>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    color: 'var(--primary)', 
                                    fontWeight: '700',
                                    gap: '12px',
                                    fontSize: '1.1rem'
                                }}>
                                    Launch Analysis <span style={{ fontSize: '1.4rem' }}>→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
                @keyframes rotateMesh {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Home;
