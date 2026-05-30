// ─── USER TYPES ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  deviceId: string;
  level: number;
  xp: number;
  gems: number;
  streakCount: number;
  theme: ThemeId;
  createdAt: string;
}

export type ThemeId =
  | "default"
  | "retrowave"
  | "military"
  | "solarfire"
  | "ice";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bg: string;
  card: string;
  border: string;
  accent: string;
  cost: number; // gems required, 0 = free
  unlockLevel?: number;
}

export interface Settings {
  restTimerDuration: number; // seconds: 30, 45, 60, 90, 120
  soundEnabled: boolean;
  theme: ThemeId;
  reducedMotion: boolean;
}
