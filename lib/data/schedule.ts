import type { ProgressionPhase, TrackingData } from "@/types/tracking";

export const TRACKING_DATA: TrackingData = {
  measurements: [
    { metric: "Body Weight",        freq: "Every Monday",  method: "Morning, post-bathroom, same time, same scale" },
    { metric: "Waist Circumference",freq: "Every 2 weeks", method: "Navel level, exhale normally, don't suck in" },
    { metric: "Upper Arm (flexed)", freq: "Every 2 weeks", method: "Flex bicep, tape around largest point" },
    { metric: "Upper Arm (relaxed)",freq: "Every 2 weeks", method: "Arm at side, relaxed, same spot" },
    { metric: "Forearm",            freq: "Every 2 weeks", method: "Widest point, arm extended" },
    { metric: "Chest",              freq: "Every 2 weeks", method: "Arms relaxed, tape under armpits" },
    { metric: "Hips",               freq: "Every 2 weeks", method: "Widest point of glutes" },
    { metric: "Progress Photos",    freq: "Every 2 weeks", method: "Same time, same light, same 3 angles: front, side, back" },
  ],
  progression: [
    { phase: "Wk 1–2",  focus: "Foundation", desc: "Learn every exercise with perfect form. Rest 60s. Stretch hip flexors twice daily. Log every set." },
    { phase: "Wk 3–4",  focus: "Build",      desc: "Add 1–2 reps per exercise. Hold planks 5s longer. Posture improving. Arm soreness = growth." },
    { phase: "Wk 5–6",  focus: "Volume",     desc: "Add 1 set per key exercise. Rest 45s. Chin-up negatives go to 8s. Elevated push-up variations." },
    { phase: "Wk 7–8",  focus: "Intensity",  desc: "Superset pairs (push + pull back to back). 30s rest. Add weighted backpack to chin-ups if ready." },
    { phase: "Wk 9–10", focus: "Peak",       desc: "HIIT finishers after every session. Max effort. Test: how many chin-ups can you do now vs week 1?" },
  ],
  sleep: [
    "10 PM lights out — 6:30 AM alarm = 8.5 hrs. Non-negotiable.",
    "Sleep is when growth hormone surges — muscles are built at night, not in the gym",
    "Poor sleep raises cortisol → cortisol stores fat specifically in belly and face",
    "Phone away from bed. Blue light suppresses melatonin for 2 hours after exposure.",
    "If sore, sleep MORE — 9 hours on hard training days",
    "Take Sunday nap 20 min if needed — full recovery before Monday",
  ],
};
