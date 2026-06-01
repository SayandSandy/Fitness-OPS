import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatDate } from "@/lib/utils/dates";

interface QuestStore {
  completedQuests: Record<string, boolean>;
  completeQuest: (questId: string, date?: string) => void;
  isCompleted: (questId: string, date?: string) => boolean;
  getCompletedCount: (date?: string) => number;
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => ({
      completedQuests: {},
      completeQuest: (questId, date) => {
        const d = date || formatDate();
        set((state) => ({
          completedQuests: {
            ...state.completedQuests,
            [`${d}_${questId}`]: true,
          },
        }));
      },
      isCompleted: (questId, date) => {
        const d = date || formatDate();
        return !!get().completedQuests[`${d}_${questId}`];
      },
      getCompletedCount: (date) => {
        const d = date || formatDate();
        return Object.keys(get().completedQuests).filter((k) => k.startsWith(`${d}_`)).length;
      },
    }),
    {
      name: "fitness-quests-storage",
    }
  )
);
