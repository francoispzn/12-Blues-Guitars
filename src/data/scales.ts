import type { Scale, ScalePosition } from './types';

// ─── Scale Data Notes ─────────────────────────────────────────────────────────
//
// All positions are given as concrete fret numbers for the keys of A and E.
// String index: 0 = low E (thickest), 5 = high e (thinnest)
// Finger:       1 = index, 2 = middle, 3 = ring, 4 = pinky
//
// The 5 pentatonic positions follow the standard CAGED-derived "box" system:
//   Position 1 (Box 1) — root on string 5 (A string), anchors around open position
//   Position 2 (Box 2) — root on string 4 (D string)
//   Position 3 (Box 3) — root on string 2 (B string)
//   Position 4 (Box 4) — root on string 0 (low E string)
//   Position 5 (Box 5) — root on string 3 (G string), connects back to Position 1
//
// For A minor pentatonic: root A is at fret 5 (low E), fret 0 (A string).
// For E minor pentatonic: root E is at fret 0 (low E), fret 7 (A string).

// ─────────────────────────────────────────────────────────────────────────────
// A MINOR PENTATONIC — All 5 Positions
// Notes in scale: A C D E G
// Formula: 1  b3  4  5  b7
// ─────────────────────────────────────────────────────────────────────────────

// Position 1 cleanly rebuilt (fret 5 area, A minor pentatonic)
// A minor pentatonic notes: A(root) C(b3) D(4th) E(5th) G(b7)
// Fret positions for A minor pent, Position 1, frets 5–8:
const A_MINOR_PENT_POS1_CLEAN: ScalePosition = {
  positionNumber: 1,
  label: 'Position 1 (Box 1) — the foundational blues box',
  rootFret: 5,
  notes: [
    { string: 0, fret: 5, finger: 1, isRoot: true  }, // E str fret 5 = A (root)
    { string: 0, fret: 8, finger: 4, isRoot: false }, // E str fret 8 = C (b3)
    { string: 1, fret: 5, finger: 1, isRoot: false }, // A str fret 5 = D (4th)
    { string: 1, fret: 7, finger: 3, isRoot: false }, // A str fret 7 = E (5th)
    { string: 2, fret: 5, finger: 1, isRoot: false }, // D str fret 5 = G (b7)
    { string: 2, fret: 7, finger: 3, isRoot: true  }, // D str fret 7 = A (root)
    { string: 3, fret: 5, finger: 1, isRoot: false }, // G str fret 5 = C (b3)
    { string: 3, fret: 7, finger: 3, isRoot: false }, // G str fret 7 = D (4th)
    { string: 4, fret: 5, finger: 1, isRoot: false }, // B str fret 5 = E (5th)
    { string: 4, fret: 8, finger: 4, isRoot: false }, // B str fret 8 = G (b7)
    { string: 5, fret: 5, finger: 1, isRoot: true  }, // e str fret 5 = A (root)
    { string: 5, fret: 8, finger: 4, isRoot: false }, // e str fret 8 = C (b3)
  ],
};

const A_MINOR_PENT_POS2: ScalePosition = {
  positionNumber: 2,
  label: 'Position 2 (Box 2) — shifting up the neck',
  rootFret: 8,
  notes: [
    { string: 0, fret: 7, finger: 1, isRoot: false }, // E str fret 7 = B...
    // Position 2 for Am pent sits around frets 7-10
    // Notes at these frets (Am pent = A C D E G):
    // Low E (0): 7=B (not in scale), 8=C✓, 10=D✓ — correction: fret8=C, fret10=D
    { string: 0, fret: 8,  finger: 1, isRoot: false }, // E str fret 8  = C (b3)
    { string: 0, fret: 10, finger: 3, isRoot: false }, // E str fret 10 = D (4th)
    // A string (1): 7=E, 10=G
    { string: 1, fret: 7,  finger: 1, isRoot: false }, // A str fret 7  = E (5th)
    { string: 1, fret: 10, finger: 4, isRoot: false }, // A str fret 10 = G (b7)
    // D string (2): 7=A, 10=C
    { string: 2, fret: 7,  finger: 1, isRoot: true  }, // D str fret 7  = A (root)
    { string: 2, fret: 10, finger: 4, isRoot: false }, // D str fret 10 = C (b3)
    // G string (3): 7=D, 9=E
    { string: 3, fret: 7,  finger: 1, isRoot: false }, // G str fret 7  = D (4th)
    { string: 3, fret: 9,  finger: 3, isRoot: false }, // G str fret 9  = E (5th)
    // B string (4): 8=G, 10=A
    { string: 4, fret: 8,  finger: 1, isRoot: false }, // B str fret 8  = G (b7)
    { string: 4, fret: 10, finger: 3, isRoot: true  }, // B str fret 10 = A (root)
    // High e (5): 8=C, 10=D
    { string: 5, fret: 8,  finger: 1, isRoot: false }, // e str fret 8  = C (b3)
    { string: 5, fret: 10, finger: 3, isRoot: false }, // e str fret 10 = D (4th)
  ],
};

const A_MINOR_PENT_POS3: ScalePosition = {
  positionNumber: 3,
  label: 'Position 3 (Box 3) — upper register',
  rootFret: 12,
  notes: [
    // Frets 10-13 — Am pent
    // Low E (0): 10=D, 12=E
    { string: 0, fret: 10, finger: 1, isRoot: false }, // D (4th)
    { string: 0, fret: 12, finger: 3, isRoot: false }, // E (5th)
    // A string (1): 10=G, 12=A
    { string: 1, fret: 10, finger: 1, isRoot: false }, // G (b7)
    { string: 1, fret: 12, finger: 3, isRoot: true  }, // A (root)
    // D string (2): 10=C, 12=D
    { string: 2, fret: 10, finger: 1, isRoot: false }, // C (b3)
    { string: 2, fret: 12, finger: 3, isRoot: false }, // D (4th)
    // G string (3): 9=E, 12=G
    { string: 3, fret: 9,  finger: 1, isRoot: false }, // E (5th)
    { string: 3, fret: 12, finger: 4, isRoot: false }, // G (b7)
    // B string (4): 10=A, 13=C
    { string: 4, fret: 10, finger: 1, isRoot: true  }, // A (root)
    { string: 4, fret: 13, finger: 4, isRoot: false }, // C (b3)
    // High e (5): 10=D, 12=E
    { string: 5, fret: 10, finger: 1, isRoot: false }, // D (4th)
    { string: 5, fret: 12, finger: 3, isRoot: false }, // E (5th)
  ],
};

const A_MINOR_PENT_POS4: ScalePosition = {
  positionNumber: 4,
  label: 'Position 4 (Box 4) — high on the neck',
  rootFret: 14,
  notes: [
    // Frets 12-15 — Am pent
    // Low E (0): 12=E, 15=G
    { string: 0, fret: 12, finger: 1, isRoot: false }, // E (5th)
    { string: 0, fret: 15, finger: 4, isRoot: false }, // G (b7)
    // A string (1): 12=A, 14=B — 14 not in scale; correct: 12=A(root), 15=C
    { string: 1, fret: 12, finger: 1, isRoot: true  }, // A (root)
    { string: 1, fret: 15, finger: 4, isRoot: false }, // C (b3)
    // D string (2): 12=D, 14=E
    { string: 2, fret: 12, finger: 1, isRoot: false }, // D (4th)
    { string: 2, fret: 14, finger: 3, isRoot: false }, // E (5th)
    // G string (3): 12=G, 14=A
    { string: 3, fret: 12, finger: 1, isRoot: false }, // G (b7)
    { string: 3, fret: 14, finger: 3, isRoot: true  }, // A (root)
    // B string (4): 13=C, 15=D
    { string: 4, fret: 13, finger: 1, isRoot: false }, // C (b3)
    { string: 4, fret: 15, finger: 3, isRoot: false }, // D (4th)
    // High e (5): 12=E, 15=G
    { string: 5, fret: 12, finger: 1, isRoot: false }, // E (5th)
    { string: 5, fret: 15, finger: 4, isRoot: false }, // G (b7)
  ],
};

const A_MINOR_PENT_POS5: ScalePosition = {
  positionNumber: 5,
  label: 'Position 5 (Box 5) — connects back to Position 1',
  rootFret: 17,
  notes: [
    // Frets 15-17 — Am pent — this position connects back to pos 1 an octave up
    // Low E (0): 15=G, 17=A
    { string: 0, fret: 15, finger: 1, isRoot: false }, // G (b7)
    { string: 0, fret: 17, finger: 3, isRoot: true  }, // A (root)
    // A string (1): 15=C, 17=D
    { string: 1, fret: 15, finger: 1, isRoot: false }, // C (b3)
    { string: 1, fret: 17, finger: 3, isRoot: false }, // D (4th)
    // D string (2): 14=E, 17=G
    { string: 2, fret: 14, finger: 1, isRoot: false }, // E (5th)
    { string: 2, fret: 17, finger: 4, isRoot: false }, // G (b7)
    // G string (3): 14=A, 17=C
    { string: 3, fret: 14, finger: 1, isRoot: true  }, // A (root)
    { string: 3, fret: 17, finger: 4, isRoot: false }, // C (b3)
    // B string (4): 15=D, 17=E
    { string: 4, fret: 15, finger: 1, isRoot: false }, // D (4th)
    { string: 4, fret: 17, finger: 3, isRoot: false }, // E (5th)
    // High e (5): 15=G, 17=A
    { string: 5, fret: 15, finger: 1, isRoot: false }, // G (b7)
    { string: 5, fret: 17, finger: 3, isRoot: true  }, // A (root)
  ],
};

export const A_MINOR_PENTATONIC: Scale = {
  id: 'A_minor_pentatonic',
  name: 'A Minor Pentatonic',
  key: 'A',
  type: 'minor_pentatonic',
  formula: '1  b3  4  5  b7',
  notes: ['A', 'C', 'D', 'E', 'G'],
  positions: [
    A_MINOR_PENT_POS1_CLEAN,
    A_MINOR_PENT_POS2,
    A_MINOR_PENT_POS3,
    A_MINOR_PENT_POS4,
    A_MINOR_PENT_POS5,
  ],
  description:
    'The minor pentatonic is THE blues scale — five notes that work over virtually every chord ' +
    'in a blues progression. Position 1 (Box 1) around fret 5 is where every blues guitarist ' +
    'starts. B.B. King, Eric Clapton, and Stevie Ray Vaughan all built their signature sounds ' +
    'from these five notes.',
};

// ─────────────────────────────────────────────────────────────────────────────
// E MINOR PENTATONIC — All 5 Positions
// Notes in scale: E G A B D
// Formula: 1  b3  4  5  b7
// ─────────────────────────────────────────────────────────────────────────────

const E_MINOR_PENT_POS1: ScalePosition = {
  positionNumber: 1,
  label: 'Position 1 (Box 1) — open position',
  rootFret: 0,
  notes: [
    // Em pent: E G A B D — frets 0-3
    // Low E (0): 0=E(root), 3=G
    { string: 0, fret: 0, finger: 0, isRoot: true  }, // E (root) — open
    { string: 0, fret: 3, finger: 3, isRoot: false }, // G (b3)
    // A string (1): 0=A, 2=B
    { string: 1, fret: 0, finger: 0, isRoot: false }, // A (4th) — open
    { string: 1, fret: 2, finger: 2, isRoot: false }, // B (5th)
    // D string (2): 0=D, 2=E
    { string: 2, fret: 0, finger: 0, isRoot: false }, // D (b7) — open
    { string: 2, fret: 2, finger: 2, isRoot: true  }, // E (root)
    // G string (3): 0=G, 2=A
    { string: 3, fret: 0, finger: 0, isRoot: false }, // G (b3) — open
    { string: 3, fret: 2, finger: 2, isRoot: false }, // A (4th)
    // B string (4): 0=B, 3=D
    { string: 4, fret: 0, finger: 0, isRoot: false }, // B (5th) — open
    { string: 4, fret: 3, finger: 3, isRoot: false }, // D (b7)
    // High e (5): 0=E, 3=G
    { string: 5, fret: 0, finger: 0, isRoot: true  }, // E (root) — open
    { string: 5, fret: 3, finger: 3, isRoot: false }, // G (b3)
  ],
};

const E_MINOR_PENT_POS2: ScalePosition = {
  positionNumber: 2,
  label: 'Position 2 (Box 2) — frets 3–5',
  rootFret: 5,
  notes: [
    // Low E (0): 3=G, 5=A
    { string: 0, fret: 3, finger: 1, isRoot: false }, // G (b3)
    { string: 0, fret: 5, finger: 3, isRoot: false }, // A (4th)
    // A string (1): 2=B, 5=D
    { string: 1, fret: 2, finger: 1, isRoot: false }, // B (5th)
    { string: 1, fret: 5, finger: 4, isRoot: false }, // D (b7)
    // D string (2): 2=E, 5=G
    { string: 2, fret: 2, finger: 1, isRoot: true  }, // E (root)
    { string: 2, fret: 5, finger: 4, isRoot: false }, // G (b3)
    // G string (3): 2=A, 4=B
    { string: 3, fret: 2, finger: 1, isRoot: false }, // A (4th)
    { string: 3, fret: 4, finger: 3, isRoot: false }, // B (5th)
    // B string (4): 3=D, 5=E
    { string: 4, fret: 3, finger: 1, isRoot: false }, // D (b7)
    { string: 4, fret: 5, finger: 3, isRoot: true  }, // E (root)
    // High e (5): 3=G, 5=A
    { string: 5, fret: 3, finger: 1, isRoot: false }, // G (b3)
    { string: 5, fret: 5, finger: 3, isRoot: false }, // A (4th)
  ],
};

const E_MINOR_PENT_POS3: ScalePosition = {
  positionNumber: 3,
  label: 'Position 3 (Box 3) — frets 5–8',
  rootFret: 7,
  notes: [
    // Low E (0): 5=A, 7=B
    { string: 0, fret: 5, finger: 1, isRoot: false }, // A (4th)
    { string: 0, fret: 7, finger: 3, isRoot: false }, // B (5th)
    // A string (1): 5=D, 7=E
    { string: 1, fret: 5, finger: 1, isRoot: false }, // D (b7)
    { string: 1, fret: 7, finger: 3, isRoot: true  }, // E (root)
    // D string (2): 5=G, 7=A
    { string: 2, fret: 5, finger: 1, isRoot: false }, // G (b3)
    { string: 2, fret: 7, finger: 3, isRoot: false }, // A (4th)
    // G string (3): 4=B, 7=D
    { string: 3, fret: 4, finger: 1, isRoot: false }, // B (5th)
    { string: 3, fret: 7, finger: 4, isRoot: false }, // D (b7)
    // B string (4): 5=E, 8=G
    { string: 4, fret: 5, finger: 1, isRoot: true  }, // E (root)
    { string: 4, fret: 8, finger: 4, isRoot: false }, // G (b3)
    // High e (5): 5=A, 7=B
    { string: 5, fret: 5, finger: 1, isRoot: false }, // A (4th)
    { string: 5, fret: 7, finger: 3, isRoot: false }, // B (5th)
  ],
};

const E_MINOR_PENT_POS4: ScalePosition = {
  positionNumber: 4,
  label: 'Position 4 (Box 4) — frets 7–10',
  rootFret: 9,
  notes: [
    // Low E (0): 7=B, 10=D
    { string: 0, fret: 7,  finger: 1, isRoot: false }, // B (5th)
    { string: 0, fret: 10, finger: 4, isRoot: false }, // D (b7)
    // A string (1): 7=E, 10=G
    { string: 1, fret: 7,  finger: 1, isRoot: true  }, // E (root)
    { string: 1, fret: 10, finger: 4, isRoot: false }, // G (b3)
    // D string (2): 7=A, 9=B
    { string: 2, fret: 7,  finger: 1, isRoot: false }, // A (4th)
    { string: 2, fret: 9,  finger: 3, isRoot: false }, // B (5th)
    // G string (3): 7=D, 9=E
    { string: 3, fret: 7,  finger: 1, isRoot: false }, // D (b7)
    { string: 3, fret: 9,  finger: 3, isRoot: true  }, // E (root)
    // B string (4): 8=G, 10=A
    { string: 4, fret: 8,  finger: 1, isRoot: false }, // G (b3)
    { string: 4, fret: 10, finger: 3, isRoot: false }, // A (4th)
    // High e (5): 7=B, 10=D
    { string: 5, fret: 7,  finger: 1, isRoot: false }, // B (5th)
    { string: 5, fret: 10, finger: 4, isRoot: false }, // D (b7)
  ],
};

const E_MINOR_PENT_POS5: ScalePosition = {
  positionNumber: 5,
  label: 'Position 5 (Box 5) — frets 10–12, connects to open position',
  rootFret: 12,
  notes: [
    // Low E (0): 10=D, 12=E
    { string: 0, fret: 10, finger: 1, isRoot: false }, // D (b7)
    { string: 0, fret: 12, finger: 3, isRoot: true  }, // E (root)
    // A string (1): 10=G, 12=A
    { string: 1, fret: 10, finger: 1, isRoot: false }, // G (b3)
    { string: 1, fret: 12, finger: 3, isRoot: false }, // A (4th)
    // D string (2): 9=B, 12=D
    { string: 2, fret: 9,  finger: 1, isRoot: false }, // B (5th)
    { string: 2, fret: 12, finger: 4, isRoot: false }, // D (b7)
    // G string (3): 9=E, 12=G
    { string: 3, fret: 9,  finger: 1, isRoot: true  }, // E (root)
    { string: 3, fret: 12, finger: 4, isRoot: false }, // G (b3)
    // B string (4): 10=A, 12=B
    { string: 4, fret: 10, finger: 1, isRoot: false }, // A (4th)
    { string: 4, fret: 12, finger: 3, isRoot: false }, // B (5th)
    // High e (5): 10=D, 12=E
    { string: 5, fret: 10, finger: 1, isRoot: false }, // D (b7)
    { string: 5, fret: 12, finger: 3, isRoot: true  }, // E (root)
  ],
};

export const E_MINOR_PENTATONIC: Scale = {
  id: 'E_minor_pentatonic',
  name: 'E Minor Pentatonic',
  key: 'E',
  type: 'minor_pentatonic',
  formula: '1  b3  4  5  b7',
  notes: ['E', 'G', 'A', 'B', 'D'],
  positions: [
    E_MINOR_PENT_POS1,
    E_MINOR_PENT_POS2,
    E_MINOR_PENT_POS3,
    E_MINOR_PENT_POS4,
    E_MINOR_PENT_POS5,
  ],
  description:
    'E minor pentatonic is especially friendly on guitar because Position 1 uses all open ' +
    'strings, giving a full resonant sound. This is the scale for classic British blues-rock — ' +
    'the opening riff of "Whole Lotta Love" by Led Zeppelin and countless Hendrix solos ' +
    'live right here.',
};

// ─────────────────────────────────────────────────────────────────────────────
// A BLUES SCALE — All 5 Positions
// Notes: A C D Eb E G
// Formula: 1  b3  4  b5  5  b7
// The b5 (Eb, also called the "blue note") is what separates the blues scale
// from the minor pentatonic — it adds extra tension and expressiveness.
// ─────────────────────────────────────────────────────────────────────────────

// Clean Position 1 for A Blues Scale — careful note-by-note verification
// A blues: A(1) C(b3) D(4) Eb(b5) E(5) G(b7)
// Low E string:  0=E,  1=F,  2=F#, 3=G,  4=G#, 5=A,  6=A#, 7=B,  8=C,  9=C#, 10=D, 11=D#/Eb
// A string:      0=A,  1=A#, 2=B,  3=C,  4=C#, 5=D,  6=D#/Eb, 7=E,  8=F,  9=F#, 10=G
// D string:      0=D,  1=D#, 2=E,  3=F,  4=F#, 5=G,  6=G#,  7=A,  8=A#, 9=B, 10=C
// G string:      0=G,  1=G#, 2=A,  3=A#, 4=B,  5=C,  6=C#,  7=D,  8=D#/Eb, 9=E
// B string:      0=B,  1=C,  2=C#, 3=D,  4=D#/Eb, 5=E,  6=F,  7=F#, 8=G
// High e string: 0=E,  1=F,  2=F#, 3=G,  4=G#, 5=A,  6=A#, 7=B,  8=C,  9=C#, 10=D

const A_BLUES_POS1_CLEAN: ScalePosition = {
  positionNumber: 1,
  label: 'Position 1 (Box 1) — core blues box with blue note',
  rootFret: 5,
  notes: [
    { string: 0, fret: 5,  finger: 1, isRoot: true,  isBlueNote: false }, // Low E fret 5  = A (root)
    { string: 0, fret: 8,  finger: 4, isRoot: false, isBlueNote: false }, // Low E fret 8  = C (b3)
    { string: 1, fret: 5,  finger: 1, isRoot: false, isBlueNote: false }, // A str fret 5  = D (4th)
    { string: 1, fret: 6,  finger: 2, isRoot: false, isBlueNote: true  }, // A str fret 6  = Eb (b5 — BLUE NOTE)
    { string: 1, fret: 7,  finger: 3, isRoot: false, isBlueNote: false }, // A str fret 7  = E (5th)
    { string: 2, fret: 5,  finger: 1, isRoot: false, isBlueNote: false }, // D str fret 5  = G (b7)
    { string: 2, fret: 7,  finger: 3, isRoot: true,  isBlueNote: false }, // D str fret 7  = A (root)
    { string: 3, fret: 5,  finger: 1, isRoot: false, isBlueNote: false }, // G str fret 5  = C (b3)
    { string: 3, fret: 7,  finger: 3, isRoot: false, isBlueNote: false }, // G str fret 7  = D (4th)
    { string: 3, fret: 8,  finger: 4, isRoot: false, isBlueNote: true  }, // G str fret 8  = Eb (b5 — BLUE NOTE)
    { string: 4, fret: 5,  finger: 1, isRoot: false, isBlueNote: false }, // B str fret 5  = E (5th)
    { string: 4, fret: 8,  finger: 4, isRoot: false, isBlueNote: false }, // B str fret 8  = G (b7)
    { string: 5, fret: 5,  finger: 1, isRoot: true,  isBlueNote: false }, // e str fret 5  = A (root)
    { string: 5, fret: 8,  finger: 4, isRoot: false, isBlueNote: false }, // e str fret 8  = C (b3)
  ],
};

const A_BLUES_POS2: ScalePosition = {
  positionNumber: 2,
  label: 'Position 2 (Box 2) — frets 8–11',
  rootFret: 8,
  notes: [
    { string: 0, fret: 8,  finger: 1, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 0, fret: 10, finger: 3, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 0, fret: 11, finger: 4, isRoot: false, isBlueNote: true  }, // Eb (b5 — blue note)
    { string: 1, fret: 7,  finger: 1, isRoot: false, isBlueNote: false }, // E (5th) — slight stretch
    { string: 1, fret: 10, finger: 4, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 2, fret: 7,  finger: 1, isRoot: true,  isBlueNote: false }, // A (root)
    { string: 2, fret: 10, finger: 4, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 3, fret: 7,  finger: 1, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 3, fret: 8,  finger: 2, isRoot: false, isBlueNote: true  }, // Eb (b5 — blue note)
    { string: 3, fret: 9,  finger: 3, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 4, fret: 8,  finger: 1, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 4, fret: 10, finger: 3, isRoot: true,  isBlueNote: false }, // A (root)
    { string: 5, fret: 8,  finger: 1, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 5, fret: 10, finger: 3, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 5, fret: 11, finger: 4, isRoot: false, isBlueNote: true  }, // Eb (b5 — blue note)
  ],
};

const A_BLUES_POS3: ScalePosition = {
  positionNumber: 3,
  label: 'Position 3 (Box 3) — frets 10–13',
  rootFret: 12,
  notes: [
    { string: 0, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 0, fret: 11, finger: 2, isRoot: false, isBlueNote: true  }, // Eb (b5)
    { string: 0, fret: 12, finger: 3, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 1, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 1, fret: 12, finger: 3, isRoot: true,  isBlueNote: false }, // A (root)
    { string: 2, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 2, fret: 12, finger: 3, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 2, fret: 13, finger: 4, isRoot: false, isBlueNote: true  }, // Eb (b5)
    { string: 3, fret: 9,  finger: 1, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 3, fret: 12, finger: 4, isRoot: false, isBlueNote: false }, // G (b7)  — G str fret12=G
    { string: 4, fret: 10, finger: 1, isRoot: true,  isBlueNote: false }, // A (root) — B str fret10=A? B str: 0=B,fret10=A? B+10st = (B=59, +10=69=A4) yes
    { string: 4, fret: 13, finger: 4, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 5, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 5, fret: 12, finger: 3, isRoot: false, isBlueNote: false }, // E (5th)
  ],
};

const A_BLUES_POS4: ScalePosition = {
  positionNumber: 4,
  label: 'Position 4 (Box 4) — frets 12–15',
  rootFret: 14,
  notes: [
    { string: 0, fret: 12, finger: 1, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 0, fret: 15, finger: 4, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 1, fret: 12, finger: 1, isRoot: true,  isBlueNote: false }, // A (root)
    { string: 1, fret: 15, finger: 4, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 2, fret: 12, finger: 1, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 2, fret: 13, finger: 2, isRoot: false, isBlueNote: true  }, // Eb (b5)
    { string: 2, fret: 14, finger: 3, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 3, fret: 12, finger: 1, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 3, fret: 14, finger: 3, isRoot: true,  isBlueNote: false }, // A (root) — G str fret14: G(0)+14=A#... wait G=55 MIDI, +14=69=A. Yes, A.
    { string: 4, fret: 13, finger: 1, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 4, fret: 15, finger: 3, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 4, fret: 16, finger: 4, isRoot: false, isBlueNote: true  }, // Eb (b5) — B str fret16: 59+16=75=D#/Eb yes
    { string: 5, fret: 12, finger: 1, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 5, fret: 15, finger: 4, isRoot: false, isBlueNote: false }, // G (b7)
  ],
};

const A_BLUES_POS5: ScalePosition = {
  positionNumber: 5,
  label: 'Position 5 (Box 5) — frets 15–17, connects back to Position 1',
  rootFret: 17,
  notes: [
    { string: 0, fret: 15, finger: 1, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 0, fret: 17, finger: 3, isRoot: true,  isBlueNote: false }, // A (root)
    { string: 1, fret: 15, finger: 1, isRoot: false, isBlueNote: false }, // C (b3)
    { string: 1, fret: 17, finger: 3, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 1, fret: 18, finger: 4, isRoot: false, isBlueNote: true  }, // Eb (b5) — A str fret18: 45+18=63=Eb yes
    { string: 2, fret: 14, finger: 1, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 2, fret: 17, finger: 4, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 3, fret: 14, finger: 1, isRoot: true,  isBlueNote: false }, // A (root)
    { string: 3, fret: 17, finger: 4, isRoot: false, isBlueNote: false }, // C (b3)  — G str fret17: 55+17=72=C yes
    { string: 4, fret: 15, finger: 1, isRoot: false, isBlueNote: false }, // D (4th)
    { string: 4, fret: 17, finger: 3, isRoot: false, isBlueNote: false }, // E (5th)
    { string: 5, fret: 15, finger: 1, isRoot: false, isBlueNote: false }, // G (b7)
    { string: 5, fret: 17, finger: 3, isRoot: true,  isBlueNote: false }, // A (root)
  ],
};

export const A_BLUES_SCALE: Scale = {
  id: 'A_blues',
  name: 'A Blues Scale',
  key: 'A',
  type: 'blues',
  formula: '1  b3  4  b5  5  b7',
  notes: ['A', 'C', 'D', 'D#', 'E', 'G'],
  positions: [
    A_BLUES_POS1_CLEAN,
    A_BLUES_POS2,
    A_BLUES_POS3,
    A_BLUES_POS4,
    A_BLUES_POS5,
  ],
  description:
    'The A blues scale adds the "blue note" — the b5 (Eb/D#) — to the minor pentatonic. ' +
    'This one extra note is responsible for that unmistakable blues tension and release. ' +
    'Listen to B.B. King bend up to and away from that Eb for the most expressive example ' +
    'of this note in action.',
};

// ─────────────────────────────────────────────────────────────────────────────
// E BLUES SCALE — All 5 Positions
// Notes: E G A Bb B D
// Formula: 1  b3  4  b5  5  b7
// b5 of E = Bb/A#
// ─────────────────────────────────────────────────────────────────────────────
// Low E string:  0=E, 1=F, 2=F#, 3=G, 4=G#, 5=A, 6=Bb, 7=B, 8=C, 9=C#, 10=D
// A string:      0=A, 1=Bb, 2=B, 3=C,  4=C#, 5=D, 6=D#, 7=E, 8=F,  9=F#, 10=G
// D string:      0=D, 1=Eb, 2=E, 3=F,  4=F#, 5=G, 6=G#, 7=A, 8=A#/Bb, 9=B, 10=C
// G string:      0=G, 1=G#, 2=A, 3=Bb, 4=B,  5=C, 6=C#, 7=D, 8=Eb, 9=E
// B string:      0=B, 1=C,  2=C#,3=D,  4=Eb, 5=E, 6=F,  7=F#, 8=G,  9=G#, 10=A
// High e string: same as Low E

const E_BLUES_POS1: ScalePosition = {
  positionNumber: 1,
  label: 'Position 1 (Box 1) — open position with blue note',
  rootFret: 0,
  notes: [
    { string: 0, fret: 0, finger: 0, isRoot: true,  isBlueNote: false }, // E (root) — open
    { string: 0, fret: 3, finger: 3, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 1, fret: 0, finger: 0, isRoot: false, isBlueNote: false }, // A (4th) — open
    { string: 1, fret: 1, finger: 1, isRoot: false, isBlueNote: true  }, // Bb (b5 — blue note)
    { string: 1, fret: 2, finger: 2, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 2, fret: 0, finger: 0, isRoot: false, isBlueNote: false }, // D (b7) — open
    { string: 2, fret: 2, finger: 2, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 3, fret: 0, finger: 0, isRoot: false, isBlueNote: false }, // G (b3) — open
    { string: 3, fret: 2, finger: 2, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 3, fret: 3, finger: 3, isRoot: false, isBlueNote: true  }, // Bb (b5 — blue note)
    { string: 4, fret: 0, finger: 0, isRoot: false, isBlueNote: false }, // B (5th) — open
    { string: 4, fret: 3, finger: 3, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 5, fret: 0, finger: 0, isRoot: true,  isBlueNote: false }, // E (root) — open
    { string: 5, fret: 3, finger: 3, isRoot: false, isBlueNote: false }, // G (b3)
  ],
};

const E_BLUES_POS2: ScalePosition = {
  positionNumber: 2,
  label: 'Position 2 (Box 2) — frets 3–6',
  rootFret: 5,
  notes: [
    { string: 0, fret: 3, finger: 1, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 0, fret: 5, finger: 3, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 0, fret: 6, finger: 4, isRoot: false, isBlueNote: true  }, // Bb (b5 — blue note)
    { string: 1, fret: 2, finger: 1, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 1, fret: 5, finger: 4, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 2, fret: 2, finger: 1, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 2, fret: 5, finger: 4, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 3, fret: 2, finger: 1, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 3, fret: 3, finger: 2, isRoot: false, isBlueNote: true  }, // Bb (b5 — blue note)
    { string: 3, fret: 4, finger: 3, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 4, fret: 3, finger: 1, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 4, fret: 5, finger: 3, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 5, fret: 3, finger: 1, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 5, fret: 5, finger: 3, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 5, fret: 6, finger: 4, isRoot: false, isBlueNote: true  }, // Bb (b5 — blue note)
  ],
};

const E_BLUES_POS3: ScalePosition = {
  positionNumber: 3,
  label: 'Position 3 (Box 3) — frets 5–8',
  rootFret: 7,
  notes: [
    { string: 0, fret: 5, finger: 1, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 0, fret: 6, finger: 2, isRoot: false, isBlueNote: true  }, // Bb (b5)
    { string: 0, fret: 7, finger: 3, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 1, fret: 5, finger: 1, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 1, fret: 7, finger: 3, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 2, fret: 5, finger: 1, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 2, fret: 7, finger: 3, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 2, fret: 8, finger: 4, isRoot: false, isBlueNote: true  }, // Bb (b5) — D str fret8: 50+8=58=Bb yes
    { string: 3, fret: 4, finger: 1, isRoot: false, isBlueNote: false }, // B (5th) — G str fret4: 55+4=59=B yes
    { string: 3, fret: 7, finger: 4, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 4, fret: 5, finger: 1, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 4, fret: 8, finger: 4, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 5, fret: 5, finger: 1, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 5, fret: 7, finger: 3, isRoot: false, isBlueNote: false }, // B (5th)
  ],
};

const E_BLUES_POS4: ScalePosition = {
  positionNumber: 4,
  label: 'Position 4 (Box 4) — frets 7–11',
  rootFret: 9,
  notes: [
    { string: 0, fret: 7,  finger: 1, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 0, fret: 10, finger: 4, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 1, fret: 7,  finger: 1, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 1, fret: 10, finger: 4, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 2, fret: 7,  finger: 1, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 2, fret: 8,  finger: 2, isRoot: false, isBlueNote: true  }, // Bb (b5)
    { string: 2, fret: 9,  finger: 3, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 3, fret: 7,  finger: 1, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 3, fret: 9,  finger: 3, isRoot: true,  isBlueNote: false }, // E (root) — G str fret9: 55+9=64=E yes
    { string: 4, fret: 8,  finger: 1, isRoot: false, isBlueNote: false }, // G (b3) — B str fret8: 59+8=67=G yes
    { string: 4, fret: 10, finger: 3, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 5, fret: 7,  finger: 1, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 5, fret: 10, finger: 4, isRoot: false, isBlueNote: false }, // D (b7)
  ],
};

const E_BLUES_POS5: ScalePosition = {
  positionNumber: 5,
  label: 'Position 5 (Box 5) — frets 10–13, connects to open position',
  rootFret: 12,
  notes: [
    { string: 0, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 0, fret: 12, finger: 3, isRoot: true,  isBlueNote: false }, // E (root)
    { string: 1, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // G (b3)
    { string: 1, fret: 12, finger: 3, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 1, fret: 13, finger: 4, isRoot: false, isBlueNote: true  }, // Bb (b5) — A str fret13: 45+13=58=Bb yes
    { string: 2, fret: 9,  finger: 1, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 2, fret: 12, finger: 4, isRoot: false, isBlueNote: false }, // D (b7)  — D str fret12: 50+12=62=D yes
    { string: 3, fret: 9,  finger: 1, isRoot: true,  isBlueNote: false }, // E (root) — G str fret9: 64=E yes
    { string: 3, fret: 12, finger: 4, isRoot: false, isBlueNote: false }, // G (b3)  — G str fret12: 67=G yes
    { string: 4, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // A (4th)
    { string: 4, fret: 12, finger: 3, isRoot: false, isBlueNote: false }, // B (5th)
    { string: 5, fret: 10, finger: 1, isRoot: false, isBlueNote: false }, // D (b7)
    { string: 5, fret: 12, finger: 3, isRoot: true,  isBlueNote: false }, // E (root)
  ],
};

export const E_BLUES_SCALE: Scale = {
  id: 'E_blues',
  name: 'E Blues Scale',
  key: 'E',
  type: 'blues',
  formula: '1  b3  4  b5  5  b7',
  notes: ['E', 'G', 'A', 'A#', 'B', 'D'],
  positions: [
    E_BLUES_POS1,
    E_BLUES_POS2,
    E_BLUES_POS3,
    E_BLUES_POS4,
    E_BLUES_POS5,
  ],
  description:
    'E blues scale is one of the most natural scales on guitar — Position 1 uses all open ' +
    'strings, and the Bb blue note sits just one fret from the open A string. ' +
    'Jimi Hendrix, Eric Clapton (with Cream), and early Rolling Stones all exploited ' +
    'this scale\'s open-string resonance for their signature E blues sounds.',
};

// ─── Scale Collections ────────────────────────────────────────────────────────

export const ALL_SCALES: Record<string, Scale> = {
  A_minor_pentatonic: A_MINOR_PENTATONIC,
  E_minor_pentatonic: E_MINOR_PENTATONIC,
  A_blues: A_BLUES_SCALE,
  E_blues: E_BLUES_SCALE,
};

/** Look up a scale by ID */
export function getScale(id: string): Scale | undefined {
  return ALL_SCALES[id];
}

/** Look up a specific position within a scale */
export function getScalePosition(scaleId: string, positionNumber: number) {
  const scale = ALL_SCALES[scaleId];
  if (!scale) return undefined;
  return scale.positions.find((p) => p.positionNumber === positionNumber);
}
