import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions, submitQuiz } from '../services/api';
import { updateLeaderboard } from '../services/firebase';

function Quiz() {
    const { topic } = useParams();
    const navigate = useNavigate();
    
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(15);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetchQuestions(topic);
                setQuestions(res.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        };
        load();
    }, [topic]);

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await submitQuiz({
                name,
                email,
                topic,
                answers: Object.values(userAnswers)
            });
            
            const userId = email.replace(/[^a-zA-Z0-9]/g, '_');
            updateLeaderboard(userId, name, res.data.score);
            
            navigate('/result', { state: { result: res.data } });
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }, [name, email, topic, userAnswers, navigate]);

    const handleNext = useCallback(() => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setTimeLeft(15);
        } else {
            handleSubmit();
        }
    }, [currentIdx, questions.length, handleSubmit]);

    useEffect(() => {
        let timer;
        if (isStarted && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (isStarted && timeLeft === 0) {
            // Use a slight delay to avoid synchronous setState in effect
            timer = setTimeout(() => handleNext(), 10);
        }
        return () => clearTimeout(timer);
    }, [timeLeft, isStarted, handleNext]);

    const handleAnswer = (optionIdx) => {
        setUserAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
    };

    if (isLoading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                <h2 style={{ color: 'var(--text-secondary)' }}>Initializing Module...</h2>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (!isStarted) {
        return (
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div className="glass-panel animate-fade-in" style={{ padding: '48px', maxWidth: '480px', width: '100%' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>Assessment Entry</h2>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>Initialize your profile to begin the {topic?.toUpperCase()} sequence.</p>
                    
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Identification Name</label>
                        <input 
                            type="text" 
                            style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem', outline: 'none' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Alan Turing"
                        />
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Communication Protocol (Email)</label>
                        <input 
                            type="email" 
                            style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem', outline: 'none' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. alan@turing.org"
                        />
                    </div>
                    <button 
                        className="btn btn-primary glow-on-hover" 
                        style={{ width: '100%', padding: '16px' }}
                        disabled={!name || !email}
                        onClick={() => setIsStarted(true)}
                    >
                        Establish Connection →
                    </button>
                </div>
            </div>
        );
    }

    const q = questions[currentIdx];

    return (
        <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
            {/* Header / Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', alignItems: 'center' }}>
                <div>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{topic} Assessment</span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>Sequence {currentIdx + 1} <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>/ {questions.length}</span></h3>
                </div>
                <div className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderColor: timeLeft <= 5 ? 'var(--error)' : 'var(--glass-border)' }}>
                    <span style={{ fontSize: '1.25rem' }}>⏱️</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', fontVariantNumeric: 'tabular-nums', color: timeLeft <= 5 ? 'var(--error)' : 'var(--text-primary)' }}>{timeLeft}s</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', marginBottom: '64px', overflow: 'hidden' }}>
                <div style={{ 
                    height: '100%', 
                    width: `${((currentIdx + 1) / questions.length) * 100}%`, 
                    background: 'linear-gradient(to right, var(--primary), var(--secondary))', 
                    borderRadius: '100px',
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 20px var(--primary-glow)'
                }}></div>
            </div>

            {/* Question Card */}
            <div className="glass-panel animate-fade-in" key={currentIdx} style={{ padding: '64px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '48px', fontWeight: '600', lineHeight: '1.4' }}>{q.question}</h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                    {q.options.map((opt, i) => (
                        <button 
                            key={i}
                            className="btn"
                            style={{ 
                                textAlign: 'left', 
                                padding: '20px 24px',
                                background: userAnswers[currentIdx] === i ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                                border: userAnswers[currentIdx] === i ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                                color: userAnswers[currentIdx] === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontSize: '1.125rem'
                            }}
                            onClick={() => handleAnswer(i)}
                        >
                            <div style={{ 
                                width: '28px', 
                                height: '28px', 
                                borderRadius: '50%', 
                                border: '2px solid', 
                                borderColor: userAnswers[currentIdx] === i ? 'var(--primary)' : 'var(--glass-border)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                background: userAnswers[currentIdx] === i ? 'var(--primary)' : 'transparent',
                                color: userAnswers[currentIdx] === i ? 'white' : 'var(--text-secondary)'
                            }}>
                                {String.fromCharCode(65 + i)}
                            </div>
                            {opt}
                        </button>
                    ))}
                </div>
                
                <div style={{ marginTop: '56px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        className="btn btn-primary" 
                        style={{ padding: '16px 48px' }}
                        onClick={handleNext}
                        disabled={userAnswers[currentIdx] === undefined && timeLeft > 0}
                    >
                        {currentIdx === questions.length - 1 ? 'Execute Evaluation' : 'Next Sequence →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
