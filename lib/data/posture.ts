import type { PostureData } from "@/types/workout";
import { COLORS } from "./workouts";

export const POSTURE_DATA: PostureData = {
  issues: [
    {
      name: "Anterior Pelvic Tilt (APT)",
      color: COLORS.purple,
      cause:
        "Tight hip flexors (from sitting) + weak glutes + weak deep core. Causes bum to protrude and belly to push forward.",
      fixes: [
        "Hip flexor stretch — DAILY, 60s each side minimum",
        "Glute bridges — squeeze hard, tuck pelvis at top",
        "Posterior pelvic tilt holds — flatten lower back to floor",
        "Dead bug — trains deep core to hold neutral pelvis",
        "Donkey kicks + fire hydrants — direct glute activation",
      ],
      timeline: "Noticeable in 3–4 weeks, largely corrected by week 8",
    },
    {
      name: "Rounded Shoulders / Forward Head",
      color: COLORS.blue,
      cause:
        "Tight pectorals pulling shoulders forward + weak mid/lower traps + weak deep neck flexors from phone use.",
      fixes: [
        "Doorway chest stretch — DAILY, 45s each side",
        "Face pulls (towel) — 3× per week minimum",
        "Wall angels — every push day and daily routine",
        "Chin tucks — 15–20 reps daily, lying version best",
        "Scapular pull-ups — teaches correct shoulder blade position",
      ],
      timeline: "Significant improvement in 4–6 weeks, natural by week 10",
    },
  ],
  dailyRoutine: [
    { move: "Hip Flexor Stretch",           time: "60s × each",    why: "APT root cause release" },
    { move: "Posterior Pelvic Tilt Hold",    time: "20 reps + 30s", why: "Core APT corrector" },
    { move: "Doorway Chest Stretch",        time: "45s × each",    why: "Opens rounded shoulders" },
    { move: "Wall Angels",                  time: "12 reps × 2",   why: "Shoulder retraction training" },
    { move: "Chin Tucks",                   time: "15 reps × 3",   why: "Forward head fix" },
    { move: "Thoracic Extension over chair",time: "30s × 3",       why: "Opens stiff upper spine" },
  ],
  habits: [
    "Sitting: feet flat, back straight, screen at eye level",
    "Standing: weight even, knees soft, tailbone slightly tucked",
    "Walking: chin parallel to floor, shoulders back, arms swinging",
    "Phone use: bring phone UP to eye level — don't drop head down",
    "Set reminder every 2 hours: check and correct posture",
    "Sleep on back or side — NEVER stomach (worsens APT and neck)",
  ],
};
