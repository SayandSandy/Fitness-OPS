/**
 * Play a sound effect using HTML5 Audio API
 * Fails silently on autoplay policy errors
 */
export type SoundType =
  | "rest_done"
  | "level_up"
  | "achievement"
  | "beep"
  | "workout_start";

const SOUND_MAP: Record<SoundType, string> = {
  rest_done: "/sounds/rest-complete.mp3",
  level_up: "/sounds/level-up.mp3",
  achievement: "/sounds/achievement.mp3",
  beep: "/sounds/rest-complete.mp3", // reuse for beep
  workout_start: "/sounds/workout-start.mp3",
};

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

/**
 * Play a sound effect
 * Uses HTML5 Audio for simplicity, with silent catch for autoplay errors
 */
export function playSound(type: SoundType, volume: number = 0.6): void {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio(SOUND_MAP[type]);
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently ignore autoplay policy errors
    });
  } catch {
    // Audio not available
  }
}

/**
 * Play a beep sound using Web Audio API (for countdown ticks)
 * This creates a synthetic beep without needing a file
 */
export function playBeep(
  frequency: number = 800,
  duration: number = 100,
  volume: number = 0.3
): void {
  if (typeof window === "undefined") return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + duration / 1000
    );

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  } catch {
    // Web Audio API not available
  }
}
