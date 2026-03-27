import React, { useState, useCallback, useMemo } from 'react';
import type { FretPosition, BarreInfo } from '../data/types';

// ─── Color palette ────────────────────────────────────────────────────────────
const COLORS = {
  background: 'var(--bg-secondary)',
  fretboard: 'var(--fb-wood)',
  fretboardLight: 'var(--fb-wood-light)',
  string: 'var(--fb-string)',
  stringDark: 'var(--fb-string-dark)',
  fret: 'var(--fb-fret)',
  fretGlow: 'var(--fb-fret-glow)',
  fingerDot: 'var(--accent-blue)',
  fingerDotHover: 'var(--fb-dot-hover)',
  rootDot: 'var(--accent-red)',
  rootDotHover: 'var(--fb-root-hover)',
  text: 'var(--text-primary)',
  textMuted: 'var(--text-muted)',
  markerDot: 'var(--fb-marker)',
  markerDotBright: 'var(--fb-marker-bright)',
  muteX: 'var(--accent-red)',
  openO: 'var(--accent-blue)',
  barreColor: 'var(--fb-barre)',
  barreBorder: 'var(--fb-barre-border)',
  hoverHighlight: 'var(--fb-hover)',
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'e'];
const FRET_MARKER_SINGLE = [3, 5, 7, 9, 15];
const FRET_MARKER_DOUBLE = [12];

// ─── Props ────────────────────────────────────────────────────────────────────
export interface FretboardProps {
  highlights?: FretPosition[];
  mutedStrings?: number[];
  barres?: BarreInfo[];
  startFret?: number;
  endFret?: number;
  onFretClick?: (string: number, fret: number) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
const Fretboard: React.FC<FretboardProps> = ({
  highlights = [],
  mutedStrings = [],
  barres = [],
  startFret = 0,
  endFret = 15,
  onFretClick,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ string: number; fret: number } | null>(null);

  // ─── Derived geometry ───────────────────────────────────────────────────────
  const numStrings = 6;
  const numFrets = endFret - startFret + 1; // number of fret columns visible (including nut / open col)

  // SVG viewport – we use a fixed logical size and let CSS scale it
  const LABEL_W = 28;       // string name label area on the left
  const NUT_EXTRA = startFret === 0 ? 6 : 0; // extra thickness for nut
  const TOP_OVERHEAD = 36;  // room for open/mute markers
  const BOTTOM_LABEL = 28;  // fret numbers below
  const SIDE_PAD = 10;

  const CELL_W = 56;        // width per fret column (including open column)
  const CELL_H = 48;        // height per string row

  const BOARD_W = numFrets * CELL_W;
  const BOARD_H = (numStrings - 1) * CELL_H;

  const SVG_W = LABEL_W + SIDE_PAD + BOARD_W + SIDE_PAD;
  const SVG_H = TOP_OVERHEAD + BOARD_H + BOTTOM_LABEL;

  const boardX = LABEL_W + SIDE_PAD;
  const boardY = TOP_OVERHEAD;

  // Helper: get x-center of a fret column (0 = open/nut, 1 = first fret, etc.)
  const fretX = useCallback(
    (fret: number) => boardX + (fret - startFret) * CELL_W + CELL_W / 2,
    [boardX, startFret]
  );

  // Helper: get y-center of a string row (0 = low E at bottom visually, but drawn top→bottom as 5→0)
  // Visual order: string 5 (high e) at top row, string 0 (low E) at bottom row
  const stringY = useCallback(
    (str: number) => boardY + (5 - str) * CELL_H,
    [boardY]
  );

  const mutedSet = useMemo(() => new Set(mutedStrings), [mutedStrings]);

  // Open strings: string has fret=0 in highlights and is not muted
  const openSet = useMemo(() => {
    const s = new Set<number>();
    for (const h of highlights) {
      if (h.fret === 0) s.add(h.string);
    }
    return s;
  }, [highlights]);

  // ─── Event handlers ─────────────────────────────────────────────────────────
  const handleCellClick = useCallback(
    (str: number, fret: number) => {
      onFretClick?.(str, fret);
    },
    [onFretClick]
  );

  // ─── Render helpers ─────────────────────────────────────────────────────────

  // Fretboard wood background
  const renderBoard = () => (
    <>
      <defs>
        <linearGradient id="fb-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: COLORS.fretboardLight }} />
          <stop offset="100%" style={{ stopColor: COLORS.fretboard }} />
        </linearGradient>
        <linearGradient id="fb-string" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: COLORS.string }} />
          <stop offset="100%" style={{ stopColor: COLORS.stringDark }} />
        </linearGradient>
        <filter id="fb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dot-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
        </filter>
        <filter id="root-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wood board */}
      <rect
        x={boardX}
        y={boardY}
        width={BOARD_W}
        height={BOARD_H}
        fill={COLORS.fretboard}
        rx={2}
      />

      {/* Nut (thick line at fret 0) */}
      {startFret === 0 && (
        <rect
          x={boardX}
          y={boardY - 1}
          width={NUT_EXTRA + 4}
          height={BOARD_H + 2}
          fill={COLORS.fret}
          rx={1}
        />
      )}
    </>
  );

  // Fret wires
  const renderFrets = () => {
    const lines = [];
    for (let f = 0; f < numFrets; f++) {
      const x = boardX + f * CELL_W;
      if (f === 0 && startFret === 0) continue; // nut already drawn
      const isHovered = hoveredCell?.fret === f + startFret;
      lines.push(
        <rect
          key={`fret-${f}`}
          x={x - 1.5}
          y={boardY}
          width={3}
          height={BOARD_H}
          fill={isHovered ? COLORS.fretGlow : COLORS.fret}
          rx={1}
          style={{ transition: 'fill 0.15s' }}
        />
      );
    }
    // rightmost edge
    lines.push(
      <rect
        key="fret-right"
        x={boardX + BOARD_W - 1.5}
        y={boardY}
        width={3}
        height={BOARD_H}
        fill={COLORS.fret}
        rx={1}
      />
    );
    return lines;
  };

  // Guitar strings
  const renderStrings = () => {
    const lines = [];
    for (let s = 0; s < numStrings; s++) {
      // String thickness: low E (s=0) is thickest, high e (s=5) is thinnest
      // Visually s=0 is at bottom, s=5 at top
      const thickness = 1.2 + ((numStrings - 1 - s) / (numStrings - 1)) * 2;
      const y = stringY(s);
      lines.push(
        <line
          key={`string-${s}`}
          x1={boardX}
          y1={y}
          x2={boardX + BOARD_W}
          y2={y}
          stroke={COLORS.string}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
      );
    }
    return lines;
  };

  // Fret position markers (dots in the wood)
  const renderMarkers = () => {
    const markers = [];
    for (let f = startFret; f <= endFret; f++) {
      if (f === 0) continue;

      const spaceX = boardX + (f - startFret) * CELL_W - CELL_W / 2;
      const adjustedX = spaceX + CELL_W / 2;

      if (FRET_MARKER_SINGLE.includes(f)) {
        const cy = boardY + BOARD_H / 2;
        markers.push(
          <circle
            key={`marker-${f}`}
            cx={adjustedX}
            cy={cy}
            r={7}
            fill={COLORS.markerDot}
          />
        );
      } else if (FRET_MARKER_DOUBLE.includes(f)) {
        const cy1 = boardY + BOARD_H * 0.33;
        const cy2 = boardY + BOARD_H * 0.67;
        markers.push(
          <circle key={`marker-${f}-a`} cx={adjustedX} cy={cy1} r={7} fill={COLORS.markerDotBright} />,
          <circle key={`marker-${f}-b`} cx={adjustedX} cy={cy2} r={7} fill={COLORS.markerDotBright} />
        );
      }
    }
    return markers;
  };

  // Hover zones (invisible click/hover targets)
  const renderHitZones = () => {
    const zones = [];
    for (let s = 0; s < numStrings; s++) {
      for (let f = startFret; f <= endFret; f++) {
        const x = boardX + (f - startFret) * CELL_W;
        const cy = stringY(s);
        const isHovered = hoveredCell?.string === s && hoveredCell?.fret === f;
        zones.push(
          <rect
            key={`zone-${s}-${f}`}
            x={x}
            y={cy - CELL_H / 2}
            width={CELL_W}
            height={CELL_H}
            fill={isHovered ? COLORS.hoverHighlight : 'transparent'}
            style={{ cursor: onFretClick ? 'pointer' : 'default', transition: 'fill 0.12s' }}
            onMouseEnter={() => setHoveredCell({ string: s, fret: f })}
            onMouseLeave={() => setHoveredCell(null)}
            onClick={() => handleCellClick(s, f)}
          />
        );
      }
    }
    return zones;
  };

  // Barre chord bars
  const renderBarres = () =>
    barres.map((barre, i) => {
      if (barre.fret < startFret || barre.fret > endFret) return null;
      const cx = fretX(barre.fret);
      const y1 = stringY(barre.toString);   // higher string number = smaller y (top)
      const y2 = stringY(barre.fromString); // lower string number = larger y (bottom)
      const rx = 10;
      const barreW = 20;
      return (
        <rect
          key={`barre-${i}`}
          x={cx - barreW / 2}
          y={y1 - rx}
          width={barreW}
          height={y2 - y1 + rx * 2}
          fill={COLORS.barreColor}
          stroke={COLORS.barreBorder}
          strokeWidth={2}
          rx={rx}
          ry={rx}
          filter="url(#dot-shadow)"
        />
      );
    });

  // Finger dots for highlighted positions
  const renderHighlights = () =>
    highlights
      .filter((h) => h.fret >= startFret && h.fret <= endFret && h.fret > 0)
      .map((h, i) => {
        const cx = fretX(h.fret);
        const cy = stringY(h.string);
        const r = h.isRoot ? 17 : 14;
        const fillColor = h.isRoot ? COLORS.rootDot : COLORS.fingerDot;
        const isHov =
          hoveredCell?.string === h.string && hoveredCell?.fret === h.fret;
        const displayLabel = h.label ?? (h.finger ? String(h.finger) : '');

        return (
          <g key={`hl-${i}`} filter={h.isRoot ? 'url(#root-glow)' : 'url(#dot-shadow)'}>
            {/* Outer ring for root */}
            {h.isRoot && (
              <circle
                cx={cx}
                cy={cy}
                r={r + 3}
                fill="none"
                stroke={COLORS.rootDot}
                strokeWidth={2}
                opacity={0.6}
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={isHov ? (h.isRoot ? COLORS.rootDotHover : COLORS.fingerDotHover) : fillColor}
              style={{ transition: 'fill 0.15s, r 0.15s' }}
            />
            {displayLabel && (
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={h.isRoot ? 13 : 12}
                fontWeight="700"
                fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
                fill="#fff"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {displayLabel}
              </text>
            )}
          </g>
        );
      });

  // Muted / open markers above the board
  const renderStringOverhead = () => {
    const markers = [];
    for (let s = 0; s < numStrings; s++) {
      const strY = stringY(s);

      if (mutedSet.has(s)) {
        markers.push(
          <g key={`mute-${s}`}>
            <line
              x1={boardX - 8}
              y1={strY - 6}
              x2={boardX - 8 + 12}
              y2={strY + 6}
              stroke={COLORS.muteX}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <line
              x1={boardX - 8 + 12}
              y1={strY - 6}
              x2={boardX - 8}
              y2={strY + 6}
              stroke={COLORS.muteX}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </g>
        );
      } else if (openSet.has(s) && !highlights.some((h) => h.string === s && h.fret > 0)) {
        markers.push(
          <circle
            key={`open-${s}`}
            cx={boardX - 8 + 6}
            cy={strY}
            r={6}
            fill="none"
            stroke={COLORS.openO}
            strokeWidth={2}
          />
        );
      }
    }
    return markers;
  };

  // String name labels on the left
  const renderStringLabels = () =>
    STRING_NAMES.map((name, s) => (
      <text
        key={`label-${s}`}
        x={boardX - SIDE_PAD - 2}
        y={stringY(s)}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={13}
        fontWeight="600"
        fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
        fill={COLORS.textMuted}
      >
        {name}
      </text>
    ));

  // Fret number labels along the bottom (centered between fret wires)
  const renderFretNumbers = () => {
    const labels = [];
    for (let f = startFret; f <= endFret; f++) {
      if (f === 0) continue; // no label for open column
      labels.push(
        <text
          key={`fn-${f}`}
          x={fretX(f)}
          y={boardY + BOARD_H + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
          fill={
            FRET_MARKER_SINGLE.includes(f) || FRET_MARKER_DOUBLE.includes(f)
              ? COLORS.fret
              : COLORS.textMuted
          }
          fontWeight={FRET_MARKER_DOUBLE.includes(f) ? '700' : '400'}
        >
          {f}
        </text>
      );
    }
    return labels;
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        background: COLORS.background,
        borderRadius: 16,
        padding: '12px 8px',
        boxSizing: 'border-box',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="Guitar fretboard"
      >
        {renderBoard()}
        {renderMarkers()}
        {renderFrets()}
        {renderStrings()}
        {renderHitZones()}
        {renderBarres()}
        {renderHighlights()}
        {renderStringLabels()}
        {renderStringOverhead()}
        {renderFretNumbers()}
      </svg>
    </div>
  );
};

export default Fretboard;
