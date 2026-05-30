"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheckIn, CheckInStatus } from "@/types/tracking";

interface StreakState {
  checkins: CheckIn[];
  currentStreak: number;
  longestStreak: number;

  // Actions
  addCheckin: (date: string, status: CheckInStatus, workoutType?: string) => void;
  getCheckin: (date: string) => CheckIn | undefined;
  getWeeklyCount: () => number;
  recalculateStreak: () => void;
}

function calculateStreak(checkins: CheckIn[]): number {
  if (checkins.length === 0) return 0;

  // Sort by date descending
  const sorted = [...checkins].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sorted.length; i++) {
    const checkinDate = new Date(sorted[i].date);
    checkinDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (checkinDate.getTime() !== expectedDate.getTime()) {
      break;
    }

    if (sorted[i].status === "complete" || sorted[i].status === "rest") {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      checkins: [],
      currentStreak: 0,
      longestStreak: 0,

      addCheckin: (date, status, workoutType) => {
        const existing = get().checkins;
        const filtered = existing.filter((c) => c.date !== date);
        const updated = [...filtered, { date, status, workoutType }];
        const streak = calculateStreak(updated);
        const longest = Math.max(streak, get().longestStreak);

        set({
          checkins: updated,
          currentStreak: streak,
          longestStreak: longest,
        });
      },

      getCheckin: (date) => {
        return get().checkins.find((c) => c.date === date);
      },

      getWeeklyCount: () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
        monday.setHours(0, 0, 0, 0);

        return get().checkins.filter((c) => {
          const d = new Date(c.date);
          return d >= monday && c.status === "complete";
        }).length;
      },

      recalculateStreak: () => {
        const streak = calculateStreak(get().checkins);
        const longest = Math.max(streak, get().longestStreak);
        set({ currentStreak: streak, longestStreak: longest });
      },
    }),
    {
      name: "fitness-streak-store",
    }
  )
);
