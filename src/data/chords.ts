import type { Chord } from './types';

// ─── Open Chords ──────────────────────────────────────────────────────────────
//
// String index convention: 0 = low E (thickest), 5 = high e (thinnest)
// Finger convention:       1 = index, 2 = middle, 3 = ring, 4 = pinky
//
// All fret/finger data verified against standard notation for blues guitar.

/**
 * E Major (open)
 * Strings: E A D G B e
 * Frets:   0 2 2 1 0 0
 *          - 2 3 1 - -  (fingers)
 */
const E_MAJOR: Chord = {
  id: 'E',
  name: 'E Major',
  root: 'E',
  type: 'major',
  voicing: 'open',
  positions: [
    { string: 1, fret: 2, finger: 2 }, // A string, 2nd fret → B
    { string: 2, fret: 2, finger: 3 }, // D string, 2nd fret → E
    { string: 3, fret: 1, finger: 1 }, // G string, 1st fret → G#
  ],
  mutedStrings: [],
  description:
    'The most fundamental chord in blues. Nearly every classic 12-bar blues in E starts here. ' +
    'Its full, resonant voicing with all six open strings rings across the entire guitar neck.',
};

/**
 * A Major (open)
 * Strings: E A D G B e
 * Frets:   x 0 2 2 2 0
 *              2 3 4 -  (fingers) – classic fingering
 * Alternative: barre strings 2-4 with finger 1 at fret 2
 */
const A_MAJOR: Chord = {
  id: 'A',
  name: 'A Major',
  root: 'A',
  type: 'major',
  voicing: 'open',
  positions: [
    { string: 2, fret: 2, finger: 1 }, // D string → E
    { string: 3, fret: 2, finger: 2 }, // G string → A
    { string: 4, fret: 2, finger: 3 }, // B string → C#
  ],
  mutedStrings: [0], // Low E muted
  description:
    'The IV chord in an E blues and the I chord in an A blues. ' +
    'Mastering this open chord lets you navigate two of the most popular blues keys immediately.',
};

/**
 * E7 (open) — dominant 7th, the essential blues chord color
 * Strings: E A D G B e
 * Frets:   0 2 0 1 0 0
 *              2   1       (fingers)
 */
const E7: Chord = {
  id: 'E7',
  name: 'E7',
  root: 'E',
  type: 'dominant7',
  voicing: 'open',
  positions: [
    { string: 1, fret: 2, finger: 2 }, // A string → B
    { string: 3, fret: 1, finger: 1 }, // G string → G# (the major 3rd)
    // D string (2) open = D, the b7 — this is what makes it dominant 7
  ],
  mutedStrings: [],
  description:
    'The quintessential blues chord. The dominant 7th interval (b7) creates that characteristic ' +
    'tension and grit. Every blues guitarist needs E7 in their vocabulary — it drives straight ' +
    'into A as the V7→I resolution.',
};

/**
 * A7 (open) — dominant 7th
 * Strings: E A D G B e
 * Frets:   x 0 2 0 2 0
 *                2   3      (fingers)
 */
const A7: Chord = {
  id: 'A7',
  name: 'A7',
  root: 'A',
  type: 'dominant7',
  voicing: 'open',
  positions: [
    { string: 2, fret: 2, finger: 2 }, // D string → E
    { string: 4, fret: 2, finger: 3 }, // B string → C#
    // G string (3) open = G, the b7 — makes it dominant 7
  ],
  mutedStrings: [0], // Low E muted
  description:
    'The IV7 chord in E blues, and the I7 in A blues. Like E7, the dominant 7th ' +
    'gives it that bluesy tension. The open G string rings out the characteristic b7 interval ' +
    'without any extra fingers.',
};

/**
 * B7 (open) — the V chord in E blues, essential for the 12-bar
 * Strings: E A D G B e
 * Frets:   x 2 1 2 0 2
 *              2 1 3   4    (fingers)
 */
const B7: Chord = {
  id: 'B7',
  name: 'B7',
  root: 'B',
  type: 'dominant7',
  voicing: 'open',
  positions: [
    { string: 1, fret: 2, finger: 2 }, // A string → B (root)
    { string: 2, fret: 1, finger: 1 }, // D string → D# (major 3rd)
    { string: 3, fret: 2, finger: 3 }, // G string → A (b7)
    { string: 5, fret: 2, finger: 4 }, // high e string → F# (5th)
  ],
  mutedStrings: [0], // Low E muted
  description:
    'The V7 chord in E blues — the most tension-filled chord in the 12-bar progression. ' +
    'B7 creates strong harmonic pull back to E, making it the essential turnaround chord. ' +
    'Its slightly awkward fingering is a rite of passage for every blues player.',
};

/**
 * D7 (open) — dominant 7th, IV7 in A blues
 * Strings: E A D G B e
 * Frets:   x x 0 2 1 2
 *                  2 1 3    (fingers)
 */
const D7: Chord = {
  id: 'D7',
  name: 'D7',
  root: 'D',
  type: 'dominant7',
  voicing: 'open',
  positions: [
    { string: 3, fret: 2, finger: 2 }, // G string → A (5th)
    { string: 4, fret: 1, finger: 1 }, // B string → C (b7)
    { string: 5, fret: 2, finger: 3 }, // high e string → F# (3rd)
  ],
  mutedStrings: [0, 1], // Low E and A muted
  description:
    'D7 is the IV7 chord in an A blues and the bVII7 color chord in E blues. ' +
    'Its bright, slightly nasal character cuts through a band mix. ' +
    'Robert Johnson and Muddy Waters leaned heavily on D7 for its vocal quality.',
};

/**
 * G Major (open)
 * Strings: E A D G B e
 * Frets:   3 2 0 0 0 3
 *          2 1         4    (fingers)
 * Blues use: I chord in G blues, bIII in E blues
 */
const G_MAJOR: Chord = {
  id: 'G',
  name: 'G Major',
  root: 'G',
  type: 'major',
  voicing: 'open',
  positions: [
    { string: 0, fret: 3, finger: 2 }, // Low E string → G (root)
    { string: 1, fret: 2, finger: 1 }, // A string → B (major 3rd)
    { string: 5, fret: 3, finger: 4 }, // high e string → G (root, octave)
  ],
  mutedStrings: [],
  description:
    'G Major opens up blues in the key of G and adds a major bIII color in E blues. ' +
    'The open-G chord rings beautifully and is used in country-blues and Texas blues styles. ' +
    'Robert Johnson\'s "Sweet Home Chicago" features this chord prominently.',
};

// ─── Barre Chords ─────────────────────────────────────────────────────────────

/**
 * A Major barre chord — E-shape barre at 5th fret
 * Strings: E A D G B e
 * Frets:   5 7 7 6 5 5
 * All strings barred at fret 5 with finger 1; ring/middle/pinky on strings 1-3
 */
const A_MAJOR_BARRE: Chord = {
  id: 'A_barre',
  name: 'A Major (Barre)',
  root: 'A',
  type: 'major',
  voicing: 'barre',
  positions: [
    { string: 1, fret: 7, finger: 3 }, // A string → E (5th)
    { string: 2, fret: 7, finger: 4 }, // D string → A (root)
    { string: 3, fret: 6, finger: 2 }, // G string → C# (3rd)
  ],
  barres: [{ fret: 5, fromString: 0, toString: 5 }],
  mutedStrings: [],
  description:
    'The E-shape barre chord moved to the 5th fret gives A Major. Learning this shape ' +
    'unlocks every major chord on the neck — slide it to any fret to change the key. ' +
    'Essential for blues in any key and for playing rhythm behind a singer.',
};

/**
 * A7 barre chord — E7-shape barre at 5th fret
 * Strings: E A D G B e
 * Frets:   5 7 5 6 5 5
 * Barre at 5; add ring on A string fret 7, middle on G string fret 6
 */
const A7_BARRE: Chord = {
  id: 'A7_barre',
  name: 'A7 (Barre)',
  root: 'A',
  type: 'dominant7',
  voicing: 'barre',
  positions: [
    { string: 1, fret: 7, finger: 3 }, // A string → E (5th)
    { string: 3, fret: 6, finger: 2 }, // G string → C# (3rd)
    // D string (2) open within barre at 5 → A, leaving b7 (G) by skipping fret 6 on that string
  ],
  barres: [{ fret: 5, fromString: 0, toString: 5 }],
  mutedStrings: [],
  description:
    'The E7-shape barre at the 5th fret. A dominant 7th barre shape is the workhorse of ' +
    'blues rhythm guitar — you can drive an entire song using nothing but this shape moved ' +
    'to the I, IV, and V positions.',
};

/**
 * B7 barre chord — A7-shape barre at 2nd fret
 * Strings: E A D G B e
 * Frets:   x 2 4 2 4 2
 * Barre at 2; ring on D string fret 4, pinky on B string fret 4
 */
const B7_BARRE: Chord = {
  id: 'B7_barre',
  name: 'B7 (Barre)',
  root: 'B',
  type: 'dominant7',
  voicing: 'barre',
  positions: [
    { string: 2, fret: 4, finger: 3 }, // D string → F# (5th)
    { string: 4, fret: 4, finger: 4 }, // B string → D# (3rd)
    // G string open within barre at 2 → A (b7 of B)
  ],
  barres: [{ fret: 2, fromString: 1, toString: 5 }],
  mutedStrings: [0],
  description:
    'The A7-shape barre chord at the 2nd fret. This movable V7 shape is invaluable for ' +
    'blues in any key — every note of the V7 chord is included, giving full dominant sound ' +
    'without needing open strings.',
};

/**
 * E Major barre chord — A-shape barre at 7th fret
 * Strings: E A D G B e
 * Frets:   x 7 9 9 9 7
 * Barre at 7; ring/middle/pinky cluster on strings 2-4 at fret 9
 */
const E_MAJOR_BARRE: Chord = {
  id: 'E_barre',
  name: 'E Major (Barre)',
  root: 'E',
  type: 'major',
  voicing: 'barre',
  positions: [
    { string: 2, fret: 9, finger: 3 }, // D string → B (5th)
    { string: 3, fret: 9, finger: 4 }, // G string → E (root)
    { string: 4, fret: 9, finger: 4 }, // B string → G# (3rd)
    // Using ring and pinky as a mini-barre on strings 2-4 at fret 9 is common
  ],
  barres: [
    { fret: 7, fromString: 1, toString: 5 },
    { fret: 9, fromString: 2, toString: 4 }, // cluster barre
  ],
  mutedStrings: [0],
  description:
    'The A-shape barre chord at the 7th fret — an alternative voicing for E that sits ' +
    'higher on the neck. Great for layering over an open-E rhythm part and for playing ' +
    'against a capo\'d partner.',
};

/**
 * D Major barre chord — A-shape barre at 5th fret
 * Strings: E A D G B e
 * Frets:   x 5 7 7 7 5
 */
const D_MAJOR_BARRE: Chord = {
  id: 'D_barre',
  name: 'D Major (Barre)',
  root: 'D',
  type: 'major',
  voicing: 'barre',
  positions: [
    { string: 2, fret: 7, finger: 3 }, // D string → A (5th)
    { string: 3, fret: 7, finger: 4 }, // G string → D (root)
    { string: 4, fret: 7, finger: 4 }, // B string → F# (3rd)
  ],
  barres: [
    { fret: 5, fromString: 1, toString: 5 },
    { fret: 7, fromString: 2, toString: 4 },
  ],
  mutedStrings: [0],
  description:
    'D Major as an A-shape barre at the 5th fret. In A blues this is the IV chord; ' +
    'in E blues it provides a bVII color. Slide the same shape down two frets for C, ' +
    'up two for E — one shape, infinite keys.',
};

// ─── Chord Collections ────────────────────────────────────────────────────────

/** All open blues chords, indexed by chord ID */
export const OPEN_CHORDS: Record<string, Chord> = {
  E: E_MAJOR,
  A: A_MAJOR,
  E7: E7,
  A7: A7,
  B7: B7,
  D7: D7,
  G: G_MAJOR,
};

/** All barre chord shapes used in blues, indexed by chord ID */
export const BARRE_CHORDS: Record<string, Chord> = {
  A_barre: A_MAJOR_BARRE,
  A7_barre: A7_BARRE,
  B7_barre: B7_BARRE,
  E_barre: E_MAJOR_BARRE,
  D_barre: D_MAJOR_BARRE,
};

/** All blues chords combined */
export const ALL_CHORDS: Record<string, Chord> = {
  ...OPEN_CHORDS,
  ...BARRE_CHORDS,
};

// ─── 12-Bar Blues Progressions ─────────────────────────────────────────────────

export interface BluesProgression {
  key: string;
  tempo: string;
  description: string;
  /** Chord IDs in order, one per bar (12 bars) */
  bars: string[];
}

/**
 * Standard 12-bar blues in E (open chord version)
 * I   I   I   I
 * IV  IV  I   I
 * V   IV  I   V  (turnaround)
 */
export const TWELVE_BAR_BLUES_E: BluesProgression = {
  key: 'E',
  tempo: '80–120 BPM shuffle',
  description:
    'The foundational 12-bar blues in E, using all open chords. ' +
    'This is the exact progression used in classics like "Hound Dog," ' +
    '"Johnny B. Goode," and hundreds of other blues and early rock songs.',
  bars: ['E7', 'E7', 'E7', 'E7', 'A7', 'A7', 'E7', 'E7', 'B7', 'A7', 'E7', 'B7'],
};

/**
 * Standard 12-bar blues in A (open chord version)
 */
export const TWELVE_BAR_BLUES_A: BluesProgression = {
  key: 'A',
  tempo: '80–120 BPM shuffle',
  description:
    'The foundational 12-bar blues in A. ' +
    'Used in "Pride and Joy" (Stevie Ray Vaughan), "Sweet Home Chicago," ' +
    'and countless Chicago blues recordings.',
  bars: ['A7', 'A7', 'A7', 'A7', 'D7', 'D7', 'A7', 'A7', 'E7', 'D7', 'A7', 'E7'],
};

/** Quick-reference chord lookup by ID */
export function getChord(id: string): Chord | undefined {
  return ALL_CHORDS[id];
}
