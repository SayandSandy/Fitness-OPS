// ─── XP UTILITIES ───────────────────────────────────────────────────────────

export const LEVEL_THRESHOLDS = [
  0, 500, 1200, 2200, 3500, 5000, 7000, 9500, 12500, 16000, 20000,
];

export const LEVEL_NAMES = [
  "Recruit",
  "Trainee",
  "Soldier",
  "Operator",
  "Specialist",
  "Elite",
  "Veteran",
  "Ghost",
  "Shadow",
  "Phantom",
  "Super Soldier",
];

export const XP_AWARDS = {
  complete_set: 10,
  complete_exercise: 25,
  complete_workout: 500,
  daily_checkin: 50,
  journal_entry: 30,
  streak_7: 1000,
  streak_14: 1000,
  streak_21: 1000,
  streak_30: 1000,
} as const;

/**
 * Get the level for a given XP amount
 */
export function getLevelForXP(xp: number): number {
  let level = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i;
    } else {
      break;
    }
  }
  return level;
}

/**
 * Get the level name for a given level number
 */
export function getLevelName(level: number): string {
  return LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length - 1)];
}

/**
 * Get progress within current level (0 to 1)
 */
export function getLevelProgress(xp: number): number {
  const level = getLevelForXP(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level] || 0;
  const nextThreshold =
    LEVEL_THRESHOLDS[level + 1] || currentThreshold + 5000;
  const progress = (xp - currentThreshold) / (nextThreshold - currentThreshold);
  return Math.min(Math.max(progress, 0), 1);
}

/**
 * Get XP needed for next level
 */
export function getXPToNextLevel(xp: number): number {
  const level = getLevelForXP(xp);
  const nextThreshold =
    LEVEL_THRESHOLDS[level + 1] || LEVEL_THRESHOLDS[level] + 5000;
  return nextThreshold - xp;
}
