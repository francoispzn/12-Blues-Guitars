// ─── Guitar String & Fret Primitives ─────────────────────────────────────────

/**
 * Guitar string index: 0 = low E (thickest), 5 = high e (thinnest).
 * Matches standard physical string numbering inverted for array indexing:
 *   string 0 → String 6 (low E2)
 *   string 5 → String 1 (high E4)
 */
export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

/** Finger number: 1 = index, 2 = middle, 3 = ring, 4 = pinky, 0 = open/thumb */
export type Finger = 0 | 1 | 2 | 3 | 4;

/** The 12 chromatic note names using sharps */
export type ChromaticNote =
  | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
  | 'C' | 'C#' | 'D' | 'D#';

// ─── Notes ───────────────────────────────────────────────────────────────────

export interface NoteInfo {
  /** Note name with octave, e.g. "A2", "C#3" */
  note: string;
  /** Note name without octave, e.g. "A", "C#" */
  name: ChromaticNote;
  /** MIDI note number (A4 = 69) */
  midi: number;
  /** Octave number */
  octave: number;
  /** Fret number (0 = open) */
  fret: number;
  /** String index (0 = low E) */
  string: StringIndex;
}

// ─── Chords ───────────────────────────────────────────────────────────────────

/** A single fretted note within a chord voicing */
export interface ChordPosition {
  /** String index: 0 = low E, 5 = high e */
  string: StringIndex;
  /** Fret number (0 = open string) */
  fret: number;
  /** Finger used to press this note (0 = open) */
  finger: Finger;
}

/** A barre that covers multiple strings at a single fret */
export interface Barre {
  /** Fret where the barre is applied */
  fret: number;
  /** Lowest string index covered by the barre (0 = low E) */
  fromString: StringIndex;
  /** Highest string index covered by the barre (5 = high e) */
  toString: StringIndex;
}

export type ChordType = 'major' | 'minor' | 'dominant7' | 'minor7' | 'major7' | 'power';
export type ChordVoicing = 'open' | 'barre' | 'partial';

export interface Chord {
  /** Unique identifier, e.g. "E", "A7", "Bm_barre" */
  id: string;
  /** Display name, e.g. "E Major", "A7", "B7" */
  name: string;
  /** Root note of the chord */
  root: ChromaticNote;
  /** Chord quality */
  type: ChordType;
  /** Open or barre voicing */
  voicing: ChordVoicing;
  /** Finger placements (excludes open strings and muted strings) */
  positions: ChordPosition[];
  /** Optional barre markings */
  barres?: Barre[];
  /** String indices that are not played (muted or skipped) */
  mutedStrings: StringIndex[];
  /** Description of the chord's role in blues music */
  description: string;
}

// ─── Scales ───────────────────────────────────────────────────────────────────

/** A single note within a scale diagram position */
export interface ScaleNote {
  /** String index: 0 = low E, 5 = high e */
  string: StringIndex;
  /** Fret number */
  fret: number;
  /** Suggested fretting finger */
  finger: Finger;
  /** Whether this note is the root of the scale */
  isRoot: boolean;
  /** Whether this is the characteristic "blue note" (b5) */
  isBlueNote?: boolean;
}

export type ScaleType = 'minor_pentatonic' | 'major_pentatonic' | 'blues' | 'major' | 'dorian';

/** One positional box of a scale on the fretboard */
export interface ScalePosition {
  /** Position number (1–5 for CAGED-based pentatonic positions) */
  positionNumber: number;
  /** Label shown to the learner, e.g. "Position 1 (Box 1)" */
  label: string;
  /** Lowest fret in this position (root reference point) */
  rootFret: number;
  /** All notes in this position */
  notes: ScaleNote[];
}

export interface Scale {
  /** Unique identifier, e.g. "Am_pentatonic_pos1" */
  id: string;
  /** Display name, e.g. "A Minor Pentatonic" */
  name: string;
  /** Root key */
  key: ChromaticNote;
  /** Scale type */
  type: ScaleType;
  /** All positional boxes for this scale */
  positions: ScalePosition[];
  /** Scale formula as intervals, e.g. "1 b3 4 5 b7" */
  formula: string;
  /** Notes in the scale (chromatic names) */
  notes: ChromaticNote[];
  /** Blues context description */
  description: string;
}

// ─── Lessons ─────────────────────────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/** A reference to a chord or scale to display alongside a lesson step */
export type ContentRef =
  | { type: 'chord'; id: string }
  | { type: 'scale'; id: string; positionNumber?: number }
  | { type: 'progression'; chordIds: string[]; beatsEach?: number };

export interface LessonStep {
  /** Step number within the lesson (1-based) */
  stepNumber: number;
  /** Short title for the step */
  title: string;
  /** Main instructional text (may contain markdown) */
  explanation: string;
  /** Optional chord/scale diagram to display */
  contentRef?: ContentRef;
  /** Actionable practice tips */
  tips: string[];
}

export interface LessonModule {
  /** Unique identifier, e.g. "module_1" */
  id: string;
  /** Display title */
  title: string;
  /** Short description shown in the module list */
  description: string;
  /** Skill level required */
  difficulty: Difficulty;
  /** Ordered lesson steps */
  steps: LessonStep[];
  /** Estimated time to complete in minutes */
  estimatedMinutes: number;
  /** IDs of chord data referenced in this module */
  referencedChords: string[];
  /** IDs of scale data referenced in this module */
  referencedScales: string[];
  /** Module number for ordering */
  moduleNumber: number;
}

// ─── Fretboard component convenience aliases ──────────────────────────────────

/**
 * A highlighted position on the fretboard (used by Fretboard and ChordDiagram).
 * Aliased from ChordPosition / ScaleNote for component prop ergonomics.
 */
export interface FretPosition {
  /** String index: 0 = low E, 5 = high e */
  string: number;
  /** Fret number (0 = open string) */
  fret: number;
  /** Suggested finger (1-4). Omit for scale highlights without finger hints. */
  finger?: number;
  /** Whether this note is the root of the chord or scale */
  isRoot?: boolean;
  /** Short label to display inside the dot (overrides finger number) */
  label?: string;
}

/**
 * Describes a barre chord bar across several strings at a single fret.
 */
export interface BarreInfo {
  fret: number;
  fromString: number;
  toString: number;
}

// ─── Aggregate / Store types ──────────────────────────────────────────────────

export interface GuitarDataStore {
  chords: Record<string, Chord>;
  scales: Record<string, Scale>;
  lessons: LessonModule[];
}
