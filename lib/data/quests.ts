import type { Quest } from "@/types/gamification";

export const DAILY_QUESTS: Quest[] = [
  {
    id: "daily_posture",
    type: "daily",
    title: "Complete today's Morning Posture Routine",
    xp: 50,
    condition: "complete_posture_routine",
  },
  {
    id: "daily_water",
    type: "daily",
    title: "Drink your 4L water target",
    xp: 30,
    condition: "manual_water_checkin",
  },
  {
    id: "daily_journal",
    type: "daily",
    title: "Log today's journal entry",
    xp: 30,
    condition: "journal_entry_logged",
  },
  {
    id: "daily_workout",
    type: "daily",
    title: "Complete today's workout session",
    xp: 500,
    condition: "workout_completed",
  },
];

export const WEEKLY_QUESTS: Quest[] = [
  {
    id: "weekly_all_workouts",
    type: "weekly",
    title: "Complete all 6 training days",
    xp: 2000,
    gems: 1,
    condition: "all_6_workouts",
  },
  {
    id: "weekly_meals",
    type: "weekly",
    title: "Log every meal for 7 days",
    xp: 500,
    condition: "log_meals_7_days",
  },
  {
    id: "weekly_face_yoga",
    type: "weekly",
    title: "Do face yoga 7 days in a row",
    xp: 300,
    gems: 1,
    condition: "face_yoga_7_days",
  },
];
