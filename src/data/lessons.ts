import type { LessonModule, LessonStep } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1: Your First Blues Chords
// ─────────────────────────────────────────────────────────────────────────────

const MODULE_1_STEPS: LessonStep[] = [
  {
    stepNumber: 1,
    title: 'The E Major Chord — Your Foundation',
    explanation:
      'Every blues journey starts with E. This open chord uses all six strings and rings ' +
      'with a full, natural resonance that\'s been driving blues music since the Delta. ' +
      '\n\nPlace your middle finger on the A string (string 5) at fret 2, your ring finger on ' +
      'the D string (string 4) at fret 2, and your index finger on the G string (string 3) ' +
      'at fret 1. Let all other strings ring open. Strum slowly from low E to high e, ' +
      'listening to each note ring clearly.',
    contentRef: { type: 'chord', id: 'E' },
    tips: [
      'Arch your fingers so you don\'t accidentally mute the open strings below them.',
      'Press firmly but don\'t squeeze — excess tension causes fatigue and muffled notes.',
      'Check each string individually: if it buzzes or thuds, adjust your finger placement.',
      'The open low E string is your root note — make it ring loudly and clearly.',
    ],
  },
  {
    stepNumber: 2,
    title: 'The A Major Chord — The IV Chord',
    explanation:
      'A Major is the IV chord in E blues and the starting point for A blues. Three fingers ' +
      'cluster together at the 2nd fret of strings 2, 3, and 4, while the open A and high e ' +
      'strings ring free. The low E string is muted.\n\n' +
      'Index finger on D string fret 2, middle finger on G string fret 2, ring finger on ' +
      'B string fret 2. Mute the low E with the tip of your ring finger or by not strumming it.',
    contentRef: { type: 'chord', id: 'A' },
    tips: [
      'Try fretting all three notes with just your index finger (a mini barre at fret 2) — ' +
        'this makes the E→A chord change much faster.',
      'The A string (string 5) rings open — this is the root note of the chord.',
      'Don\'t accidentally catch the low E string when strumming. Start from the A string.',
      'Practice the E to A change slowly — this is the I→IV movement in E blues.',
    ],
  },
  {
    stepNumber: 3,
    title: 'E7 — Painting with Blues Colors',
    explanation:
      'E7 is E Major with one small but transformative change: lift your ring finger off ' +
      'the D string. Now the open D string rings, adding the "b7" interval (D is the b7 of E). ' +
      'This dominant 7th color is *the* sound of blues.\n\n' +
      'From your E Major shape, simply remove the finger on the D string (string 4, fret 2). ' +
      'Middle finger stays on A string fret 2, index finger stays on G string fret 1.',
    contentRef: { type: 'chord', id: 'E7' },
    tips: [
      'Compare E Major and E7 back and forth — hear how the b7 adds that bluesy tension.',
      'E7 doesn\'t "resolve" — it wants to move somewhere. That\'s what blues tension feels like.',
      'Most blues rhythm parts use E7, A7, and B7 rather than plain major chords.',
      'Try muting and releasing the D string while holding the chord shape to hear the difference.',
    ],
  },
  {
    stepNumber: 4,
    title: 'A7 — The IV7 Chord',
    explanation:
      'A7 follows the same logic as E7: it\'s A Major with the open G string (the b7 of A) ' +
      'ringing free. Remove your middle finger from the G string position.\n\n' +
      'Index finger on D string fret 2, ring finger on B string fret 2. ' +
      'The A, G, and high e strings all ring open. Mute the low E string.',
    contentRef: { type: 'chord', id: 'A7' },
    tips: [
      'The open G string is the b7 of A — this is what makes it dominant 7th.',
      'Practice A7 → E7 repeatedly — this is the IV→I movement in E blues.',
      'In A blues, A7 → D7 is the I→IV movement. Same feel, different key.',
      'The open G string gives A7 a slightly lighter, more "twangy" quality than a barre A7.',
    ],
  },
  {
    stepNumber: 5,
    title: 'B7 — The Tension Chord (V7)',
    explanation:
      'B7 is the V7 chord in E blues — the chord that creates the most tension and demands ' +
      'resolution back to E7. It\'s slightly more complex, requiring four fingers.\n\n' +
      'Mute the low E string. Index finger on D string fret 1, middle finger on A string ' +
      'fret 2, ring finger on G string fret 2, pinky on high e string fret 2. ' +
      'Let the open B string ring free.',
    contentRef: { type: 'chord', id: 'B7' },
    tips: [
      'This chord is a significant stretch for beginners — take it slowly and build muscle memory.',
      'The open B string is the root of the chord. Let it ring clearly.',
      'Practice B7 → E7 many times — this is the climax of every 12-bar blues.',
      'Once comfortable, practice the full sequence: E7 → A7 → E7 → B7 → A7 → E7.',
      'B7 should sound tense and exciting — if it does, you\'re playing it right.',
    ],
  },
  {
    stepNumber: 6,
    title: 'Chord Review — Putting the Five Together',
    explanation:
      'You now have five essential blues chords. Practice moving between them smoothly. ' +
      'The key is minimizing finger movement — keep fingers close to the strings between ' +
      'chords and move them as a unit when possible.\n\n' +
      'Suggested practice sequence: E7 (4 beats) → A7 (4 beats) → E7 (4 beats) → B7 (2 beats) ' +
      '→ A7 (2 beats) → E7 (4 beats). This is a condensed 12-bar blues.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'A7', 'E7', 'B7', 'A7', 'E7'],
      beatsEach: 4,
    },
    tips: [
      'Start at a pace where you can change chords cleanly — even 40 BPM is fine initially.',
      'Think about the next chord *before* you need to play it.',
      'Common shared fingers: E7 and A7 both use the index on G string fret 1 and D string fret 2 — ' +
        'keep those anchored and just move what changes.',
      'Record yourself and listen back — small inconsistencies become obvious in recordings.',
    ],
  },
];

export const MODULE_1: LessonModule = {
  id: 'module_1',
  moduleNumber: 1,
  title: 'Your First Blues Chords',
  description:
    'Learn the five essential open blues chords — E, A, E7, A7, and B7 — the building blocks ' +
    'of every classic 12-bar blues progression.',
  difficulty: 'beginner',
  estimatedMinutes: 30,
  referencedChords: ['E', 'A', 'E7', 'A7', 'B7'],
  referencedScales: [],
  steps: MODULE_1_STEPS,
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2: The 12-Bar Blues
// ─────────────────────────────────────────────────────────────────────────────

const MODULE_2_STEPS: LessonStep[] = [
  {
    stepNumber: 1,
    title: 'Understanding the 12-Bar Form',
    explanation:
      'The 12-bar blues is not just a chord progression — it\'s a *form*, a container that ' +
      'has held blues, jazz, and rock music for over a century. Every 12-bar blues follows ' +
      'the same harmonic skeleton:\n\n' +
      '**Bars 1–4:** I chord (the "home" chord — establishes the key)\n' +
      '**Bars 5–6:** IV chord (moves away, adds tension)\n' +
      '**Bars 7–8:** I chord (returns home briefly)\n' +
      '**Bar 9:** V chord (maximum tension)\n' +
      '**Bar 10:** IV chord (tension easing)\n' +
      '**Bars 11–12:** I chord + turnaround (sets up the repeat)\n\n' +
      'In E blues: I = E7, IV = A7, V = B7.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'E7', 'E7', 'E7', 'A7', 'A7', 'E7', 'E7', 'B7', 'A7', 'E7', 'B7'],
      beatsEach: 4,
    },
    tips: [
      'Count along: "one-two-three-four, two-two-three-four, three-two-three-four..." for all 12 bars.',
      'The "quick change" variation adds the IV chord in bar 2 — listen for this in recordings.',
      'Blues musicians communicate this structure without speaking — it\'s a shared language.',
      'Every blues song you hear — however complex — is either this form or a variation of it.',
    ],
  },
  {
    stepNumber: 2,
    title: 'Playing the 12-Bar in E — Slow Tempo',
    explanation:
      'Now play the full progression at a slow, steady tempo (60–80 BPM). Use downstrokes ' +
      'for now — one strum per beat, four beats per bar. Focus on clean chord changes ' +
      'and landing on beat 1 of each new chord.\n\n' +
      '| E7 | E7 | E7 | E7 |\n' +
      '| A7 | A7 | E7 | E7 |\n' +
      '| B7 | A7 | E7 | B7 |\n\n' +
      'The last bar (B7) is the "turnaround" — it pushes you back to the top of the form.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'E7', 'E7', 'E7', 'A7', 'A7', 'E7', 'E7', 'B7', 'A7', 'E7', 'B7'],
      beatsEach: 4,
    },
    tips: [
      'Use a metronome or drum track. Playing with a pulse is non-negotiable in blues.',
      'A slow, perfectly timed 12-bar sounds infinitely better than a fast, rushed one.',
      'Slightly accent beat 1 of each bar — this reinforces the harmonic structure.',
      'Once comfortable, try a shuffle rhythm: instead of even 8th notes, swing them (long-short).',
    ],
  },
  {
    stepNumber: 3,
    title: 'The Shuffle Feel',
    explanation:
      'Most blues is played with a "shuffle" feel. Written eighth notes are played unevenly: ' +
      'the first is longer, the second shorter — like a triplet where the first two notes are ' +
      'tied. This "long-short" pattern is the heartbeat of blues.\n\n' +
      'To practice: say "tri-PO-let, tri-PO-let" and accent the first and third syllable. ' +
      'That\'s the shuffle. Then apply it to your E7 chord: long strum, short strum, ' +
      'long strum, short strum.\n\n' +
      'Guitar notation: "♩♩♩♩" becomes "♪♬♪♬" (swing 8ths).',
    contentRef: { type: 'chord', id: 'E7' },
    tips: [
      'Listen to "Johnny B. Goode" (Chuck Berry) or "Hound Dog" for the classic shuffle pattern.',
      'The shuffle comes from your wrist and forearm rotation — don\'t just flick your fingers.',
      'Keep your down-up strumming motion continuous even when you don\'t hit the strings.',
      'Start at 70 BPM. The shuffle groove is more important than the speed.',
    ],
  },
  {
    stepNumber: 4,
    title: 'The "Quick Change" Variation',
    explanation:
      'Many blues songs use a "quick change" where the IV chord appears in bar 2 before ' +
      'returning to the I chord in bars 3–4. This adds momentum right from the start.\n\n' +
      'Quick change 12-bar in E:\n\n' +
      '| E7 | **A7** | E7 | E7 |\n' +
      '| A7 | A7 | E7 | E7 |\n' +
      '| B7 | A7 | E7 | B7 |\n\n' +
      'Compare both versions — the quick change sounds more "urgent" and is common in ' +
      'Chicago blues and jump blues styles.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'A7', 'E7', 'E7', 'A7', 'A7', 'E7', 'E7', 'B7', 'A7', 'E7', 'B7'],
      beatsEach: 4,
    },
    tips: [
      '"Rollin\' and Tumblin\'" (Muddy Waters) and "Pride and Joy" (Stevie Ray Vaughan) both use quick change.',
      'The jump from E7 to A7 and back in bars 1–3 is a smooth pivot — practice it in isolation.',
      'Quick change or not, the rest of the 12-bar form remains identical.',
    ],
  },
  {
    stepNumber: 5,
    title: '12-Bar Blues in A',
    explanation:
      'Now let\'s play the same form in the key of A. Everything shifts: the I chord is ' +
      'now A7, the IV chord is D7, and the V chord is E7.\n\n' +
      '| A7 | A7 | A7 | A7 |\n' +
      '| D7 | D7 | A7 | A7 |\n' +
      '| E7 | D7 | A7 | E7 |\n\n' +
      'You\'ll need to add the D7 chord to your vocabulary for this key.',
    contentRef: {
      type: 'progression',
      chordIds: ['A7', 'A7', 'A7', 'A7', 'D7', 'D7', 'A7', 'A7', 'E7', 'D7', 'A7', 'E7'],
      beatsEach: 4,
    },
    tips: [
      'Notice how E7 is now the *V chord* (turnaround) rather than the I chord.',
      'D7 uses only strings 1–4 (from D string to high e). Mute the low E and A strings.',
      'The relationships between I, IV, and V remain the same regardless of key.',
      'Knowing the blues in multiple keys lets you jam with singers who need different ranges.',
    ],
  },
];

export const MODULE_2: LessonModule = {
  id: 'module_2',
  moduleNumber: 2,
  title: 'The 12-Bar Blues',
  description:
    'Master the foundational 12-bar blues form in E and A. Understand the I-IV-V ' +
    'harmonic structure, the shuffle feel, and common variations like the quick change.',
  difficulty: 'beginner',
  estimatedMinutes: 40,
  referencedChords: ['E7', 'A7', 'B7', 'D7'],
  referencedScales: [],
  steps: MODULE_2_STEPS,
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3: Minor Pentatonic Scale
// ─────────────────────────────────────────────────────────────────────────────

const MODULE_3_STEPS: LessonStep[] = [
  {
    stepNumber: 1,
    title: 'Why Five Notes Rule the Blues',
    explanation:
      'The minor pentatonic scale has just five notes — yet it\'s the basis of virtually ' +
      'every blues solo ever recorded. These five notes avoid the "problem" notes that ' +
      'clash with the dominant 7th chords underneath, giving you a palette that works ' +
      'over the I7, IV7, and V7 chords simultaneously.\n\n' +
      'For A blues, those five notes are: **A – C – D – E – G**\n' +
      'Formula: Root (1) – b3 – 4 – 5 – b7\n\n' +
      'The "b3" (C over A) and "b7" (G over A) are the "blue" intervals — they create that ' +
      'characteristic tension between major and minor that defines the blues sound.',
    tips: [
      'The minor pentatonic scale works over ALL THREE chords in a blues — I7, IV7, and V7.',
      'B.B. King, Eric Clapton, Jimi Hendrix, and SRV all started here — with these 5 notes.',
      'Scale "positions" are just the same notes arranged for comfortable fingering across the neck.',
      'You don\'t need all 5 positions to play great blues — Position 1 alone is a complete toolkit.',
    ],
  },
  {
    stepNumber: 2,
    title: 'Position 1 (Box 1) — Your First Solo Territory',
    explanation:
      'Position 1 of A minor pentatonic sits between frets 5 and 8, with your index finger ' +
      'anchoring at fret 5. This "box" shape is the most widely used scale pattern in all ' +
      'of blues guitar.\n\n' +
      'Index finger covers fret 5, middle finger covers fret 6 (rarely used here), ' +
      'ring finger covers fret 7, and pinky covers fret 8.\n\n' +
      'The pattern repeats across all six strings. Learn it ascending (low E to high e) ' +
      'then descending, then in small fragments.',
    contentRef: { type: 'scale', id: 'A_minor_pentatonic', positionNumber: 1 },
    tips: [
      'The root note (A) is on string 0 fret 5, string 2 fret 7, and string 5 fret 5.',
      'Use alternate picking (down-up-down-up) from the start — it builds speed naturally.',
      'Don\'t just run up and down. Play fragments: strings 4-5, strings 2-3, strings 0-1.',
      'Learn where all three root notes are — they\'re your "home base" during a solo.',
      'This position alone is where "Sunshine of Your Love" solo, "Whole Lotta Love," ' +
        'and hundreds of other iconic riffs live.',
    ],
  },
  {
    stepNumber: 3,
    title: 'Bending and Vibrato in Position 1',
    explanation:
      'The minor pentatonic only becomes fully expressive when you add bends and vibrato. ' +
      'These techniques are what separate a mechanical scale run from actual blues phrasing.\n\n' +
      '**Whole-step bend:** On the G string (string 3) at fret 7, push the string upward ' +
      '(toward the ceiling) until the pitch rises by a whole step — from D to E. ' +
      'Support the bend with all three fingers behind the note.\n\n' +
      '**Vibrato:** After fretting any note, rapidly push and release the string with a ' +
      'controlled wobble. Vibrato adds sustain and emotion to held notes.',
    contentRef: { type: 'scale', id: 'A_minor_pentatonic', positionNumber: 1 },
    tips: [
      'The classic B.B. King move: play A on the high e (fret 5), then shake it with vibrato.',
      'Bend *in tune* — use a tuner to check that your whole-step bend reaches the target pitch.',
      'Push lighter strings (B and high e) upward. Push lower strings downward (toward the floor).',
      'Vibrato should come from your forearm rotation, not just your fingertip.',
      'Over-bending is as bad as under-bending. Aim for accuracy first, expressiveness second.',
    ],
  },
  {
    stepNumber: 4,
    title: 'Position 2 — Expanding Your Range',
    explanation:
      'Position 2 of A minor pentatonic spans roughly frets 7–10, connecting above Position 1. ' +
      'Your index finger now anchors at fret 7. The same five notes appear in a new ' +
      'geometric pattern that fits different hand positions on the neck.\n\n' +
      'The key insight: every position shares notes with the adjacent positions. The A on ' +
      'string 1 fret 7 (Position 2) is the same pitch as Position 1\'s top notes. ' +
      'Connecting positions creates "highways" up the neck.',
    contentRef: { type: 'scale', id: 'A_minor_pentatonic', positionNumber: 2 },
    tips: [
      'Don\'t abandon Position 1 for Position 2 — learn to flow between them.',
      'The overlap notes (shared between adjacent positions) are your pivot points.',
      'Slide from a Position 1 note into Position 2 to make the shift feel natural.',
      'Many players never leave Positions 1 and 2 during a blues — that\'s plenty of range.',
    ],
  },
  {
    stepNumber: 5,
    title: 'Positions 3, 4, and 5 — Full Neck Coverage',
    explanation:
      'Positions 3–5 extend the scale up the neck, eventually connecting back to Position 1 ' +
      'an octave higher. Together, all five positions cover the entire fretboard.\n\n' +
      'Position 3: frets 9–13\n' +
      'Position 4: frets 12–15\n' +
      'Position 5: frets 14–17 (connects to Position 1 an octave up at fret 17)\n\n' +
      'The experienced approach: don\'t memorize each box independently. Instead, think of ' +
      'the scale as one continuous pattern flowing across the neck.',
    contentRef: { type: 'scale', id: 'A_minor_pentatonic', positionNumber: 3 },
    tips: [
      'Start by linking just Positions 1 and 2, then add 3, then 4 and 5.',
      'Play a phrase in Position 1, then repeat the same phrase in Position 2 — same shape, new octave feel.',
      'B.B. King famously worked in a very small area (frets 5–8) but with incredible expression. ' +
        'Range isn\'t everything.',
      'The CAGED system is a complementary framework that explains *why* these positions connect.',
    ],
  },
];

export const MODULE_3: LessonModule = {
  id: 'module_3',
  moduleNumber: 3,
  title: 'The Minor Pentatonic Scale',
  description:
    'Learn all five positions of the A minor pentatonic scale — the universal language of ' +
    'blues lead guitar. From the foundational Box 1 through to full neck coverage, ' +
    'including bends and vibrato technique.',
  difficulty: 'beginner',
  estimatedMinutes: 45,
  referencedChords: [],
  referencedScales: ['A_minor_pentatonic', 'E_minor_pentatonic'],
  steps: MODULE_3_STEPS,
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4: The Blues Scale
// ─────────────────────────────────────────────────────────────────────────────

const MODULE_4_STEPS: LessonStep[] = [
  {
    stepNumber: 1,
    title: 'The Blue Note — What Makes Blues Sound Like Blues',
    explanation:
      'The blues scale adds one note to the minor pentatonic: the b5, also called the ' +
      '"blue note" or "devil\'s interval." In A blues, this note is Eb (D#).\n\n' +
      'The b5 sits *between* the 4th and 5th scale degrees — right in the middle of the ' +
      'minor pentatonic. It\'s dissonant, tense, and unresolved. Against the backdrop of ' +
      'a blues progression, this tension is not a mistake — it\'s the entire point.\n\n' +
      'Historical context: this note comes from the African-American blues tradition of ' +
      '"worrying" the pitch — sliding to, bending through, or hovering around notes that ' +
      'don\'t fit neatly in European scales.',
    tips: [
      'The blue note is most powerful as a passing tone — hit it briefly on the way to another note.',
      'Try: D (fret 5 on A string) → Eb (fret 6) → E (fret 7). That\'s the core blues lick.',
      'The b5 can also be held — but it creates maximum tension that needs release.',
      'In E blues the blue note is Bb — fret 1 on the A string, fret 3 on the G string.',
    ],
  },
  {
    stepNumber: 2,
    title: 'A Blues Scale — Position 1',
    explanation:
      'Position 1 of the A blues scale is identical to A minor pentatonic Position 1, ' +
      'with one addition: the Eb (blue note) appears on the A string between frets 5 and 7, ' +
      'and on the G string between frets 7 and 9.\n\n' +
      'The key lick: on the A string, play D (fret 5) → Eb (fret 6) → E (fret 7). ' +
      'This three-note phrase is foundational to virtually all blues guitar vocabulary. ' +
      'Play it slowly, bend the Eb slightly, and let the E ring.',
    contentRef: { type: 'scale', id: 'A_blues', positionNumber: 1 },
    tips: [
      'Blue notes in the diagram are highlighted — notice they sit between scale neighbors.',
      'The classic use: slide *up through* the Eb to reach the E — don\'t linger on it.',
      'Alternatively, *bend* the D up to Eb — a quarter-tone bend is very expressive.',
      'Listen to B.B. King\'s "The Thrill is Gone" — every other phrase uses this exact motion.',
    ],
  },
  {
    stepNumber: 3,
    title: 'Blues Scale Positions 2–5',
    explanation:
      'Just like the minor pentatonic, the blues scale exists in five positions across the ' +
      'neck. In each position, the blue note (Eb in A blues) appears at least once, always ' +
      'one fret above the 4th and one fret below the 5th of the scale.\n\n' +
      'The blue note\'s location: wherever you see the 4th (D) in your minor pentatonic ' +
      'position, the Eb is one fret higher. Find D, add Eb — that\'s it.',
    contentRef: { type: 'scale', id: 'A_blues', positionNumber: 2 },
    tips: [
      'You don\'t need to learn the blues scale separately — just add the one extra note to each position.',
      'The blue note appears most naturally on strings 1 (A string) and 3 (G string) in Position 1.',
      'In higher positions, find D in your minor pentatonic box and add the fret above it.',
      'Thinking of the blues scale as "minor pentatonic + 1 blue note" makes it far less intimidating.',
    ],
  },
  {
    stepNumber: 4,
    title: 'E Blues Scale — Open Position',
    explanation:
      'The E blues scale in open position (Position 1) is particularly resonant on guitar ' +
      'because several notes are played as open strings. The blue note (Bb) appears at fret 1 ' +
      'on the A string and fret 3 on the G string.\n\n' +
      'This is the home territory for classic British blues-rock: Clapton\'s work with ' +
      'Cream, early Zeppelin, and much of Hendrix\'s catalog. The open strings give it ' +
      'a raw, ringing quality that closed positions can\'t replicate.',
    contentRef: { type: 'scale', id: 'E_blues', positionNumber: 1 },
    tips: [
      'The Bb on A string fret 1 is one of the most expressive notes in rock guitar history.',
      'Try: open A string → fret 1 (Bb) → fret 2 (B). This is the foundational E blues move.',
      'Mixing open strings with fretted notes creates the "big" sound associated with classic rock blues.',
      'Hendrix\'s "Red House" and Clapton\'s "Crossroads" solo are pure E blues scale vocabulary.',
    ],
  },
  {
    stepNumber: 5,
    title: 'The Blue Note in Context — Playing Over Changes',
    explanation:
      'The true test of the blues scale is using it over actual chord changes. The b5 tension ' +
      'sounds different over each chord of the 12-bar progression — most dramatic over the I7 ' +
      'chord, somewhat different over the IV7, and highly resolved over the V7.\n\n' +
      'Experiment: hold the progression on E7, loop it, and play just the blue note (Eb). ' +
      'Then do the same over A7 and B7. The same note sounds different in each context — ' +
      'this is harmony and melody interacting.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'E7', 'A7', 'A7', 'B7', 'A7', 'E7', 'E7'],
      beatsEach: 4,
    },
    tips: [
      'The blue note resolves most naturally by moving down a half step to the 4th, or up to the 5th.',
      'Over the V7 chord (B7 in E blues), the blue note creates extra crunch — use it there.',
      'A phrase that ends on the root sounds "finished." A phrase ending on the blue note sounds unresolved.',
      'Record a looped backing track and improvise with just the root, 4th, blue note, and 5th.',
    ],
  },
];

export const MODULE_4: LessonModule = {
  id: 'module_4',
  moduleNumber: 4,
  title: 'The Blues Scale',
  description:
    'Add the "blue note" (b5) to your minor pentatonic to create the blues scale. ' +
    'Learn where the blue note lives in all five positions and how to use it expressively ' +
    'in both A and E keys.',
  difficulty: 'intermediate',
  estimatedMinutes: 45,
  referencedChords: ['E7', 'A7', 'B7'],
  referencedScales: ['A_blues', 'E_blues'],
  steps: MODULE_4_STEPS,
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5: Putting It All Together
// ─────────────────────────────────────────────────────────────────────────────

const MODULE_5_STEPS: LessonStep[] = [
  {
    stepNumber: 1,
    title: 'Rhythm and Lead — Two Roles, One Guitar',
    explanation:
      'On a bandstand, "rhythm" and "lead" are separate roles — but solo guitar playing ' +
      'combines both. Great blues guitarists like Robert Johnson, T-Bone Walker, and ' +
      'Lightnin\' Hopkins played rhythm patterns with harmonic content while weaving in ' +
      'melodic lead phrases.\n\n' +
      'The fundamental technique: play your chord (rhythm), release it to play a scale ' +
      'phrase (lead), return to the chord. This "call and response" is the voice of blues guitar.\n\n' +
      'Try it: strum E7 for two beats, then play two notes from A minor pentatonic Position 1, ' +
      'then return to E7.',
    contentRef: { type: 'chord', id: 'E7' },
    tips: [
      'Think of chords as "the question" and scale phrases as "the answer."',
      'Keep your chord hand lightly touching the strings between phrases to control sustain.',
      'Start with one-note answers, then grow to two-note, then three-note phrases.',
      'The silence between a chord strum and a lead phrase is as important as the notes.',
    ],
  },
  {
    stepNumber: 2,
    title: 'The Classic Blues Turnaround',
    explanation:
      'The turnaround is the two-bar phrase at bars 11–12 of the 12-bar form. Its job is ' +
      'to create momentum that pulls listeners back to bar 1. The most common turnaround ' +
      'in E blues is a descending chromatic line on the high strings over E7 → B7.\n\n' +
      'Basic turnaround tab (high e and B strings):\n' +
      'High e: 0→3  B: 0→2  (played over E chord shape moving to B7)\n\n' +
      'More specifically: while holding an open E chord, play high e fret 0, then slide ' +
      'to fret 2, fret 1, then open — this creates a chromatic descent that lands on B7.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'B7'],
      beatsEach: 4,
    },
    tips: [
      'The turnaround is a signature moment — many guitarists develop their own personal version.',
      'Common turnaround: E7 with chromatic descent on high strings, landing on B7 on beat 1 of bar 12.',
      'Listen to Robert Johnson\'s "Cross Road Blues" for the most influential turnaround in history.',
      'The simpler the turnaround, the more powerful it often is.',
    ],
  },
  {
    stepNumber: 3,
    title: 'Chord-Based Licks — Mixing Chords and Scale Notes',
    explanation:
      'One of the most characteristic sounds in blues is playing *around* the chord rather ' +
      'than purely from the scale. This means adding notes from the chord tones to your ' +
      'scale phrases, creating harmonic melody.\n\n' +
      'Example over A7: Hold A7 chord shape, then separately pick strings 3-4-5 to arpeggiate ' +
      'the chord, then slide into the A minor pentatonic phrase on strings 4-5. ' +
      'The transition between chord and scale creates the signature blues "feel."\n\n' +
      'T-Bone Walker pioneered this approach; it became standard in jazz-blues and ' +
      'later electrified in B.B. King\'s style.',
    contentRef: { type: 'chord', id: 'A7' },
    tips: [
      'Arpeggio = playing chord notes one at a time instead of strumming.',
      'The chromatic approach: use one or two notes from *outside* the scale to arrive at a chord tone.',
      'Play the chord, then "dissolve" it into a scale phrase — this is the essential blues movement.',
      'Study any B.B. King solo: every phrase connects chord tones to scale phrases seamlessly.',
    ],
  },
  {
    stepNumber: 4,
    title: 'Call and Response Phrasing',
    explanation:
      'Blues phrasing mimics human conversation: a "question" phrase is answered by a ' +
      '"response" phrase. This structure keeps music engaging and human.\n\n' +
      'In practice:\n' +
      '- Play 2 beats of rhythm (E7 chord, shuffled)\n' +
      '- Play a 2-beat lead phrase (scale notes, ending on a pause)\n' +
      '- Repeat with a different answer phrase\n\n' +
      'The pause is critical — it creates space for the "response" to land. Blues masters ' +
      'describe this as "letting the note breathe." Overcrowding the melody is the most ' +
      'common beginner mistake.',
    contentRef: { type: 'scale', id: 'A_minor_pentatonic', positionNumber: 1 },
    tips: [
      'Play a phrase, then wait. Literally stop and count two beats before the answer.',
      'Every B.B. King solo has more silence than notes — the rests are part of the music.',
      'Vary the answer: sometimes high notes, sometimes low; sometimes fast, sometimes slow.',
      'Listen to Eric Clapton\'s "Hideaway" (Freddie King) for textbook call-and-response blues.',
    ],
  },
  {
    stepNumber: 5,
    title: 'Playing a Full 12-Bar Blues Solo',
    explanation:
      'You now have all the tools: E7/A7/B7 chords, A minor pentatonic and blues scale, ' +
      'bends, vibrato, and call-and-response phrasing. It\'s time to put it all together.\n\n' +
      'Structure for your first full solo chorus:\n\n' +
      '**Bars 1–4 (E7):** Play from A minor pentatonic Position 1. Use bends and vibrato. ' +
      'End bar 4 with a phrase that resolves to A.\n\n' +
      '**Bars 5–6 (A7):** Shift slightly — target the note D (the 4th of A) which is also ' +
      'in A minor pent. The scale still works perfectly.\n\n' +
      '**Bars 7–8 (E7):** Return home. Play a call-and-response pair.\n\n' +
      '**Bar 9 (B7):** Maximum tension — use the blue note (Eb) against B7 for extra grit.\n\n' +
      '**Bar 10 (A7):** Begin releasing tension, phrase toward resolution.\n\n' +
      '**Bars 11–12 (E7 → B7):** Turnaround — land the whole phrase on the B7.',
    contentRef: {
      type: 'progression',
      chordIds: ['E7', 'E7', 'E7', 'E7', 'A7', 'A7', 'E7', 'E7', 'B7', 'A7', 'E7', 'B7'],
      beatsEach: 4,
    },
    tips: [
      'Don\'t try to fill every beat with notes. The best solos breathe.',
      'Play one phrase perfectly repeated multiple times rather than many different ideas sloppily.',
      'Record yourself. Listen back without playing along. This is how you grow fastest.',
      'The goal isn\'t complexity — it\'s connection. If the music moves you, you\'re playing blues.',
      'Suggested listening: B.B. King "Every Day I Have the Blues," Freddie King "Hide Away," ' +
        'Albert Collins "Frosty" — all foundational 12-bar vocabulary.',
    ],
  },
];

export const MODULE_5: LessonModule = {
  id: 'module_5',
  moduleNumber: 5,
  title: 'Putting It All Together',
  description:
    'Combine chords and scales into real blues music. Learn the classic turnaround, ' +
    'chord-based licks, call-and-response phrasing, and play a complete 12-bar blues solo ' +
    'from start to finish.',
  difficulty: 'intermediate',
  estimatedMinutes: 60,
  referencedChords: ['E7', 'A7', 'B7'],
  referencedScales: ['A_minor_pentatonic', 'A_blues'],
  steps: MODULE_5_STEPS,
};

// ─────────────────────────────────────────────────────────────────────────────
// All Modules Export
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_MODULES: LessonModule[] = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
  MODULE_5,
];

/** Look up a module by ID */
export function getModule(id: string): LessonModule | undefined {
  return ALL_MODULES.find((m) => m.id === id);
}

/** Look up a specific step within a module */
export function getStep(moduleId: string, stepNumber: number): LessonStep | undefined {
  const module = getModule(moduleId);
  return module?.steps.find((s) => s.stepNumber === stepNumber);
}

/** Returns all modules at a given difficulty level */
export function getModulesByDifficulty(
  difficulty: LessonModule['difficulty'],
): LessonModule[] {
  return ALL_MODULES.filter((m) => m.difficulty === difficulty);
}

/** Returns a flat list of all steps across all modules, in order */
export function getAllStepsOrdered(): Array<{ module: LessonModule; step: LessonStep }> {
  return ALL_MODULES.flatMap((module) =>
    module.steps.map((step) => ({ module, step })),
  );
}
