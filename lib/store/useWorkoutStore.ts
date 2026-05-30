"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkoutType, ExerciseLog, SetLog } from "@/types/workout";

interface WorkoutState {
  // Active session state
  isActive: boolean;
  sessionDate: string | null;
  sessionDayType: WorkoutType | null;
  exerciseLogs: ExerciseLog[];
  currentExerciseIndex: number;
  currentSetIndex: number;
  startTime: string | null;
  isResting: boolean;
  totalXPEarned: number;

  // Completed sessions (indexed by date)
  completedSessions: Record<string, {
    dayType: WorkoutType;
    exercises: ExerciseLog[];
    durationMinutes: number;
    xpEarned: number;
    completedAt: string;
  }>;

  // Actions
  startSession: (dayType: WorkoutType, exerciseNames: string[]) => void;
  completeSet: (exerciseIndex: number, reps?: number) => void;
  skipExercise: (exerciseIndex: number) => void;
  setCurrentExercise: (index: number) => void;
  setResting: (resting: boolean) => void;
  addExerciseNote: (exerciseIndex: number, note: string) => void;
  addXP: (amount: number) => void;
  finishSession: () => void;
  abandonSession: () => void;
  hasActiveSession: (date: string) => boolean;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      isActive: false,
      sessionDate: null,
      sessionDayType: null,
      exerciseLogs: [],
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      startTime: null,
      isResting: false,
      totalXPEarned: 0,
      completedSessions: {},

      startSession: (dayType, exerciseNames) => {
        const logs: ExerciseLog[] = exerciseNames.map((name) => ({
          exerciseName: name,
          sets: [],
          completed: false,
        }));

        set({
          isActive: true,
          sessionDate: new Date().toISOString().split("T")[0],
          sessionDayType: dayType,
          exerciseLogs: logs,
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          startTime: new Date().toISOString(),
          isResting: false,
          totalXPEarned: 0,
        });
      },

      completeSet: (exerciseIndex, reps) => {
        const logs = [...get().exerciseLogs];
        const exercise = { ...logs[exerciseIndex] };
        const setLog: SetLog = {
          setNumber: exercise.sets.length + 1,
          reps: reps || 0,
          completed: true,
          timestamp: new Date().toISOString(),
        };
        exercise.sets = [...exercise.sets, setLog];
        logs[exerciseIndex] = exercise;

        set({
          exerciseLogs: logs,
          currentSetIndex: exercise.sets.length,
          isResting: true,
        });
      },

      skipExercise: (exerciseIndex) => {
        const logs = [...get().exerciseLogs];
        logs[exerciseIndex] = { ...logs[exerciseIndex], completed: true };
        const nextIndex = Math.min(exerciseIndex + 1, logs.length - 1);

        set({
          exerciseLogs: logs,
          currentExerciseIndex: nextIndex,
          currentSetIndex: 0,
        });
      },

      setCurrentExercise: (index) => {
        set({ currentExerciseIndex: index, currentSetIndex: 0 });
      },

      setResting: (resting) => {
        set({ isResting: resting });
      },

      addExerciseNote: (exerciseIndex, note) => {
        const logs = [...get().exerciseLogs];
        logs[exerciseIndex] = { ...logs[exerciseIndex], note };
        set({ exerciseLogs: logs });
      },

      addXP: (amount) => {
        set({ totalXPEarned: get().totalXPEarned + amount });
      },

      finishSession: () => {
        const state = get();
        const date = state.sessionDate || new Date().toISOString().split("T")[0];
        const startMs = state.startTime ? new Date(state.startTime).getTime() : Date.now();
        const durationMinutes = Math.round((Date.now() - startMs) / 60000);

        // Mark all exercises as completed
        const logs = state.exerciseLogs.map((log) => ({
          ...log,
          completed: true,
        }));

        const completed = {
          ...state.completedSessions,
          [date]: {
            dayType: state.sessionDayType!,
            exercises: logs,
            durationMinutes,
            xpEarned: state.totalXPEarned,
            completedAt: new Date().toISOString(),
          },
        };

        set({
          isActive: false,
          sessionDate: null,
          sessionDayType: null,
          exerciseLogs: [],
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          startTime: null,
          isResting: false,
          totalXPEarned: 0,
          completedSessions: completed,
        });
      },

      abandonSession: () => {
        set({
          isActive: false,
          sessionDate: null,
          sessionDayType: null,
          exerciseLogs: [],
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          startTime: null,
          isResting: false,
          totalXPEarned: 0,
        });
      },

      hasActiveSession: (date) => {
        return get().isActive && get().sessionDate === date;
      },
    }),
    {
      name: "fitness-workout-store",
    }
  )
);
