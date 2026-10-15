/**
 * Web Audio API based traditional wedding harmony & chimes player.
 * Plays a soothing pentatonic chime/harp melody inspired by Cambodian traditional royal/mohori scales.
 * Zero external audio dependencies = guaranteed 100% offline & sandbox compatibility.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private step = 0;

  // Traditional Khmer pentatonic frequencies (peaceful, auspicious harmonic scale)
  private melodyFrequencies = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (Sa alto)
    587.33, // D5
    659.25, // E5
  ];

  // Sequence of notes for a gentle recurring auspicious motif
  private score = [
    { note: 0, dur: 0.8 },
    { note: 2, dur: 0.8 },
    { note: 3, dur: 1.2 },
    { note: 4, dur: 0.8 },
    { note: 5, dur: 1.5 },
    { note: 4, dur: 0.8 },
    { note: 3, dur: 0.8 },
    { note: 2, dur: 1.2 },
    { note: 3, dur: 0.8 },
    { note: 0, dur: 1.8 },
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a single bell/harp note with warm decay
  private playPluckedNote(freq: number, duration: number, volume = 0.15) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Primary tone (triangle wave for wooden xylophone / roneat / harp warmth)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // Subtle overtone (sine wave an octave up for golden chime shimmer)
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.001, now);
      // Gentle attack
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.05);
      // Bell/harp natural acoustic ring-out decay
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch {
      // Audio autoplay policy catch
    }
  }

  public playEnvelopeOpenSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Soft paper whoosh + high golden chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio context error ignore
    }
  }

  public togglePlay(onStateChange?: (playing: boolean) => void) {
    if (this.isPlaying) {
      this.stop();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.start();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.getContext();
    this.isPlaying = true;
    this.step = 0;

    const playNext = () => {
      if (!this.isPlaying) return;
      const item = this.score[this.step % this.score.length];
      const freq = this.melodyFrequencies[item.note % this.melodyFrequencies.length];
      this.playPluckedNote(freq, item.dur * 1.4, 0.12);

      // Occasional gentle low drone pedal note
      if (this.step % 4 === 0) {
        this.playPluckedNote(130.81, 2.5, 0.08); // C3 low bass root
      }

      this.step++;
      const nextDelay = item.dur * 900;
      this.intervalId = window.setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioManager();
