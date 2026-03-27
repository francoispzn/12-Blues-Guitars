import type { ChromaticNote, NoteInfo, StringIndex } from './types';

// ─── Chromatic Scale ──────────────────────────────────────────────────────────

/**
 * All 12 chromatic notes in ascending order starting from C.
 * We use sharps throughout for consistency.
 */
export const CHROMATIC_NOTES: ChromaticNote[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
];

/**
 * Enharmonic equivalents — maps flat names to their sharp equivalents.
 * Useful when resolving user input or display preferences.
 */
export const ENHARMONIC_MAP: Record<string, ChromaticNote> = {
  Bb: 'A#',
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
};

// ─── Standard Tuning ──────────────────────────────────────────────────────────

/**
 * Standard tuning open-string notes, indexed from low E to high e.
 * Index 0 = String 6 (low E2), Index 5 = String 1 (high E4).
 *
 * MIDI note numbers:
 *   E2  = 40
 *   A2  = 45
 *   D3  = 50
 *   G3  = 55
 *   B3  = 59
 *   E4  = 64
 */
export interface OpenStringNote {
  name: ChromaticNote;
  octave: number;
  midi: number;
  /** Human-readable string label, e.g. "String 6 (low E)" */
  label: string;
}

export const STANDARD_TUNING: OpenStringNote[] = [
  { name: 'E', octave: 2, midi: 40, label: 'String 6 (low E)' },
  { name: 'A', octave: 2, midi: 45, label: 'String 5 (A)' },
  { name: 'D', octave: 3, midi: 50, label: 'String 4 (D)' },
  { name: 'G', octave: 3, midi: 55, label: 'String 3 (G)' },
  { name: 'B', octave: 3, midi: 59, label: 'String 2 (B)' },
  { name: 'E', octave: 4, midi: 64, label: 'String 1 (high e)' },
];

// ─── Core Utility Functions ───────────────────────────────────────────────────

/**
 * Converts a MIDI note number to its frequency in Hz.
 * A4 (MIDI 69) = 440 Hz.
 *
 * @param midi - MIDI note number (0–127)
 * @returns Frequency in Hz
 *
 * @example
 * midiToFrequency(69)  // 440 (A4)
 * midiToFrequency(40)  // ~82.41 (E2, low E string)
 */
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Returns the MIDI note number for a given string and fret.
 * @param string - String index 0–5 (0 = low E)
 * @param fret   - Fret number 0–24 (0 = open)
 */
export function getMidiNote(string: StringIndex, fret: number): number {
  return STANDARD_TUNING[string].midi + fret;
}

/**
 * Returns the chromatic note name (without octave) at a given string and fret.
 *
 * @param string - String index 0–5 (0 = low E)
 * @param fret   - Fret number 0–24
 * @returns Note name, e.g. "A", "C#"
 *
 * @example
 * getNoteAtFret(0, 0)  // "E" (open low E string)
 * getNoteAtFret(0, 5)  // "A"
 * getNoteAtFret(1, 2)  // "B"
 * getNoteAtFret(4, 1)  // "C"
 */
export function getNoteAtFret(string: number, fret: number): string {
  if (string < 0 || string > 5) {
    throw new RangeError(`String index must be 0–5, got ${string}`);
  }
  if (fret < 0 || fret > 24) {
    throw new RangeError(`Fret must be 0–24, got ${fret}`);
  }
  const openNoteIndex = CHROMATIC_NOTES.indexOf(STANDARD_TUNING[string].name);
  const noteIndex = (openNoteIndex + fret) % 12;
  return CHROMATIC_NOTES[noteIndex];
}

/**
 * Returns full note info (name, octave, midi) at a given string and fret.
 */
export function getNoteInfoAtFret(string: StringIndex, fret: number): NoteInfo {
  const openString = STANDARD_TUNING[string];
  const midi = openString.midi + fret;
  const noteIndex = midi % 12;
  // C is MIDI 0 mod 12; map MIDI note index to chromatic array (C=0)
  const name = CHROMATIC_NOTES[noteIndex] as ChromaticNote;
  const octave = Math.floor(midi / 12) - 1; // MIDI 0 = C-1
  return {
    note: `${name}${octave}`,
    name,
    midi,
    octave,
    fret,
    string,
  };
}

/**
 * Returns the note name with octave at a given string and fret.
 * @example getNoteWithOctave(0, 0) → "E2"
 */
export function getNoteWithOctave(string: StringIndex, fret: number): string {
  const info = getNoteInfoAtFret(string, fret);
  return info.note;
}

// ─── Fretboard Map ────────────────────────────────────────────────────────────

/**
 * Pre-computed fretboard note names for frets 0–12 on all 6 strings.
 * Access: FRETBOARD[stringIndex][fret]
 *
 * Indexed as:
 *   FRETBOARD[0] = low E string (E2 through E3)
 *   FRETBOARD[5] = high e string (E4 through E5)
 */
export const FRETBOARD: ChromaticNote[][] = STANDARD_TUNING.map((openString) => {
  return Array.from({ length: 13 }, (_, fret) => {
    const openIndex = CHROMATIC_NOTES.indexOf(openString.name);
    return CHROMATIC_NOTES[(openIndex + fret) % 12];
  });
});

/**
 * Full fretboard with MIDI and octave info for frets 0–12.
 * Access: FRETBOARD_INFO[stringIndex][fret]
 */
export const FRETBOARD_INFO: NoteInfo[][] = (STANDARD_TUNING as OpenStringNote[]).map(
  (_, stringIdx) => {
    return Array.from({ length: 13 }, (_, fret) =>
      getNoteInfoAtFret(stringIdx as StringIndex, fret),
    );
  },
);

// ─── Helper: Find all fret positions for a note ───────────────────────────────

/**
 * Finds all positions on the fretboard (frets 0–12) where a given note name appears.
 * Useful for highlighting all instances of a scale note.
 *
 * @param noteName - Chromatic note name, e.g. "A" or "C#"
 * @returns Array of {string, fret} pairs
 */
export function findNotePositions(
  noteName: ChromaticNote,
): Array<{ string: StringIndex; fret: number }> {
  const positions: Array<{ string: StringIndex; fret: number }> = [];
  for (let s = 0; s < 6; s++) {
    for (let f = 0; f <= 12; f++) {
      if (getNoteAtFret(s, f) === noteName) {
        positions.push({ string: s as StringIndex, fret: f });
      }
    }
  }
  return positions;
}

/**
 * Returns the interval name between two chromatic notes.
 * @param root  - Root note
 * @param note  - Target note
 * @returns Interval number in semitones (0–11)
 */
export function getSemitoneInterval(root: ChromaticNote, note: ChromaticNote): number {
  const rootIdx = CHROMATIC_NOTES.indexOf(root);
  const noteIdx = CHROMATIC_NOTES.indexOf(note);
  return (noteIdx - rootIdx + 12) % 12;
}

// ─── Quick-reference: Open String Notes ──────────────────────────────────────

/** Shorthand note names for all 6 open strings, low to high */
export const OPEN_STRINGS_LOW_TO_HIGH = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] as const;

/** Open string note names without octave, low to high */
export const OPEN_STRING_NAMES: ChromaticNote[] = ['E', 'A', 'D', 'G', 'B', 'E'];
