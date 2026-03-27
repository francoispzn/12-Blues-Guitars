import React from 'react';
import type { FretPosition, BarreInfo } from '../data/types';

// ─── Color palette ────────────────────────────────────────────────────────────
const COLORS = {
  background: 'var(--bg-secondary)',
  fretboard: 'var(--fb-wood)',
  fretboardLight: 'var(--fb-wood-light)',
  fret: 'var(--fb-fret)',
  string: 'var(--fb-string)',
  stringDark: 'var(--fb-string-dark)',
  fingerDot: 'var(--accent-blue)',
  rootDot: 'var(--accent-red)',
  text: 'var(--text-primary)',
  textMuted: 'var(--text-muted)',
  muteX: 'var(--accent-red)',
  openO: 'var(--accent-blue)',
  barreColor: 'var(--fb-barre)',
  barreBorder: 'var(--fb-barre-border)',
};

// ─── Size presets ─────────────────────────────────────────────────────────────
type Size = 'sm' | 'md' | 'lg';

const SIZE_CONFIG: Record<Size, { fretH: number; stringW: number; dotR: number; fontSize: number; titleSize: number }> = {
  sm: { fretH: 18, stringW: 18, dotR: 6,  fontSize: 8,  titleSize: 10 },
  md: { fretH: 26, stringW: 26, dotR: 9,  fontSize: 11, titleSize: 13 },
  lg: { fretH: 36, stringW: 36, dotR: 12, fontSize: 13, titleSize: 16 },
};

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ChordDiagramProps {
  chord: {
    name: string;
    positions: FretPosition[];
    barres?: BarreInfo[];
    mutedStrings?: number[];
  };
  size?: Size;
}

// ─── Component ────────────────────────────────────────────────────────────────
const ChordDiagram: React.FC<ChordDiagramProps> = ({ chord, size = 'md' }) => {
  const cfg = SIZE_CONFIG[size];
  const NUM_STRINGS = 6;
  const NUM_FRETS_SHOWN = 4; // classic chord box shows 4 fret rows

  const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'e'];

  // Determine which fret window to show
  const nonOpenFrets = chord.positions
    .filter((p) => p.fret > 0)
    .map((p) => p.fret);
  const minFret = nonOpenFrets.length > 0 ? Math.min(...nonOpenFrets) : 1;
  const startFret = minFret === 1 ? 1 : minFret;
  const showNut = startFret === 1;

  // ─── Layout ─────────────────────────────────────────────────────────────────
  const OVERHEAD = cfg.fretH * 1.4; // room for mute/open markers and string names
  const LEFT_PAD = cfg.stringW * 1.2; // room for fret number label if needed
  const RIGHT_PAD = 4;
  const TOP_PAD = cfg.fretH * 1.8; // title
  const BOTTOM_PAD = 6;

  const boardW = (NUM_STRINGS - 1) * cfg.stringW;
  const boardH = NUM_FRETS_SHOWN * cfg.fretH;

  const boardX = LEFT_PAD;
  const boardY = TOP_PAD + OVERHEAD;

  const SVG_W = LEFT_PAD + boardW + RIGHT_PAD;
  const SVG_H = TOP_PAD + OVERHEAD + boardH + BOTTOM_PAD;

  // x center of string column (str 0 = low E = left)
  const strX = (str: number) => boardX + str * cfg.stringW;

  // y center of fret row (1 = first fret row, etc. relative to startFret)
  // We draw: fret startFret at row 1, startFret+1 at row 2, etc.
  const fretY = (fret: number) => boardY + (fret - startFret) * cfg.fretH + cfg.fretH / 2;

  const mutedSet = new Set(chord.mutedStrings ?? []);
  const openStrings = new Set(
    chord.positions.filter((p) => p.fret === 0).map((p) => p.string)
  );

  // ─── Board background ────────────────────────────────────────────────────────
  const renderBoard = () => (
    <>
      <defs>
        <linearGradient id={`cd-wood-${chord.name}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: COLORS.fretboardLight }} />
          <stop offset="100%" style={{ stopColor: COLORS.fretboard }} />
        </linearGradient>
        <filter id={`cd-shadow-${chord.name}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
        </filter>
        <filter id={`cd-root-glow-${chord.name}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Board fill */}
      <rect
        x={boardX}
        y={boardY}
        width={boardW}
        height={boardH}
        fill={COLORS.fretboard}
        rx={2}
      />
      {/* Nut */}
      {showNut && (
        <rect
          x={boardX}
          y={boardY - 4}
          width={boardW}
          height={5}
          fill={COLORS.fret}
          rx={1}
        />
      )}
    </>
  );

  // ─── Fret wires ──────────────────────────────────────────────────────────────
  const renderFrets = () => {
    const wires = [];
    for (let row = 0; row <= NUM_FRETS_SHOWN; row++) {
      const y = boardY + row * cfg.fretH;
      wires.push(
        <line
          key={`cd-fret-${row}`}
          x1={boardX}
          y1={y}
          x2={boardX + boardW}
          y2={y}
          stroke={COLORS.fret}
          strokeWidth={row === 0 && showNut ? 3.5 : 1.5}
        />
      );
    }
    return wires;
  };

  // ─── Strings (vertical lines) ────────────────────────────────────────────────
  const renderStrings = () => {
    const lines = [];
    for (let s = 0; s < NUM_STRINGS; s++) {
      const x = strX(s);
      // Thickness: low E thickest
      const thickness = 1 + ((NUM_STRINGS - 1 - s) / (NUM_STRINGS - 1)) * 1.8;
      lines.push(
        <line
          key={`cd-str-${s}`}
          x1={x}
          y1={boardY}
          x2={x}
          y2={boardY + boardH}
          stroke={COLORS.string}
          strokeWidth={thickness}
        />
      );
    }
    return lines;
  };

  // ─── Barre bars ──────────────────────────────────────────────────────────────
  const renderBarres = () =>
    (chord.barres ?? []).map((barre, i) => {
      if (barre.fret < startFret || barre.fret >= startFret + NUM_FRETS_SHOWN) return null;
      const x1 = strX(barre.fromString);
      const x2 = strX(barre.toString);
      const cy = fretY(barre.fret);
      const ry = cfg.dotR;
      return (
        <rect
          key={`cd-barre-${i}`}
          x={x1 - ry}
          y={cy - ry}
          width={x2 - x1 + ry * 2}
          height={ry * 2}
          fill={COLORS.barreColor}
          stroke={COLORS.barreBorder}
          strokeWidth={1.5}
          rx={ry}
          ry={ry}
          filter={`url(#cd-shadow-${chord.name})`}
        />
      );
    });

  // ─── Finger dots ─────────────────────────────────────────────────────────────
  const renderDots = () =>
    chord.positions
      .filter((p) => p.fret >= startFret && p.fret < startFret + NUM_FRETS_SHOWN)
      .map((p, i) => {
        const cx = strX(p.string);
        const cy = fretY(p.fret);
        const r = p.isRoot ? cfg.dotR + 2 : cfg.dotR;
        const fill = p.isRoot ? COLORS.rootDot : COLORS.fingerDot;
        const label = p.label ?? (p.finger ? String(p.finger) : '');

        return (
          <g key={`cd-dot-${i}`} filter={p.isRoot ? `url(#cd-root-glow-${chord.name})` : `url(#cd-shadow-${chord.name})`}>
            {p.isRoot && (
              <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke={COLORS.rootDot} strokeWidth={1.5} opacity={0.5} />
            )}
            <circle cx={cx} cy={cy} r={r} fill={fill} />
            {label && (
              <text
                x={cx}
                y={cy + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={cfg.fontSize}
                fontWeight="700"
                fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
                fill="#fff"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {label}
              </text>
            )}
          </g>
        );
      });

  // ─── Overhead markers (mute X / open O) ─────────────────────────────────────
  const renderOverhead = () => {
    const markers = [];
    for (let s = 0; s < NUM_STRINGS; s++) {
      const cx = strX(s);
      const oy = boardY - cfg.fretH * 0.6;
      const nameY = boardY - cfg.fretH * 0.6 - cfg.fontSize * 1.4;

      // String name
      markers.push(
        <text
          key={`cd-name-${s}`}
          x={cx}
          y={nameY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={cfg.fontSize - 1}
          fill={COLORS.textMuted}
          fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
        >
          {STRING_NAMES[s]}
        </text>
      );

      if (mutedSet.has(s)) {
        const arm = cfg.fontSize * 0.65;
        markers.push(
          <g key={`cd-mute-${s}`}>
            <line x1={cx - arm} y1={oy - arm} x2={cx + arm} y2={oy + arm} stroke={COLORS.muteX} strokeWidth={2} strokeLinecap="round" />
            <line x1={cx + arm} y1={oy - arm} x2={cx - arm} y2={oy + arm} stroke={COLORS.muteX} strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      } else if (openStrings.has(s)) {
        markers.push(
          <circle key={`cd-open-${s}`} cx={cx} cy={oy} r={cfg.fontSize * 0.6} fill="none" stroke={COLORS.openO} strokeWidth={1.8} />
        );
      }
    }
    return markers;
  };

  // ─── Fret position label (e.g. "5fr") ────────────────────────────────────────
  const renderFretLabel = () => {
    if (startFret <= 1) return null;
    return (
      <text
        x={boardX - 4}
        y={boardY + cfg.fretH / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={cfg.fontSize}
        fill={COLORS.fret}
        fontWeight="600"
        fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
      >
        {startFret}fr
      </text>
    );
  };

  // ─── Chord name title ─────────────────────────────────────────────────────────
  const renderTitle = () => (
    <text
      x={boardX + boardW / 2}
      y={TOP_PAD / 2 + 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={cfg.titleSize}
      fontWeight="700"
      fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
      fill={COLORS.text}
    >
      {chord.name}
    </text>
  );

  // ─── Outer wrapper ────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: 'inline-block',
        background: COLORS.background,
        borderRadius: 12,
        padding: '6px 8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        verticalAlign: 'top',
      }}
      aria-label={`Chord diagram for ${chord.name}`}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {renderTitle()}
        {renderBoard()}
        {renderFrets()}
        {renderStrings()}
        {renderBarres()}
        {renderDots()}
        {renderOverhead()}
        {renderFretLabel()}
      </svg>
    </div>
  );
};

export default ChordDiagram;
