import type { ArmProgram } from "@/types/workout";

export const ARM_PROGRAM: ArmProgram = {
  overview:
    "Arms are trained 4× per week: directly on Mon/Wed, and as secondary on Tue/Sat. Progressive overload every 2 weeks.",
  principles: [
    "Chin-ups & pull-up variations = best calisthenics bicep builders",
    "Diamond push-ups & dips = best tricep builders without weights",
    "Neutral grip (commando) pull-ups = brachialis = arm THICKNESS",
    "Dead hangs & wrist curls = forearm size and grip strength",
    "Full range of motion ALWAYS — partial reps = partial results",
    "Supinate (turn palm up) at top of chin-ups for peak contraction",
  ],
  exercises: [
    { name: "Chin-ups",           muscle: "Biceps (primary)",      sets: "4×5–8",   prog: "Add 1 rep/week. Week 6: archer chin-ups." },
    { name: "Commando Pull-ups",  muscle: "Brachialis (thickness)",sets: "3×6 ea",  prog: "Week 5: add 1 rep/set. Week 8: weighted backpack." },
    { name: "Diamond Push-ups",   muscle: "Triceps (primary)",     sets: "4×8–12",  prog: "Week 4: elevate feet. Week 7: weighted vest/bag." },
    { name: "Tricep Dips (chair)",muscle: "Triceps (all 3 heads)", sets: "4×10–12", prog: "Week 5: slow 3s descent. Week 8: single-leg dips." },
    { name: "Close-Grip Push-ups",muscle: "Triceps + inner chest", sets: "3×10",    prog: "Week 5: add a set. Week 8: archer push-ups." },
    { name: "Negative Chin-ups",  muscle: "Bicep peak",            sets: "3×5 slow",prog: "5s descent wk1→3, 8s wk5→8, 10s wk9–10." },
    { name: "Dead Hang",          muscle: "Forearms (endurance)",   sets: "3×30s",   prog: "+5s every 2 weeks. Target: 60s by week 10." },
    { name: "Wrist Curls",        muscle: "Forearm flexors",       sets: "3×20",    prog: "Heavier bottle weekly. Week 6: use a bag." },
    { name: "Reverse Wrist Curls",muscle: "Forearm extensors",     sets: "3×20",    prog: "Match wrist curl weight always." },
    { name: "Pike Push-ups",      muscle: "Shoulders (size)",      sets: "3×10–12", prog: "Week 5: feet elevated. Week 9: wall handstand hold." },
  ],
  frequency: [
    { day: "MON", focus: "Triceps primary (dips, diamond push-ups) + shoulders (pike push-ups)" },
    { day: "WED", focus: "Biceps primary (chin-ups, pull-ups, negatives) + forearms" },
    { day: "SAT", focus: "Arms secondary — chin-ups + diamond push-ups in burn circuit" },
    { day: "TUE/THU", focus: "Arms via cardio — dead hangs if energy allows (optional)" },
  ],
};
