import React, { useState, useEffect, useCallback } from 'react';
import ChordDiagram from '../components/ChordDiagram';
import Fretboard from '../components/Fretboard';
import type { LessonModule, LessonStep, Chord, Scale } from '../data/types';

interface LessonDetailPageProps {
  lesson: LessonModule;
  chordMap: Record<string, Chord>;
  scaleMap: Record<string, Scale>;
  onBack: () => void;
}

const saveProgress = (lessonId: string, total: number) => {
  try {
    const raw = localStorage.getItem('blues_guitar_progress');
    const parsed = raw ? JSON.parse(raw) : { completed: [], total };
    const completed: string[] = Array.isArray(parsed.completed) ? parsed.completed : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
    }
    localStorage.setItem('blues_guitar_progress', JSON.stringify({
      completed,
      total: Math.max(total, parsed.total || 0),
    }));
    // Dispatch events for sibling components
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('lessonCompleted'));
  } catch {
    // ignore
  }
};

const isLessonComplete = (lessonId: string): boolean => {
  try {
    const raw = localStorage.getItem('blues_guitar_progress');
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed.completed) && parsed.completed.includes(lessonId);
    }
  } catch {
    // ignore
  }
  return false;
};

const DIFFICULTY_COLORS = {
  beginner: '#2ecc71',
  intermediate: '#d4a843',
  advanced: '#e74c3c',
};

interface StepContentProps {
  step: LessonStep;
  chordMap: Record<string, Chord>;
  scaleMap: Record<string, Scale>;
}

const StepContent: React.FC<StepContentProps> = ({ step, chordMap, scaleMap }) => {
  const ref = step.contentRef;

  const renderDiagram = () => {
    if (!ref) return null;

    if (ref.type === 'chord') {
      const chord = chordMap[ref.id];
      if (!chord) return null;
      return (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            background: 'var(--overlay-dim)',
            border: '1px solid rgba(74,144,217,0.2)',
            borderRadius: '12px',
            padding: '16px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
              Chord: {chord.name}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <ChordDiagram chord={chord} size="md" />
            </div>
            <Fretboard
              highlights={chord.positions}
              barres={chord.barres}
              mutedStrings={chord.mutedStrings}
              startFret={0}
              endFret={Math.max(5, ...chord.positions.map(p => p.fret)) + 1}
            />
          </div>
        </div>
      );
    }

    if (ref.type === 'scale') {
      const scale = scaleMap[ref.id];
      if (!scale) return null;
      const positionNumber = ref.positionNumber ?? 1;
      const position = scale.positions.find(p => p.positionNumber === positionNumber);
      return (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            background: 'var(--overlay-dim)',
            border: '1px solid rgba(74,144,217,0.2)',
            borderRadius: '12px',
            padding: '16px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
              Scale: {scale.name} {position ? `— ${position.label}` : ''}
            </p>
            <Fretboard
              highlights={position ? position.notes.map(n => ({
                string: n.string,
                fret: n.fret,
                finger: n.finger,
                isRoot: n.isRoot,
              })) : []}
              startFret={position ? Math.max(0, Math.min(...position.notes.map(n => n.fret)) - 1) : 0}
              endFret={position ? Math.max(...position.notes.map(n => n.fret)) + 1 : 15}
            />
          </div>
        </div>
      );
    }

    if (ref.type === 'progression') {
      const chords = ref.chordIds.map(id => chordMap[id]).filter(Boolean) as Chord[];
      if (chords.length === 0) return null;
      return (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            background: 'var(--overlay-dim)',
            border: '1px solid rgba(74,144,217,0.2)',
            borderRadius: '12px',
            padding: '16px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '12px' }}>
              Progression — {chords.map(c => c.name).join(' → ')}
            </p>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {chords.map((chord, i) => (
                <div key={i} style={{ flexShrink: 0, textAlign: 'center' }}>
                  <ChordDiagram chord={chord} size="sm" />
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{chord.name}</p>
                  {ref.beatsEach && (
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{ref.beatsEach} beats</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ animation: 'page-enter 200ms ease forwards' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.2 }}>
        {step.title}
      </h2>

      {/* Explanation */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '14px 16px',
        marginBottom: '16px',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
          {step.explanation}
        </p>
      </div>

      {/* Diagram */}
      {renderDiagram()}

      {/* Tips */}
      {step.tips.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(212,168,67,0.08) 0%, var(--bg-card) 60%)',
          border: '1px solid rgba(212,168,67,0.2)',
          borderRadius: '12px',
          padding: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px' }}>💡</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-gold)' }}>Tips</span>
          </div>
          <ul style={{ paddingLeft: '4px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {step.tips.map((tip, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-gold)', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LessonDetailPage: React.FC<LessonDetailPageProps> = ({ lesson, chordMap, scaleMap, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [markedComplete, setMarkedComplete] = useState(false);

  const steps = lesson.steps;
  const totalSteps = steps.length;
  const step = steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const progressPct = totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;
  const diffColor = DIFFICULTY_COLORS[lesson.difficulty];

  useEffect(() => {
    setCurrentStep(0);
    setMarkedComplete(isLessonComplete(lesson.id));
  }, [lesson.id]);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleMarkComplete = useCallback(() => {
    saveProgress(lesson.id, lesson.steps.length);
    setMarkedComplete(true);
  }, [lesson]);

  return (
    <div className="page" style={{ paddingBottom: '100px' }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          fontWeight: 600,
          padding: '0',
          marginBottom: '16px',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Lessons
      </button>

      {/* Lesson header */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '16px',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '10px',
                background: diffColor + '20',
                color: diffColor,
                textTransform: 'capitalize',
                letterSpacing: '0.5px',
              }}>
                {lesson.difficulty}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                ~{lesson.estimatedMinutes} min
              </span>
              {markedComplete && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: 'rgba(46,204,113,0.15)',
                  color: '#2ecc71',
                  border: '1px solid rgba(46,204,113,0.3)',
                }}>
                  ✓ Complete
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.2 }}>{lesson.title}</h1>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {lesson.description}
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#4a90d9' }}>
            {progressPct}%
          </span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px', justifyContent: 'center' }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              style={{
                width: i === currentStep ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i < currentStep ? 'var(--accent-blue)' : i === currentStep ? 'var(--accent-blue)' : 'var(--overlay-hover)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                opacity: i > currentStep ? 0.4 : 1,
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      {step && (
        <StepContent step={step} chordMap={chordMap} scaleMap={scaleMap} />
      )}

      {/* Navigation buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginTop: '24px',
        position: 'sticky',
        bottom: 'calc(var(--nav-height) + env(safe-area-inset-bottom, 0px) + 8px)',
      }}>
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentStep === 0}
          style={{
            flex: 1,
            opacity: currentStep === 0 ? 0.4 : 1,
            pointerEvents: currentStep === 0 ? 'none' : 'auto',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        {!isLastStep ? (
          <button className="btn btn-primary" onClick={handleNext} style={{ flex: 2 }}>
            Next Step
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <button
            className={`btn ${markedComplete ? 'btn-secondary' : 'btn-gold'}`}
            onClick={!markedComplete ? handleMarkComplete : undefined}
            style={{
              flex: 2,
              cursor: markedComplete ? 'default' : 'pointer',
            }}
          >
            {markedComplete ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Completed!
              </>
            ) : (
              <>
                Mark Complete
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {/* Completion celebration */}
      {isLastStep && markedComplete && (
        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(212,168,67,0.12) 0%, var(--bg-card) 100%)',
          border: '1px solid rgba(212,168,67,0.25)',
          borderRadius: '14px',
          animation: 'page-enter 300ms ease forwards',
        }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🎸</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '6px' }}>
            Lesson Complete!
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Great work! Keep practicing what you learned and move on to the next lesson when you're ready.
          </p>
          <button
            className="btn btn-secondary"
            onClick={onBack}
            style={{ marginTop: '14px', width: '100%' }}
          >
            Back to Lessons
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonDetailPage;
