import React, { useEffect, useState } from 'react';
import type { LessonModule, Difficulty } from '../data/types';

// We import lessons lazily via a typed interface to avoid a hard dependency
// The actual data will come from the App which passes it through, or we do a
// dynamic import. For now, we accept lessons as a prop for maximum flexibility.

interface LessonsPageProps {
  lessons: LessonModule[];
  onSelectLesson: (lessonId: string) => void;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; badge: string }> = {
  beginner: { label: 'Beginner', color: '#2ecc71', badge: 'badge-beginner' },
  intermediate: { label: 'Intermediate', color: '#d4a843', badge: 'badge-intermediate' },
  advanced: { label: 'Advanced', color: '#e74c3c', badge: 'badge-advanced' },
};

const getCompletedLessons = (): string[] => {
  try {
    const raw = localStorage.getItem('blues_guitar_progress');
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed.completed) ? parsed.completed : [];
    }
  } catch {
    // ignore
  }
  return [];
};

const ClockIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill="#2ecc71" fillOpacity="0.2" />
    <path d="M4 7L6 9L10 5" stroke="#2ecc71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="#a0a0b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LessonsPage: React.FC<LessonsPageProps> = ({ lessons, onSelectLesson }) => {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompletedLessons());
    const handler = () => setCompleted(getCompletedLessons());
    window.addEventListener('storage', handler);
    // Also listen for custom events fired by LessonDetailPage
    window.addEventListener('lessonCompleted', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('lessonCompleted', handler);
    };
  }, []);

  const completedCount = completed.length;
  const totalCount = lessons.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const sorted = [...lessons].sort((a, b) => a.moduleNumber - b.moduleNumber);

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Lessons</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Your structured path to blues mastery
        </p>
      </div>

      {/* Overall progress */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(74,144,217,0.2)',
        borderRadius: '14px',
        padding: '16px',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>
              Overall Progress
            </p>
            <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {completedCount}
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {' '}/ {totalCount} lessons done
              </span>
            </p>
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#4a90d9',
          }}>
            {progressPct}%
          </div>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Lesson list */}
      {sorted.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-muted)',
          fontSize: '14px',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
          <p>No lessons available yet.</p>
          <p style={{ fontSize: '12px', marginTop: '6px' }}>Check back soon!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sorted.map((lesson, index) => {
            const isDone = completed.includes(lesson.id);
            const diff = DIFFICULTY_CONFIG[lesson.difficulty];
            const isLocked = false; // future: sequential locking

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && onSelectLesson(lesson.id)}
                style={{
                  width: '100%',
                  background: isDone
                    ? 'linear-gradient(135deg, rgba(46,204,113,0.05) 0%, var(--bg-card) 60%)'
                    : 'var(--bg-card)',
                  border: `1px solid ${isDone ? 'rgba(46,204,113,0.2)' : 'var(--border-subtle)'}`,
                  borderRadius: '14px',
                  padding: '0',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isLocked ? 0.5 : 1,
                  textAlign: 'left',
                  transition: 'all 150ms ease',
                  overflow: 'hidden',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isLocked) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = isDone ? 'rgba(46,204,113,0.35)' : 'rgba(74,144,217,0.3)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = isDone ? 'rgba(46,204,113,0.2)' : 'var(--border-subtle)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Completion stripe */}
                {isDone && (
                  <div style={{
                    height: '3px',
                    background: 'linear-gradient(90deg, #2ecc71, rgba(46,204,113,0.3))',
                  }} />
                )}

                <div style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {/* Module number badge */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: isDone ? 'rgba(46,204,113,0.15)' : 'rgba(74,144,217,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '14px',
                    fontWeight: 800,
                    color: isDone ? '#2ecc71' : '#4a90d9',
                  }}>
                    {isDone ? <CheckIcon /> : index + 1}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                        flex: 1,
                        paddingRight: '8px',
                      }}>
                        {lesson.title}
                      </h3>
                      <ChevronIcon />
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      marginBottom: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {lesson.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className={`badge ${diff.badge}`}>{diff.label}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <ClockIcon />
                        {lesson.estimatedMinutes} min
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {lesson.steps.length} steps
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Footer tip */}
      {totalCount > 0 && completedCount < totalCount && (
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '16px',
          background: 'rgba(74,144,217,0.06)',
          border: '1px solid rgba(74,144,217,0.12)',
          borderRadius: '12px',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {completedCount === 0
              ? '🎸 Start with Module 1 and work your way through!'
              : `🎯 ${totalCount - completedCount} lesson${totalCount - completedCount > 1 ? 's' : ''} to go — you\'ve got this!`}
          </p>
        </div>
      )}
      {completedCount === totalCount && totalCount > 0 && (
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '16px',
          background: 'rgba(212,168,67,0.08)',
          border: '1px solid rgba(212,168,67,0.2)',
          borderRadius: '12px',
        }}>
          <p style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '4px' }}>
            Course Complete!
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            You've completed all lessons. Now go play some blues!
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
