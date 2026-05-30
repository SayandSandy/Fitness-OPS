// ─── TRACKING TYPES ─────────────────────────────────────────────────────────

export type CheckInStatus = "complete" | "rest" | "missed";

export interface CheckIn {
  date: string;
  status: CheckInStatus;
  workoutType?: string;
}

export interface Measurement {
  date: string;
  weight?: number;
  waist?: number;
  armFlexed?: number;
  armRelaxed?: number;
  forearm?: number;
  chest?: number;
  hips?: number;
}

export interface PersonalRecord {
  exercise: string;
  value: number; // reps or seconds
  date: string;
  previousValue?: number;
}

export type Mood = "😴" | "😐" | "😊" | "💪" | "🔥";
export type EnergyLevel = "low" | "medium" | "high";
export type Soreness = "none" | "mild" | "high";

export interface JournalEntry {
  date: string;
  mood?: Mood;
  energy?: EnergyLevel;
  soreness?: Soreness;
  sleepQuality?: number; // 1-5
  notes?: string;
  exerciseNotes?: Record<string, string>; // exercise_name -> note
  weeklyReflection?: {
    strongestSession?: string;
    improvement?: string;
  };
}

export interface RecoveryScore {
  date: string;
  score: number; // 0-100
  sleepQuality: number;
  energy: EnergyLevel;
  soreness: Soreness;
}

export interface MeasurementConfig {
  metric: string;
  freq: string;
  method: string;
}

export interface ProgressionPhase {
  phase: string;
  focus: string;
  desc: string;
}

export interface TrackingData {
  measurements: MeasurementConfig[];
  progression: ProgressionPhase[];
  sleep: string[];
}
