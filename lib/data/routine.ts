import type { RoutineTemplate, RoutineCategory } from "@/types/workout";
import { COLORS } from "./workouts";

export const CAT_STYLES: Record<RoutineCategory, { color: string; label: string }> = {
  wake:    { color: "#FFB347", label: "WAKE" },
  meal:    { color: COLORS.red, label: "EAT" },
  workout: { color: COLORS.gold, label: "TRAIN" },
  cardio:  { color: "#A8FF78", label: "CARDIO" },
  posture: { color: COLORS.blue, label: "POSTURE" },
  face:    { color: "#FF9EF5", label: "FACE" },
  habit:   { color: COLORS.muted, label: "HABIT" },
  work:    { color: "#333333", label: "WORK" },
  sleep:   { color: COLORS.purple, label: "SLEEP" },
};

export const ROUTINE_TEMPLATE: RoutineTemplate = {
  workday: [
    { time: "6:30 AM", dur: "5m",   icon: "⏰", label: "Wake Up — No Snooze",       cat: "wake",    note: "Feet on floor immediately. Non-negotiable." },
    { time: "6:35 AM", dur: "10m",  icon: "💧", label: "Lemon Water + Freshen Up",   cat: "habit",   note: "500ml warm water. Brush. Face wash." },
    { time: "6:45 AM", dur: "10m",  icon: "🧘", label: "Morning Posture Routine",    cat: "posture", note: "Hip flexor, chest stretch, chin tucks, wall angels, PPT hold." },
    { time: "6:55 AM", dur: "5m",   icon: "😮", label: "Face Yoga",                  cat: "face",    note: "Cheek puffs, jaw clench, big smile, fish face, neck tilt." },
    { time: "7:00 AM", dur: "30m",  icon: "🚶", label: "Brisk Morning Walk",         cat: "cardio",  note: "Fasted state = fat burning. Walk TALL — posture practice." },
    { time: "7:30 AM", dur: "5m",   icon: "🚿", label: "Cold Shower",                cat: "habit",   note: "Warm start, end cold 30s. Reduces inflammation." },
    { time: "8:00 AM", dur: "20m",  icon: "🍳", label: "Breakfast",                  cat: "meal",    note: "4 eggs + carbs + fruit + coffee. Eat slow." },
    { time: "8:20 AM", dur: "160m", icon: "💼", label: "Deep Work Block",            cat: "work",    note: "Most important tasks. 5-min standing break each hour." },
    { time: "11:00 AM",dur: "5m",   icon: "🥜", label: "Mid-Morning Snack",          cat: "meal",    note: "Nuts + water. Prevents overeating at lunch." },
    { time: "1:00 PM", dur: "30m",  icon: "🍚", label: "Lunch",                      cat: "meal",    note: "Biggest meal. No screen. Eat slow." },
    { time: "1:30 PM", dur: "15m",  icon: "🚶", label: "Post-Lunch Walk",            cat: "cardio",  note: "15 min light walk. Improves digestion, avoids energy crash." },
    { time: "3:30 PM", dur: "10m",  icon: "💧", label: "Hydration Break",            cat: "habit",   note: "500ml water. Prep workout clothes." },
    { time: "4:00 PM", dur: "10m",  icon: "⚡", label: "Pre-Workout Snack",          cat: "meal",    note: "Banana + protein. Eat 45 min before training." },
    { time: "4:45 PM", dur: "10m",  icon: "🔥", label: "Dynamic Warm-Up",            cat: "workout", note: "See pre-workout mobility routine." },
    { time: "5:00 PM", dur: "60m",  icon: "💪", label: "TRAINING SESSION",           cat: "workout", note: "Follow day's specific workout. Log all reps." },
    { time: "6:00 PM", dur: "10m",  icon: "🧊", label: "Cool Down + Static Stretch", cat: "workout", note: "Full post-workout stretch routine." },
    { time: "6:10 PM", dur: "25m",  icon: "🚿", label: "Shower + Recovery",          cat: "habit",   note: "Cold/normal shower. Change clothes." },
    { time: "7:00 PM", dur: "30m",  icon: "🍗", label: "Dinner",                     cat: "meal",    note: "High protein. Within 1hr of workout." },
    { time: "8:30 PM", dur: "30m",  icon: "📋", label: "Plan + Journal",             cat: "habit",   note: "Log workout. Plan tomorrow. Note energy levels." },
    { time: "9:00 PM", dur: "10m",  icon: "🌙", label: "Night Snack",                cat: "meal",    note: "Milk or curd only." },
    { time: "9:10 PM", dur: "10m",  icon: "😮", label: "Evening Face Yoga",          cat: "face",    note: "Quick face routine before wind-down." },
    { time: "9:20 PM", dur: "10m",  icon: "🧘", label: "Evening Deload Stretch",     cat: "posture", note: "Pigeon pose, supine twist, legs up wall." },
    { time: "9:30 PM", dur: "30m",  icon: "📵", label: "No Screen Wind Down",        cat: "habit",   note: "Phone on charge away from bed. Read or breathe." },
    { time: "10:00 PM",dur: "510m", icon: "😴", label: "SLEEP — 8.5 hrs",           cat: "sleep",   note: "Lights out by 10 PM. This is when fat burns and muscles grow." },
  ],
};
