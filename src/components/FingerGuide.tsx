import React, { useState } from 'react';

// ─── Color palette ────────────────────────────────────────────────────────────
const COLORS = {
  background: 'var(--bg-secondary)',
  fingerDot: 'var(--accent-blue)',
  rootDot: 'var(--accent-red)',
  text: 'var(--text-primary)',
  textMuted: 'var(--text-muted)',
  fret: 'var(--fb-fret)',
  palmSkin: 'var(--fb-palm)',
  palmSkinLight: 'var(--fb-palm-light)',
  finger1: '#4a90d9',  // index   – blues blue
  finger2: '#27ae60',  // middle  – green
  finger3: '#f39c12',  // ring    – amber
  finger4: '#9b59b6',  // pinky   – purple
  thumb:   '#e74c3c',  // thumb   – red (root color)
};

// ─── Finger metadata ──────────────────────────────────────────────────────────
const FINGERS = [
  { num: 1, label: '1', name: 'Index',  color: COLORS.finger1, hint: 'Strongest fretting finger — barres & root notes' },
  { num: 2, label: '2', name: 'Middle', color: COLORS.finger2, hint: 'Pairs with index for two-note shapes' },
  { num: 3, label: '3', name: 'Ring',   color: COLORS.finger3, hint: 'Often the anchor on blues bends' },
  { num: 4, label: '4', name: 'Pinky',  color: COLORS.finger4, hint: 'Extends reach — essential for extensions' },
  { num: 0, label: 'T', name: 'Thumb',  color: COLORS.thumb,   hint: 'Wraps over neck for low-E muting or thumb notes' },
];

// ─── SVG hand constants ───────────────────────────────────────────────────────
// We draw a simplified front-view left hand (fretting hand) in SVG.
// Palm is a rounded rectangle; fingers are rounded rects above it; thumb off to the left.

const HAND_SVG_W = 180;
const HAND_SVG_H = 220;

// Finger columns (x center), widths, heights, y-top positions
const FINGER_DEFS = [
  // pinky (4)  ring (3)  middle (2)  index (1)
  { num: 4, cx: 148, w: 22, h: 68, yTop: 28,  color: COLORS.finger4 },
  { num: 3, cx: 118, w: 26, h: 80, yTop: 18,  color: COLORS.finger3 },
  { num: 2, cx:  88, w: 28, h: 88, yTop: 12,  color: COLORS.finger2 },
  { num: 1, cx:  58, w: 28, h: 82, yTop: 20,  color: COLORS.finger1 },
];
const THUMB_DEF = { num: 0, cx: 20, cy: 145, w: 22, h: 52, color: COLORS.thumb };
const PALM = { x: 38, y: 105, w: 122, h: 82, rx: 18 };

// ─── Props ────────────────────────────────────────────────────────────────────
export interface FingerGuideProps {
  /** Highlight a specific finger (e.g. on fretboard hover) */
  activeFingers?: number[];
  /** Show compact list mode instead of hand diagram */
  mode?: 'hand' | 'list' | 'both';
}

// ─── Component ────────────────────────────────────────────────────────────────
const FingerGuide: React.FC<FingerGuideProps> = ({
  activeFingers = [],
  mode = 'both',
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const activeSet = new Set(activeFingers);

  // ─── SVG hand diagram ────────────────────────────────────────────────────────
  const renderHand = () => {
    const isActive = (n: number) =>
      activeSet.size === 0 ? true : activeSet.has(n);
    const isHov = (n: number) => hovered === n;

    return (
      <svg
        viewBox={`0 0 ${HAND_SVG_W} ${HAND_SVG_H}`}
        width={HAND_SVG_W}
        height={HAND_SVG_H}
        aria-label="Fretting hand finger guide"
        style={{ display: 'block', margin: '0 auto' }}
      >
        <defs>
          <linearGradient id="fg-palm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: COLORS.palmSkinLight }} />
            <stop offset="100%" style={{ stopColor: COLORS.palmSkin }} />
          </linearGradient>
          <filter id="fg-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Palm */}
        <rect
          x={PALM.x}
          y={PALM.y}
          width={PALM.w}
          height={PALM.h}
          rx={PALM.rx}
          fill={COLORS.palmSkin}
          stroke="var(--overlay-hover)"
          strokeWidth={1}
        />

        {/* Fingers */}
        {FINGER_DEFS.map((f) => {
          const active = isActive(f.num);
          const hov = isHov(f.num);
          const fill = active || hov ? f.color : 'var(--overlay-hover)';
          const opacity = hov ? 1 : active ? 0.85 : 0.3;
          return (
            <g
              key={`fg-finger-${f.num}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(f.num)}
              onMouseLeave={() => setHovered(null)}
              filter={hov ? 'url(#fg-glow)' : undefined}
            >
              <rect
                x={f.cx - f.w / 2}
                y={f.yTop}
                width={f.w}
                height={f.h}
                rx={f.w / 2}
                fill={fill}
                opacity={opacity}
                style={{ transition: 'fill 0.2s, opacity 0.2s' }}
              />
              {/* Fingernail crescent */}
              <ellipse
                cx={f.cx}
                cy={f.yTop + 10}
                rx={f.w / 2 - 3}
                ry={6}
                fill="var(--fingernail)"
              />
              {/* Finger number badge */}
              <circle
                cx={f.cx}
                cy={f.yTop + f.h - 14}
                r={10}
                fill={COLORS.background}
                opacity={0.7}
              />
              <text
                x={f.cx}
                y={f.yTop + f.h - 14}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fontWeight="700"
                fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
                fill={active || hov ? f.color : COLORS.textMuted}
                style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.2s' }}
              >
                {f.num}
              </text>
            </g>
          );
        })}

        {/* Thumb */}
        {(() => {
          const f = THUMB_DEF;
          const active = isActive(0);
          const hov = isHov(0);
          const fill = active || hov ? f.color : 'var(--overlay-hover)';
          const opacity = hov ? 1 : active ? 0.85 : 0.3;
          return (
            <g
              key="fg-thumb"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(0)}
              onMouseLeave={() => setHovered(null)}
              filter={hov ? 'url(#fg-glow)' : undefined}
            >
              {/* Thumb rotated slightly */}
              <rect
                x={f.cx - f.w / 2}
                y={f.cy - f.h / 2}
                width={f.w}
                height={f.h}
                rx={f.w / 2}
                fill={fill}
                opacity={opacity}
                transform={`rotate(-30, ${f.cx}, ${f.cy})`}
                style={{ transition: 'fill 0.2s, opacity 0.2s' }}
              />
              {/* T badge */}
              <circle cx={f.cx + 2} cy={f.cy + 16} r={10} fill={COLORS.background} opacity={0.7} />
              <text
                x={f.cx + 2}
                y={f.cy + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fontWeight="700"
                fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
                fill={active || hov ? f.color : COLORS.textMuted}
                style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.2s' }}
              >
                T
              </text>
            </g>
          );
        })()}

        {/* Knuckle lines on palm */}
        {FINGER_DEFS.map((f) => (
          <line
            key={`fg-knuckle-${f.num}`}
            x1={f.cx - f.w / 2 + 2}
            y1={PALM.y + 6}
            x2={f.cx + f.w / 2 - 2}
            y2={PALM.y + 6}
            stroke="var(--overlay-hover)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  };

  // ─── List legend ─────────────────────────────────────────────────────────────
  const renderList = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '0 4px',
      }}
    >
      {FINGERS.map((f) => {
        const isAct = activeSet.size === 0 ? true : activeSet.has(f.num);
        const isHov = hovered === f.num;
        return (
          <div
            key={`fg-row-${f.num}`}
            onMouseEnter={() => setHovered(f.num)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 10px',
              borderRadius: 8,
              background: isHov
                ? 'var(--overlay-hover)'
                : isAct
                ? 'var(--overlay-subtle)'
                : 'transparent',
              opacity: isAct || isHov ? 1 : 0.4,
              cursor: 'default',
              transition: 'background 0.15s, opacity 0.15s',
            }}
          >
            {/* Color badge */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: f.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isHov ? `0 0 10px ${f.color}` : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 13,
                  fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
                  userSelect: 'none',
                }}
              >
                {f.label}
              </span>
            </div>

            {/* Name + hint */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: COLORS.text,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {f.name}
              </div>
              <div
                style={{
                  color: COLORS.textMuted,
                  fontSize: 11,
                  fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
                  lineHeight: 1.3,
                  marginTop: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {f.hint}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ─── Header ──────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <div
      style={{
        textAlign: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: `1px solid rgba(212,168,67,0.25)`,
      }}
    >
      <span
        style={{
          color: COLORS.fret,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
        }}
      >
        Finger Guide
      </span>
    </div>
  );

  // ─── Outer container ─────────────────────────────────────────────────────────
  return (
    <div
      style={{
        background: COLORS.background,
        borderRadius: 16,
        padding: '14px 12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        minWidth: 200,
        maxWidth: 220,
      }}
      aria-label="Finger guide"
    >
      {renderHeader()}
      {(mode === 'hand' || mode === 'both') && renderHand()}
      {mode === 'both' && <div style={{ height: 10 }} />}
      {(mode === 'list' || mode === 'both') && renderList()}
    </div>
  );
};

export default FingerGuide;
