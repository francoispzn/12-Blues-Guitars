// ─── Audio Engine ─────────────────────────────────────────────────────────────
//
// Singleton Web Audio API synthesizer for the blues guitar learning app.
// Uses sawtooth oscillator + lowpass filter + gain envelope to produce a
// warm, guitar-like pluck sound.
//
// AudioContext is lazily initialised on first use so that it is always created
// inside a user-gesture handler — required on iOS/Safari.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private unlocked = false;

  // ── Context ──────────────────────────────────────────────────────────────

  /** Returns the shared AudioContext, creating it on first call. */
  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    // iOS requires a user-gesture to unlock audio. Play a silent buffer once.
    if (!this.unlocked && this.ctx.state !== 'closed') {
      this.unlocked = true;
      const buf = this.ctx.createBuffer(1, 1, 22050);
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.connect(this.ctx.destination);
      src.start(0);
    }
    return this.ctx;
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  /**
   * Converts a MIDI note number to its frequency in Hz.
   * A4 (MIDI 69) = 440 Hz.
   */
  midiToFrequency(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // ── Synthesis ─────────────────────────────────────────────────────────────

  /**
   * Plays a single note with a guitar-like pluck envelope.
   *
   * Signal chain: OscillatorNode (sawtooth)
   *             → BiquadFilterNode (lowpass, ~2500 Hz, Q 1.2)
   *             → GainNode (fast attack, exponential decay)
   *             → AudioContext.destination
   *
   * @param midi     - MIDI note number (e.g. 40 = E2, 64 = E4)
   * @param duration - Ring duration in seconds (default 1.5 s)
   */
  playNote(midi: number, duration = 1.5): void {
    const ctx = this.getContext();

    // Resume context if it was suspended (autoplay policy)
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const now = ctx.currentTime;

    // ── Oscillator ────────────────────────────────────────────────────────
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(this.midiToFrequency(midi), now);

    // ── Lowpass filter — simulates guitar body resonance ──────────────────
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, now);
    filter.Q.setValueAtTime(1.2, now);

    // ── Gain envelope — fast attack, exponential pluck decay ──────────────
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // ── Routing ───────────────────────────────────────────────────────────
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Plays multiple notes as a chord, optionally strumming them.
   *
   * @param midiNotes - Array of MIDI note numbers (low to high)
   * @param strum     - When true (default) notes are staggered by 40 ms each
   */
  playChord(midiNotes: number[], strum = true): void {
    const ctx = this.getContext();

    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const STRUM_GAP_S = 0.04; // 40 ms between strings

    midiNotes.forEach((midi, index) => {
      const delayS = strum ? index * STRUM_GAP_S : 0;
      const now = ctx.currentTime + delayS;

      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(this.midiToFrequency(midi), now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2500, now);
      filter.Q.setValueAtTime(1.2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    });
  }

  /**
   * Plays notes sequentially — useful for scales and licks.
   *
   * Each note rings for 0.8 s with a 100 ms gap before the next note starts,
   * giving a natural picked-note feel.
   *
   * @param midiNotes - Ordered array of MIDI note numbers
   * @param tempo     - Beats per minute (default 120 → 500 ms per note)
   */
  playScale(midiNotes: number[], tempo = 120): void {
    const ctx = this.getContext();

    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const NOTE_DURATION_S = 0.8;
    const BEAT_DURATION_S = 60 / tempo; // 500 ms at 120 BPM
    // Gap between note onsets equals one beat; note rings for 400 ms of that.
    const NOTE_RING_S = Math.min(NOTE_DURATION_S, BEAT_DURATION_S - 0.1);

    midiNotes.forEach((midi, index) => {
      const startTime = ctx.currentTime + index * BEAT_DURATION_S;

      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(this.midiToFrequency(midi), startTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2500, startTime);
      filter.Q.setValueAtTime(1.2, startTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + NOTE_RING_S);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + NOTE_RING_S);
    });
  }

  /**
   * Immediately stops all audio by closing and discarding the AudioContext.
   * A new context will be created on the next playback call.
   */
  stopAll(): void {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}

// ── Singleton export ──────────────────────────────────────────────────────────

export const audioEngine = new AudioEngine();
