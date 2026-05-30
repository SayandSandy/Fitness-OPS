// ─── WORKOUT TYPES ──────────────────────────────────────────────────────────

export type ExerciseTag =
  | "arms"
  | "posture"
  | "glute"
  | "core"
  | "push"
  | "pull"
  | "cardio"
  | "face"
  | "stretch"
  | "habit";

export type WorkoutType =
  | "push"
  | "pull"
  | "cardio"
  | "core"
  | "legs"
  | "burn"
  | "rest";

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  tag: ExerciseTag;
  note?: string;
}

export interface WorkoutDay {
  title: string;
  subtitle: string;
  color: string;
  warmup: string;
  cooldown: string;
  exercises: Exercise[];
}

export interface ScheduleDay {
  day: string;
  label: string;
  color: string;
  type: WorkoutType;
}

export interface SetLog {
  setNumber: number;
  reps: number;
  completed: boolean;
  timestamp?: string;
}

export interface ExerciseLog {
  exerciseName: string;
  sets: SetLog[];
  completed: boolean;
  note?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  dayType: WorkoutType;
  exercises: ExerciseLog[];
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
  xpEarned: number;
  completed: boolean;
}

export interface TagStyle {
  color: string;
  label: string;
}

// ─── ARM PROGRAM TYPES ─────────────────────────────────────────────────────

export interface ArmExercise {
  name: string;
  muscle: string;
  sets: string;
  prog: string;
}

export interface ArmFrequency {
  day: string;
  focus: string;
}

export interface ArmProgram {
  overview: string;
  principles: string[];
  exercises: ArmExercise[];
  frequency: ArmFrequency[];
}

// ─── POSTURE TYPES ──────────────────────────────────────────────────────────

export interface PostureIssue {
  name: string;
  color: string;
  cause: string;
  fixes: string[];
  timeline: string;
}

export interface PostureRoutineItem {
  move: string;
  time: string;
  why: string;
}

export interface PostureData {
  issues: PostureIssue[];
  dailyRoutine: PostureRoutineItem[];
  habits: string[];
}

// ─── MOBILITY TYPES ─────────────────────────────────────────────────────────

export interface MobilityMove {
  name: string;
  reps: string;
  note: string;
}

export interface MobilityRoutine {
  title: string;
  timing: string;
  moves: MobilityMove[];
}

export interface MobilityData {
  morning: MobilityRoutine;
  preworkout: MobilityRoutine;
  postworkout: MobilityRoutine;
  evening: MobilityRoutine;
}

// ─── FACE TYPES ─────────────────────────────────────────────────────────────

export interface FaceExercise {
  name: string;
  reps: string;
  note: string;
}

export interface FaceTip {
  icon: string;
  tip: string;
}

export interface FaceData {
  exercises: FaceExercise[];
  tips: FaceTip[];
}

// ─── DIET TYPES ─────────────────────────────────────────────────────────────

export interface Meal {
  time: string;
  icon: string;
  label: string;
  kcal: number;
  protein: number;
  items: string[];
}

export interface DietData {
  targets: { kcal: number; protein: number; carbs: number; fat: number };
  meals: Meal[];
  avoid: string[];
  rules: string[];
}

// ─── ROUTINE TYPES ──────────────────────────────────────────────────────────

export type RoutineCategory =
  | "wake"
  | "meal"
  | "workout"
  | "cardio"
  | "posture"
  | "face"
  | "habit"
  | "work"
  | "sleep";

export interface RoutineItem {
  time: string;
  dur: string;
  icon: string;
  label: string;
  cat: RoutineCategory;
  note: string;
}

export interface RoutineTemplate {
  workday: RoutineItem[];
}
