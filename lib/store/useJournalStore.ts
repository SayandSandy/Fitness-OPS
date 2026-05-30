"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JournalEntry, Mood, EnergyLevel, Soreness } from "@/types/tracking";

interface JournalState {
  entries: Record<string, JournalEntry>; // keyed by date

  // Actions
  setMood: (date: string, mood: Mood) => void;
  setEnergy: (date: string, energy: EnergyLevel) => void;
  setSoreness: (date: string, soreness: Soreness) => void;
  setSleepQuality: (date: string, quality: number) => void;
  setNotes: (date: string, notes: string) => void;
  setExerciseNote: (date: string, exerciseName: string, note: string) => void;
  setWeeklyReflection: (
    date: string,
    field: "strongestSession" | "improvement",
    value: string
  ) => void;
  getEntry: (date: string) => JournalEntry | undefined;
  getRecoveryScore: (date: string) => number;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: {},

      setMood: (date, mood) => {
        const entry = get().entries[date] || { date };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, mood },
          },
        });
      },

      setEnergy: (date, energy) => {
        const entry = get().entries[date] || { date };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, energy },
          },
        });
      },

      setSoreness: (date, soreness) => {
        const entry = get().entries[date] || { date };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, soreness },
          },
        });
      },

      setSleepQuality: (date, quality) => {
        const entry = get().entries[date] || { date };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, sleepQuality: quality },
          },
        });
      },

      setNotes: (date, notes) => {
        const entry = get().entries[date] || { date };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, notes },
          },
        });
      },

      setExerciseNote: (date, exerciseName, note) => {
        const entry = get().entries[date] || { date };
        const exerciseNotes = { ...entry.exerciseNotes, [exerciseName]: note };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, exerciseNotes },
          },
        });
      },

      setWeeklyReflection: (date, field, value) => {
        const entry = get().entries[date] || { date };
        const weeklyReflection = {
          ...entry.weeklyReflection,
          [field]: value,
        };
        set({
          entries: {
            ...get().entries,
            [date]: { ...entry, weeklyReflection },
          },
        });
      },

      getEntry: (date) => get().entries[date],

      getRecoveryScore: (date) => {
        const entry = get().entries[date];
        if (!entry) return 50; // default

        const sleepScore = (entry.sleepQuality || 3) * 20;
        const energyScore =
          entry.energy === "high" ? 20 : entry.energy === "medium" ? 13 : 5;
        const sorenessScore =
          entry.soreness === "none"
            ? 20
            : entry.soreness === "mild"
            ? 10
            : 0;

        return Math.min(100, sleepScore + energyScore + sorenessScore);
      },
    }),
    {
      name: "fitness-journal-store",
    }
  )
);
