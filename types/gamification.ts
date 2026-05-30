// ─── GAMIFICATION TYPES ─────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  xp: number;
  condition?: string; // description of unlock condition
}

export interface EarnedAchievement {
  achievementId: string;
  earnedAt: string;
}

export type QuestType = "daily" | "weekly";

export interface Quest {
  id: string;
  type: QuestType;
  title: string;
  xp: number;
  gems?: number;
  condition: string; // description of completion condition
}

export interface QuestProgress {
  questId: string;
  completed: boolean;
  completedAt?: string;
}

export type XPEventType =
  | "complete_set"
  | "complete_exercise"
  | "complete_workout"
  | "daily_checkin"
  | "journal_entry"
  | "streak_milestone"
  | "achievement_unlock"
  | "quest_complete";

export interface XPEvent {
  type: XPEventType;
  amount: number;
  timestamp: string;
  description?: string;
}

export interface LevelInfo {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
}

export interface WeekNarrative {
  week: number;
  title: string;
  text: string;
}

export interface WorkoutFlavor {
  type: string;
  text: string;
}
