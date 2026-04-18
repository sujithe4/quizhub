import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopScores } from '../services/firebase';

function Leaderboard() {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (loading && !error) {
                setLoading(false);
                setError("Connection Timed Out. This often happens if Firebase Rules are set to 'Lock Mode' or the Database URL is incorrect.");
            }
        }, 8000);

        const unsubscribe = getTopScores(
            (data) => {
                clearTimeout(timeout);
                setScores(data);
                setLoading(false);
                setError(null);
            },
            (errMessage) => {
                clearTimeout(timeout);
                setLoading(false);
                setError(errMessage);
            }
        );

        return () => {
            clearTimeout(timeout);
            if (typeof unsubscribe === 'function') unsubscribe();
        };
    }, [loading, error]);

    return (
        <div className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
            <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px' }}>Global Ranking</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>The elite of the AI-Powered Quiz Hub sequence.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Synchronizing Ranking Data...</p>
                </div>
            ) : error ? (
                <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', borderColor: 'var(--error)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
                    <h3 style={{ marginBottom: '16px' }}>Connectivity Alert</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>{error}</p>
                    <button className="btn btn-secondary" onClick={() => window.location.reload()}>Retry Protocol</button>
                </div>
            ) : (
                <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
                    <div style={{ padding: '0 24px 20px', display: 'grid', gridTemplateColumns: '80px 1fr 120px', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <span>Rank</span>
                        <span>Operator</span>
                        <span style={{ textAlign: 'right' }}>Score</span>
                    </div>
                    {scores.length > 0 ? (
                        <div style={{ display: 'grid', gap: '8px' }}>
                            {scores.map((entry, index) => (
                                <div key={entry.id} className="glass-card" style={{ 
                                    padding: '20px 24px', 
                                    display: 'grid', 
                                    gridTemplateColumns: '80px 1fr 120px', 
                                    alignItems: 'center',
                                    background: index === 0 ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                    borderColor: index === 0 ? 'var(--primary)' : 'var(--glass-border)'
                                }}>
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '12px', 
                                        background: index < 3 ? 'var(--primary)' : 'rgba(255,255,255,0.05)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontWeight: '800',
                                        fontSize: '1rem',
                                        color: index < 3 ? 'white' : 'var(--text-secondary)'
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>{entry.name}</div>
                                    <div style={{ textAlign: 'right', fontWeight: '800', fontSize: '1.25rem', color: 'var(--primary)' }}>{entry.score}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-secondary)' }}>
                            No score entries detected in current sequence.
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: '48px', textAlign: 'center' }}>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    ← Return to Terminal
                </button>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default Leaderboard;
