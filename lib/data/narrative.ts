import type { WeekNarrative, WorkoutFlavor } from "@/types/gamification";

export const WEEK_NARRATIVES: WeekNarrative[] = [
  { week: 1,  title: "INITIATION PHASE",  text: "Your body is raw material. Conditioning begins." },
  { week: 2,  title: "ADAPTATION",         text: "Your nervous system is rewiring. Pain is data." },
  { week: 3,  title: "VOLUME SURGE",       text: "Push through the plateau. Others quit here." },
  { week: 4,  title: "MID-POINT",          text: "Half-built. The transformation is visible now." },
  { week: 5,  title: "INTENSITY SPIKE",    text: "The program gets harder. So do you." },
  { week: 6,  title: "SECONDARY SYSTEMS",  text: "Posture corrected. Arms are responding." },
  { week: 7,  title: "PEAK PROTOCOL",      text: "Your limits are a suggestion." },
  { week: 8,  title: "REFINEMENT",         text: "Definition emerges from discipline." },
  { week: 9,  title: "FINAL APPROACH",     text: "70% of results happen in the last 20% of effort." },
  { week: 10, title: "PROTOCOL COMPLETE",  text: "You are the final product. Mission accomplished." },
];

export const WORKOUT_FLAVORS: WorkoutFlavor[] = [
  { type: "push",   text: "Upgrade your output systems. Every rep builds the chassis." },
  { type: "pull",   text: "Pull the world toward you. Biceps are levers of control." },
  { type: "cardio", text: "Burn the excess. Reveal what was always beneath." },
  { type: "core",   text: "Stabilize the core. Everything radiates from the center." },
  { type: "legs",   text: "Root yourself. Legs are the foundation of the machine." },
  { type: "burn",   text: "Maximum output. This is what you trained for." },
  { type: "rest",   text: "Recharge in the regeneration bay. Growth occurs in silence." },
];
