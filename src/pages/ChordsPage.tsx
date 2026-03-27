import React, { useState } from 'react';
import { ALL_CHORDS } from '../data/chords';
import ChordDiagram from '../components/ChordDiagram';
import Fretboard from '../components/Fretboard';
import type { Chord, ChordVoicing } from '../data/types';
import { audioEngine } from '../services/audioEngine';
import { getMidiNote } from '../data/notes';

type FilterOption = 'all' | ChordVoicing;

const FILTER_OPTIONS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'barre', label: 'Barre' },
  { id: 'partial', label: 'Partial' },
];

const TYPE_LABELS: Record<string, string> = {
  major: 'Major',
  minor: 'Minor',
  dominant7: '7th',
  minor7: 'm7',
  major7: 'maj7',
  power: 'Power',
};

const TYPE_COLORS: Record<string, string> = {
  major: '#4a90d9',
  minor: '#9b59b6',
  dominant7: '#d4a843',
  minor7: '#e67e22',
  major7: '#2ecc71',
  power: '#e74c3c',
};

const ChordCard: React.FC<{
  chord: Chord;
  isExpanded: boolean;
  onClick: () => void;
}> = ({ chord, isExpanded, onClick }) => {
  const typeColor = TYPE_COLORS[chord.type] ?? '#4a90d9';
  const typeLabel = TYPE_LABELS[chord.type] ?? chord.type;

  return (
    <div
      className="card"
      style={{
        border: isExpanded ? `1px solid ${typeColor}55` : '1px solid var(--border-subtle)',
        transition: 'all 200ms ease',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {/* Card header */}
      <div style={{ padding: '14px 14px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h3 style={{
              fontSize: '17px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '4px',
            }}>
              {chord.name}
            </h3>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '10px',
                background: typeColor + '20',
                color: typeColor,
                border: `1px solid ${typeColor}40`,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {typeLabel}
              </span>
              <span style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                textTransform: 'capitalize',
              }}>
                {chord.voicing}
              </span>
            </div>
          </div>
          {/* Expand arrow */}
          <span style={{
            color: 'var(--text-muted)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
            marginTop: '2px',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Mini chord diagram */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ChordDiagram chord={chord} size="sm" />
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            borderTop: `1px solid ${typeColor}25`,
            padding: '14px',
            background: 'var(--overlay-dim)',
            animation: 'page-enter 200ms ease forwards',
          }}
        >
          {/* Play chord button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const midiNotes = chord.positions
                .slice()
                .sort((a, b) => a.string - b.string)
                .map(p => getMidiNote(p.string as 0|1|2|3|4|5, p.fret));
              audioEngine.playChord(midiNotes);
            }}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '12px',
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
            Play Chord
          </button>

          {/* Full fretboard */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Full View
            </p>
            <Fretboard
                  highlights={chord.positions}
                  barres={chord.barres}
                  mutedStrings={chord.mutedStrings}
                  startFret={0}
                  endFret={Math.max(5, ...chord.positions.map(p => p.fret)) + 1}
                  onFretClick={(s, f) => audioEngine.playNote(getMidiNote(s as 0|1|2|3|4|5, f))}
                />
          </div>

          {/* Description */}
          {chord.description && (
            <div style={{
              background: 'var(--overlay-subtle)',
              borderRadius: '8px',
              padding: '10px 12px',
              borderLeft: `3px solid ${typeColor}`,
            }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {chord.description}
              </p>
            </div>
          )}

          {/* Finger positions */}
          {chord.positions.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Finger Positions
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {chord.positions.map((pos, i) => (
                  <div key={i} style={{
                    background: 'var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                  }}>
                    String {pos.string + 1} • Fret {pos.fret} • Finger {pos.finger}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ChordsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const chords: Chord[] = Object.values(ALL_CHORDS ?? {});

  const filtered = filter === 'all'
    ? chords
    : chords.filter(c => c.voicing === filter);

  // Determine which filter tabs to show (only those with chords)
  const availableFilters = FILTER_OPTIONS.filter(opt => {
    if (opt.id === 'all') return true;
    return chords.some(c => c.voicing === opt.id);
  });

  const handleCardClick = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Chords</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Essential blues chord shapes — tap to expand
        </p>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {availableFilters.map(({ id, label }) => (
          <button
            key={id}
            className={`filter-tab ${filter === id ? 'active' : ''}`}
            onClick={() => {
              setFilter(id);
              setExpandedId(null);
            }}
          >
            {label}
            {id !== 'all' && (
              <span style={{
                marginLeft: '4px',
                fontSize: '11px',
                opacity: 0.7,
              }}>
                ({chords.filter(c => c.voicing === id).length})
              </span>
            )}
            {id === 'all' && (
              <span style={{ marginLeft: '4px', fontSize: '11px', opacity: 0.7 }}>
                ({chords.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Chord grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 20px',
          color: 'var(--text-muted)',
          fontSize: '14px',
        }}>
          No chords found for this filter.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: expandedId ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px',
          transition: 'grid-template-columns 200ms ease',
        }}>
          {filtered.map(chord => (
            <ChordCard
              key={chord.id}
              chord={chord}
              isExpanded={expandedId === chord.id}
              onClick={() => handleCardClick(chord.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChordsPage;
