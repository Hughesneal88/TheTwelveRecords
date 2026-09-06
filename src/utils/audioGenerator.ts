// Web Audio API Ambient / Gospel & Praise Synth Engine

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private gainNode: GainNode | null = null;
  private theme: "afrogospel" | "worship" | "praise" | "ambient" = "afrogospel";
  private step = 0;
  private volume = 0.8;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public playPreset(theme: "afrogospel" | "worship" | "praise" | "ambient" = "afrogospel") {
    this.stop();
    this.initContext();
    this.theme = theme;
    this.isPlaying = true;
    this.step = 0;

    const tempoMs = theme === "praise" ? 450 : theme === "afrogospel" ? 520 : 900;

    this.timer = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;
      this.playStep();
      this.step = (this.step + 1) % 16;
    }, tempoMs);

    // Initial note
    this.playStep();
  }

  private playStep() {
    if (!this.ctx || !this.gainNode) return;

    const gospelChords = [
      // F major 9 -> D min 9 -> Bb maj 7 -> C 7 sus
      [261.63, 329.63, 392.00, 523.25], // C - E - G - C
      [293.66, 349.23, 440.00, 587.33], // D - F - A - D
      [233.08, 293.66, 349.23, 466.16], // Bb - D - F - Bb
      [261.63, 329.63, 392.00, 493.88], // C - E - G - B
    ];

    const chordIndex = Math.floor(this.step / 4) % gospelChords.length;
    const chord = gospelChords[chordIndex];

    // Pad / Chords on step 0, 4, 8, 12
    if (this.step % 4 === 0) {
      chord.forEach((freq, i) => {
        this.createTone(freq, "sine", 1.8, 0.12 / (i + 1));
      });
    }

    // Lead / Melody arpeggio
    const note = chord[this.step % chord.length] * (this.theme === "afrogospel" ? 1.5 : 1);
    this.createTone(note, "triangle", 0.6, 0.08);

    // Subtle rhythmic pulse for Afro-Gospel & Praise
    if (this.theme === "afrogospel" || this.theme === "praise") {
      if (this.step % 2 === 0) {
        this.createPercussion(110, 0.15, 0.15); // Kick/Sub pulse
      }
      if (this.step % 4 === 2) {
        this.createPercussion(350, 0.08, 0.08); // Shaker/Snare tap
      }
    }
  }

  private createTone(freq: number, type: OscillatorType, duration: number, vol: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    env.gain.setValueAtTime(0.001, this.ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(vol * this.volume, this.ctx.currentTime + 0.08);
    env.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(env);
    env.connect(this.gainNode);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration + 0.1);
  }

  private createPercussion(freq: number, duration: number, vol: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + duration);

    env.gain.setValueAtTime(vol * this.volume, this.ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(env);
    env.connect(this.gainNode);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const synthEngine = new AudioEngine();
