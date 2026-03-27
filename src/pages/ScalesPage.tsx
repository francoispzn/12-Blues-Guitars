import React, { useState, useMemo } from 'react';
import { ALL_SCALES } from '../data/scales';
import Fretboard from '../components/Fretboard';
import type { Scale, ScaleType, ChromaticNote, ScalePosition } from '../data/types';
import { audioEngine } from '../services/audioEngine';
import { getMidiNote } from '../data/notes';

type ScaleTypeOption = Extract<ScaleType, 'minor_pentatonic' | 'blues'>;
type KeyOption = Extract<ChromaticNote, 'A' | 'E'>;

const SCALE_TYPE_OPTIONS: { id: ScaleTypeOption; label: string; description: string }[] = [
  {
    id: 'minor_pentatonic',
    label: 'Minor Pentatonic',
    description: '5-note scale: the core of blues soloing',
  },
  {
    id: 'blues',
    label: 'Blues Scale',
    description: 'Pentatonic + the ♭5 "blue note" for extra grit',
  },
];

const KEY_OPTIONS: { id: KeyOption; label: string }[] = [
  { id: 'A', label: 'A' },
  { id: 'E', label: 'E' },
];

const SCALE_TIPS: Record<ScaleTypeOption, string[]> = {
  minor_pentatonic: [
    'Start with Position 1 (Box 1) — it\'s the most used in blues.',
    'Practice ascending and descending slowly before adding bends.',
    'In the key of A, Position 1 starts around fret 5.',
    'Connect adjacent positions to move freely across the neck.',
  ],
  blues: [
    'The blue note (♭5) is what makes blues sound distinctively bluesy.',
    'Use the blue note as a passing tone — slide through it, don\'t land on it.',
    'Practice bending up to the blue note for expressive phrasing.',
    'Master the pentatonic boxes before adding the blue note.',
  ],
};

interface SelectorButtonProps {
  label: string;
  sublabel?: string;
  isActive: boolean;
  accentColor: string;
  onClick: () => void;
}

const SelectorButton: React.FC<SelectorButtonProps> = ({ label, sublabel, isActive, accentColor, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: '12px 8px',
      background: isActive ? accentColor + '20' : 'var(--bg-card)',
      border: `1px solid ${isActive ? accentColor + '60' : 'var(--border-subtle)'}`,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    <div style={{
      fontSize: '13px',
      fontWeight: 700,
      color: isActive ? accentColor : 'var(--text-secondary)',
      marginBottom: sublabel ? '2px' : 0,
    }}>
      {label}
    </div>
    {sublabel && (
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
        {sublabel}
      </div>
    )}
  </button>
);

const PositionDot: React.FC<{ number: number; isActive: boolean; onClick: () => void }> = ({ number, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: isActive ? 'var(--accent-blue)' : 'var(--bg-card)',
      border: `2px solid ${isActive ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
      color: isActive ? '#fff' : 'var(--text-secondary)',
      fontSize: '14px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 150ms ease',
      WebkitTapHighlightColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {number}
  </button>
);

const ScalesPage: React.FC = () => {
  const [scaleType, setScaleType] = useState<ScaleTypeOption>('minor_pentatonic');
  const [key, setKey] = useState<KeyOption>('A');
  const [position, setPosition] = useState<number>(1);

  const scales: Scale[] = Object.values(ALL_SCALES ?? {});

  // Find the matching scale
  const selectedScale = useMemo<Scale | undefined>(() => {
    return scales.find(s => s.type === scaleType && s.key === key);
  }, [scales, scaleType, key]);

  // Get available positions
  const availablePositions = useMemo<ScalePosition[]>(() => {
    return selectedScale?.positions ?? [];
  }, [selectedScale]);

  const maxPosition = availablePositions.length;

  // Clamp position when scale changes
  const safePosition = Math.min(position, maxPosition || 1);
  const selectedPosition = availablePositions.find(p => p.positionNumber === safePosition);

  const tips = SCALE_TIPS[scaleType];

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Scales</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Explore blues scale positions across the neck
        </p>
      </div>

      {/* Scale type selector */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
          Scale Type
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {SCALE_TYPE_OPTIONS.map(opt => (
            <SelectorButton
              key={opt.id}
              label={opt.label}
              sublabel={opt.description}
              isActive={scaleType === opt.id}
              accentColor="#4a90d9"
              onClick={() => {
                setScaleType(opt.id);
                setPosition(1);
              }}
            />
          ))}
        </div>
      </div>

      {/* Key selector */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
          Key
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {KEY_OPTIONS.map(opt => (
            <SelectorButton
              key={opt.id}
              label={`Key of ${opt.label}`}
              isActive={key === opt.id}
              accentColor="#d4a843"
              onClick={() => {
                setKey(opt.id);
                setPosition(1);
              }}
            />
          ))}
        </div>
      </div>

      {/* Position selector */}
      {maxPosition > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>
            Position / Box
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
            {availablePositions.map(p => (
              <PositionDot
                key={p.positionNumber}
                number={p.positionNumber}
                isActive={safePosition === p.positionNumber}
                onClick={() => setPosition(p.positionNumber)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scale info card */}
      {selectedScale && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(74,144,217,0.2)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                {selectedScale.name}
              </h3>
              {selectedPosition && (
                <p style={{ fontSize: '12px', color: 'var(--accent-blue)' }}>
                  {selectedPosition.label}
                </p>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>Formula</p>
              <code style={{
                fontSize: '12px',
                color: 'var(--accent-gold)',
                background: 'rgba(212,168,67,0.1)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'ui-monospace, Consolas, monospace',
              }}>
                {selectedScale.formula}
              </code>
            </div>
          </div>

          {/* Notes in scale */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
            {selectedScale.notes.map((note, i) => (
              <span key={i} style={{
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                background: note === selectedScale.key ? 'rgba(74,144,217,0.3)' : 'var(--border-subtle)',
                color: note === selectedScale.key ? '#4a90d9' : 'var(--text-secondary)',
                border: `1px solid ${note === selectedScale.key ? 'rgba(74,144,217,0.4)' : 'transparent'}`,
              }}>
                {note}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {selectedScale.description}
          </p>
        </div>
      )}

      {/* Fretboard display */}
      {selectedScale && selectedPosition ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          overflowX: 'auto',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '12px' }}>
            Fretboard — {selectedPosition.label}
          </p>
          <Fretboard
            highlights={selectedPosition.notes.map(n => ({
              string: n.string,
              fret: n.fret,
              finger: n.finger,
              isRoot: n.isRoot,
            }))}
            startFret={Math.max(0, Math.min(...selectedPosition.notes.map(n => n.fret)) - 1)}
            endFret={Math.max(...selectedPosition.notes.map(n => n.fret)) + 1}
            onFretClick={(s, f) => audioEngine.playNote(getMidiNote(s as 0|1|2|3|4|5, f))}
          />
          <button
            onClick={() => {
              const midiNotes = selectedPosition.notes
                .slice()
                .sort((a, b) => {
                  if (a.string !== b.string) return a.string - b.string;
                  return a.fret - b.fret;
                })
                .map(n => getMidiNote(n.string as 0|1|2|3|4|5, n.fret));
              audioEngine.playScale(midiNotes);
            }}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '10px',
              background: 'var(--accent-blue-dim)',
              border: '1px solid var(--accent-blue-border)',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--accent-blue)',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'inherit',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>
            Play Scale
          </button>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--text-muted)',
          fontSize: '14px',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          marginBottom: '16px',
        }}>
          No scale data available for this combination.
        </div>
      )}

      {/* Finger guide legend */}
      {selectedPosition && selectedPosition.notes.length > 0 && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '16px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>
            Legend
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4a90d9' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Scale note</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#e74c3c' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Root note</span>
            </div>
            {scaleType === 'blues' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d4a843', border: '2px solid #d4a843' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Blue note (♭5)</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
            {[1, 2, 3, 4].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--overlay-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>
                  {f}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {f === 1 ? 'Index' : f === 2 ? 'Middle' : f === 3 ? 'Ring' : 'Pinky'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212,168,67,0.08) 0%, var(--bg-card) 60%)',
        border: '1px solid rgba(212,168,67,0.2)',
        borderRadius: '12px',
        padding: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px' }}>💡</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-gold)' }}>Practice Tips</span>
        </div>
        <ul style={{ paddingLeft: '4px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tips.map((tip, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>▸</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScalesPage;
