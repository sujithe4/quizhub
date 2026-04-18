import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function Result() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { result } = state || {};

    useEffect(() => {
        if (result && result.results) {
            const score = result.score || 0;
            const totalQuestions = result.results.length || 1;
            const percentage = (score / (totalQuestions * 10)) * 100;
            
            if (percentage >= 70) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#ec4899', '#f8fafc']
                });
            }
        }
    }, [result]);

    // Defensive check: The backend returns 'results' array, not 'questions'
    if (!result || !result.results) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)', color: 'white' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '20px' }}>Connection sequence lost</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Verify your assessment was submitted correctly.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Return to Hub</button>
                </div>
            </div>
        );
    }

    const score = result.score || 0;
    const totalQuestions = result.results.length || 1;
    const percentage = Math.round((score / (totalQuestions * 10)) * 100);

    return (
        <div className="container" style={{ padding: '80px 0', maxWidth: '1000px', minHeight: '100vh' }}>
            <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '80px' }}>
                <div style={{ 
                    display: 'inline-block', 
                    padding: '12px 24px', 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    borderRadius: '100px', 
                    color: 'var(--primary)', 
                    fontSize: '1rem', 
                    fontWeight: '700',
                    marginBottom: '32px',
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                    Assessment Completed
                </div>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '16px' }}>Sequence Summary</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>Your performance has been evaluated and archived.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '80px' }}>
                {/* Score Panel */}
                <div className="glass-panel animate-fade-in" style={{ padding: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ 
                        width: '180px', 
                        height: '180px', 
                        borderRadius: '50%', 
                        border: '8px solid rgba(255,255,255,0.05)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: '32px'
                    }}>
                        <div style={{ 
                            position: 'absolute', 
                            top: '-8px', 
                            left: '-8px', 
                            width: '180px', 
                            height: '180px', 
                            borderRadius: '50%', 
                            border: '8px solid var(--primary)', 
                            clipPath: `inset(0 ${100 - percentage}% 0 0)`,
                            transition: 'all 1s ease-out'
                        }}></div>
                        <span style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)' }}>{score}</span>
                        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Score Points</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>
                        {percentage >= 80 ? 'Exceptional Mastery' : percentage >= 50 ? 'Proficient' : 'Further Training Required'}
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>You achieved {percentage}% accuracy in this sequence.</p>
                </div>

                {/* Metric Panel */}
                <div className="glass-panel animate-fade-in" style={{ padding: '48px', animationDelay: '0.2s' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '32px', fontWeight: '700' }}>Metric Breakdown</h3>
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Questions Resolved</span>
                            <span style={{ fontWeight: '700' }}>{totalQuestions}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Accuracy Rate</span>
                            <span style={{ fontWeight: '700', color: 'var(--success)' }}>{percentage}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Execution Status</span>
                            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>Archived</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
                        <button className="btn btn-primary glow-on-hover" style={{ flex: 1 }} onClick={() => navigate('/leaderboard')}>Check Rankings</button>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Sequence Review</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Detailed feedback on every assessment item.</p>
            </div>

            <div style={{ display: 'grid', gap: '24px' }}>
                {result.results.map((resData, i) => (
                    <div key={i} className="glass-card animate-fade-in" style={{ padding: '32px', borderLeft: `4px solid ${resData.isCorrect ? 'var(--success)' : 'var(--error)'}`, animationDelay: `${0.3 + (i * 0.1)}s` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', maxWidth: '80%' }}>{resData.question || "Analysis Complete"}</h4>
                            <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '8px', 
                                background: resData.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: resData.isCorrect ? 'var(--success)' : 'var(--error)',
                                fontSize: '0.875rem',
                                fontWeight: '700'
                            }}>
                                {resData.isCorrect ? 'CORRECT' : 'INCORRECT'}
                            </span>
                        </div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Your Entry: <span style={{ color: resData.isCorrect ? 'var(--success)' : 'var(--error)', fontWeight: '600' }}>{resData.userAnswer || "N/A"}</span></p>
                            {!resData.isCorrect && (
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Correct Matrix: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{resData.correctAnswer}</span></p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '80px', textAlign: 'center' }}>
                <button className="btn btn-secondary" style={{ padding: '16px 40px' }} onClick={() => navigate('/')}>Return to Command Center</button>
            </div>
        </div>
    );
}

export default Result;
