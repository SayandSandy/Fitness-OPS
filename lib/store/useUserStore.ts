"use client";

import { create } from "zustand";
import type { ThemeId } from "@/types/user";
import { getLevelForXP, getLevelName } from "@/lib/utils/xp";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

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
  loadData: (data: Partial<UserState>) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
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
    const levelName = getLevelName(newLevel);

    set({ xp: newXP, level: newLevel, levelName });

    const uid = auth.currentUser?.uid;
    if (uid) {
      setDoc(doc(db, "users", uid), { xp: newXP, level: newLevel, levelName }, { merge: true });
    }

    return leveledUp;
  },

  addGems: (amount: number) => {
    const newGems = get().gems + amount;
    set({ gems: newGems });
    
    const uid = auth.currentUser?.uid;
    if (uid) {
      setDoc(doc(db, "users", uid), { gems: newGems }, { merge: true });
    }
  },

  spendGems: (amount: number) => {
    if (get().gems >= amount) {
      const newGems = get().gems - amount;
      set({ gems: newGems });
      
      const uid = auth.currentUser?.uid;
      if (uid) {
        setDoc(doc(db, "users", uid), { gems: newGems }, { merge: true });
      }
      return true;
    }
    return false;
  },

  unlockTheme: (themeId: ThemeId) => {
    const current = get().unlockedThemes;
    if (!current.includes(themeId)) {
      const newThemes = [...current, themeId];
      set({ unlockedThemes: newThemes });
      
      const uid = auth.currentUser?.uid;
      if (uid) {
        setDoc(doc(db, "users", uid), { unlockedThemes: newThemes }, { merge: true });
      }
    }
  },

  setTheme: (themeId: ThemeId) => {
    set({ theme: themeId });
    
    const uid = auth.currentUser?.uid;
    if (uid) {
      setDoc(doc(db, "users", uid), { theme: themeId }, { merge: true });
    }
  },

  loadData: (data: Partial<UserState>) => {
    set({ ...data });
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
}));
