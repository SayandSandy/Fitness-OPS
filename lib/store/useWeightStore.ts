import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightState {
  entries: Record<string, number>; // date -> weight in kg
  
  // Actions
  logWeight: (date: string, weight: number) => void;
  getLatest: () => number | null;
  getHistory: () => WeightEntry[];
  loadData: (data: Partial<WeightState>) => void;
  reset: () => void;
}

export const useWeightStore = create<WeightState>()(
  persist(
    (set, get) => ({
      entries: {},
      
      logWeight: (date: string, weight: number) => {
        const newEntries = { ...get().entries, [date]: weight };
        set({ entries: newEntries });
        
        const uid = auth.currentUser?.uid;
        if (uid) {
          setDoc(doc(db, "users", uid, "data", "weight"), { entries: newEntries }, { merge: true });
        }
      },
      
      getLatest: () => {
        const entries = get().entries;
        const dates = Object.keys(entries).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        return dates.length > 0 ? entries[dates[0]] : null;
      },
      
      getHistory: () => {
        const entries = get().entries;
        return Object.keys(entries)
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .map((date) => ({ date, weight: entries[date] }));
      },
      
      loadData: (data) => set(data),
      reset: () => set({ entries: {} }),
    }),
    {
      name: "fitness-weight-storage",
    }
  )
);
