import React, { useEffect, useState } from 'react';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

interface ProgressData {
  completed: string[];
  total: number;
}

const TOTAL_LESSONS = 6; // fallback total

const getProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem('blues_guitar_progress');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        completed: Array.isArray(parsed.completed) ? parsed.completed : [],
        total: typeof parsed.total === 'number' ? parsed.total : TOTAL_LESSONS,
      };
    }
  } catch {
    // ignore
  }
  return { completed: [], total: TOTAL_LESSONS };
};

const QuickStartCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  onClick: () => void;
}> = ({ icon, title, subtitle, accentColor, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '6px',
      padding: '14px 12px',
      background: 'var(--bg-card)',
      border: `1px solid var(--border-subtle)`,
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      textAlign: 'left',
      WebkitTapHighlightColor: 'transparent',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor + '55';
      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)';
      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
    }}
    onTouchStart={e => {
      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
    }}
    onTouchEnd={e => {
      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
    }}
  >
    <span style={{
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: accentColor + '20',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
    }}>
      {icon}
    </span>
    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
      {title}
    </span>
    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
      {subtitle}
    </span>
  </button>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState<ProgressData>({ completed: [], total: TOTAL_LESSONS });

  useEffect(() => {
    setProgress(getProgress());
    // Listen for storage changes (e.g. from LessonDetailPage)
    const handler = () => setProgress(getProgress());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const completedCount = progress.completed.length;
  const totalCount = progress.total;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isStarted = completedCount > 0;

  return (
    <div className="page" style={{ padding: 0, overflow: 'hidden' }}>
      {/* ─── Hero Section ───────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        padding: '48px 20px 40px',
        background: 'linear-gradient(160deg, var(--bg-card) 0%, var(--bg-secondary) 40%, var(--bg-primary) 100%)',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Guitar SVG decoration */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          opacity: 0.08,
        }}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <ellipse cx="45" cy="62" rx="22" ry="24" stroke="#4a90d9" strokeWidth="3" />
            <rect x="41" y="12" width="8" height="28" rx="4" stroke="#4a90d9" strokeWidth="3" />
            <line x1="38" y1="18" x2="52" y2="18" stroke="#4a90d9" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="24" x2="52" y2="24" stroke="#4a90d9" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="30" x2="52" y2="30" stroke="#4a90d9" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="45" cy="62" r="7" stroke="#4a90d9" strokeWidth="2.5" />
            <line x1="32" y1="52" x2="58" y2="72" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" />
            <line x1="58" y1="52" x2="32" y2="72" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Tag line */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(74,144,217,0.15)',
          border: '1px solid rgba(74,144,217,0.3)',
          borderRadius: '20px',
          padding: '4px 12px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '14px' }}>🎸</span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#4a90d9', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Blues Guitar
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '34px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
          marginBottom: '10px',
          background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-blue) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Blues Guitar
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '28px',
          maxWidth: '260px',
        }}>
          Master the blues,<br />
          <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>one fret at a time</span>
        </p>

        {/* Progress card */}
        <div style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(74,144,217,0.2)',
          borderRadius: '14px',
          padding: '16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Your Progress</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {completedCount}
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  {' '}/ {totalCount} lessons
                </span>
              </div>
            </div>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: `conic-gradient(var(--accent-blue) ${progressPct * 3.6}deg, var(--border-subtle) 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: '#4a90d9',
              }}>
                {progressPct}%
              </div>
            </div>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          {isStarted && (
            <p style={{ fontSize: '12px', color: 'var(--accent-gold)', marginTop: '8px', fontStyle: 'italic' }}>
              Keep it up! You're building that blues foundation. 🎶
            </p>
          )}
          {!isStarted && (
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
              Start your first lesson to track progress
            </p>
          )}
        </div>
      </div>

      {/* ─── Quick Start ─────────────────────────────────────────── */}
      <div style={{ padding: '24px 16px 20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
          Quick Start
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <QuickStartCard
            icon="📖"
            title="First Lesson"
            subtitle="Begin from scratch"
            accentColor="#4a90d9"
            onClick={() => onNavigate('lesson/module_1')}
          />
          <QuickStartCard
            icon="🎸"
            title="Chords"
            subtitle="Essential shapes"
            accentColor="#d4a843"
            onClick={() => onNavigate('chords')}
          />
          <QuickStartCard
            icon="🎵"
            title="Scales"
            subtitle="Pentatonic boxes"
            accentColor="#2ecc71"
            onClick={() => onNavigate('scales')}
          />
        </div>
      </div>

      {/* ─── Explore Section ────────────────────────────────────── */}
      <div style={{ padding: '0 16px 24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
          Explore
        </h2>

        {/* Lessons CTA */}
        <button
          onClick={() => onNavigate('lessons')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px',
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-hover) 100%)',
            border: '1px solid rgba(74,144,217,0.25)',
            borderRadius: '14px',
            cursor: 'pointer',
            marginBottom: '12px',
            WebkitTapHighlightColor: 'transparent',
            transition: 'all 150ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(74,144,217,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(74,144,217,0.25)')}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(74,144,217,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            flexShrink: 0,
          }}>
            📚
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
              All Lessons
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Structured learning path for blues guitar
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4L11 9L6 14" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Blues tips card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-gold-dim) 0%, var(--bg-card) 60%)',
          border: '1px solid rgba(212,168,67,0.2)',
          borderRadius: '14px',
          padding: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '16px' }}>💡</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-gold)' }}>Tip of the Day</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The pentatonic minor scale is the backbone of blues. Master Position 1 in the key of A before moving to other positions or keys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
