"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeId } from "@/types/user";
import { getLevelForXP, getLevelName } from "@/lib/utils/xp";

function generateDeviceId(): string {
  return "device_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

interface UserState {
  deviceId: string;
  xp: number;
  level: number;
  levelName: string;
  gems: number;
  theme: ThemeId;
  unlockedThemes: ThemeId[];
  createdAt: string;

  // Actions
  addXP: (amount: number) => boolean; // returns true if leveled up
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  unlockTheme: (themeId: ThemeId) => void;
  setTheme: (themeId: ThemeId) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      deviceId: generateDeviceId(),
      xp: 0,
      level: 0,
      levelName: "Recruit",
      gems: 0,
      theme: "default" as ThemeId,
      unlockedThemes: ["default"] as ThemeId[],
      createdAt: new Date().toISOString(),

      addXP: (amount: number) => {
        const currentLevel = get().level;
        const newXP = get().xp + amount;
        const newLevel = getLevelForXP(newXP);
        const leveledUp = newLevel > currentLevel;

        set({
          xp: newXP,
          level: newLevel,
          levelName: getLevelName(newLevel),
        });

        return leveledUp;
      },

      addGems: (amount: number) => {
        set({ gems: get().gems + amount });
      },

      spendGems: (amount: number) => {
        if (get().gems >= amount) {
          set({ gems: get().gems - amount });
          return true;
        }
        return false;
      },

      unlockTheme: (themeId: ThemeId) => {
        const current = get().unlockedThemes;
        if (!current.includes(themeId)) {
          set({ unlockedThemes: [...current, themeId] });
        }
      },

      setTheme: (themeId: ThemeId) => {
        set({ theme: themeId });
      },

      reset: () => {
        set({
          xp: 0,
          level: 0,
          levelName: "Recruit",
          gems: 0,
          theme: "default",
          unlockedThemes: ["default"],
        });
      },
    }),
    {
      name: "fitness-user-store",
    }
  )
);
