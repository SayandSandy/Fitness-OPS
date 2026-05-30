"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeId } from "@/types/user";
import type { ThemeConfig } from "@/types/user";

export const THEMES: ThemeConfig[] = [
  { id: "default",   name: "Cyber Ops",   bg: "#080B0F", card: "#0E1318", border: "#1A2030", accent: "#00FFB2", cost: 0 },
  { id: "retrowave", name: "Retrowave",   bg: "#0D0221", card: "#170535", border: "#2A0845", accent: "#FF2D9B", cost: 3 },
  { id: "military",  name: "Military",    bg: "#0A1A0A", card: "#0F2510", border: "#1A3A1A", accent: "#A8FF78", cost: 3 },
  { id: "solarfire", name: "Solar Fire",  bg: "#0F0800", card: "#1A1000", border: "#2A1A00", accent: "#FF8C00", cost: 5 },
  { id: "ice",       name: "Arctic Ice",  bg: "#050F1A", card: "#0A1825", border: "#102535", accent: "#4CC9F0", cost: 5 },
];

interface SettingsState {
  restTimerDuration: number;
  soundEnabled: boolean;
  reducedMotion: boolean;
  startDate: string; // Program start date

  // Actions
  setRestTimerDuration: (duration: number) => void;
  toggleSound: () => void;
  setReducedMotion: (value: boolean) => void;
  setStartDate: (date: string) => void;
  applyTheme: (themeId: ThemeId) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      restTimerDuration: 60,
      soundEnabled: true,
      reducedMotion: false,
      startDate: "2025-05-31",

      setRestTimerDuration: (duration) => {
        set({ restTimerDuration: duration });
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      setReducedMotion: (value) => {
        set({ reducedMotion: value });
      },

      setStartDate: (date) => {
        set({ startDate: date });
      },

      applyTheme: (themeId) => {
        const theme = THEMES.find((t) => t.id === themeId);
        if (!theme || typeof document === "undefined") return;

        const root = document.documentElement;
        root.style.setProperty("--background", theme.bg);
        root.style.setProperty("--card", theme.card);
        root.style.setProperty("--cyber-card", theme.card);
        root.style.setProperty("--border", theme.border);
        root.style.setProperty("--cyber-border", theme.border);
        root.style.setProperty("--primary", theme.accent);
        root.style.setProperty("--accent", theme.accent);
        root.style.setProperty("--ring", theme.accent);
        root.style.setProperty("--cyber-accent", theme.accent);
      },
    }),
    {
      name: "fitness-settings-store",
    }
  )
);
