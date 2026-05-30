import type { MobilityData } from "@/types/workout";

export const MOBILITY_DATA: MobilityData = {
  morning: {
    title: "Morning Mobility (7 min)",
    timing: "Every morning, before breakfast. Activates body, improves posture all day.",
    moves: [
      { name: "Cat-Cow",            reps: "10 cycles",   note: "Slow, breathe with each rep" },
      { name: "Hip Flexor Stretch", reps: "45s each",    note: "Daily APT fix" },
      { name: "Thoracic Rotation",  reps: "8 each side", note: "Seated, rotate upper back" },
      { name: "Chin Tucks",         reps: "15 reps",     note: "Forward head correction" },
      { name: "Wall Angels",        reps: "10 reps",     note: "Shoulder posture reset" },
      { name: "Wrist Circles",      reps: "20 each way", note: "Prep for arm training" },
      { name: "Deep Breathing",     reps: "10 breaths",  note: "Diaphragmatic, into belly" },
    ],
  },
  preworkout: {
    title: "Pre-Workout Dynamic (5 min)",
    timing: "10 min before training. Dynamic only — NO static stretching before workout.",
    moves: [
      { name: "Arm Circles",        reps: "20 each way", note: "Small to large" },
      { name: "Shoulder Rolls",     reps: "10 each",     note: "Full range" },
      { name: "Hip Circles",        reps: "10 each way", note: "Loosen hip flexors" },
      { name: "Leg Swings",         reps: "10 each",     note: "Forward/back + side to side" },
      { name: "Jumping Jacks",      reps: "30",          note: "Raise heart rate" },
      { name: "Light Jog in place", reps: "60 sec",      note: "Get warm" },
    ],
  },
  postworkout: {
    title: "Post-Workout Static (10 min)",
    timing: "Immediately after training. Hold each 30–45 sec. Body is warm = best time to stretch.",
    moves: [
      { name: "Doorway Chest Stretch",  reps: "45s × 2",  note: "Arms at 90°, lean through" },
      { name: "Bicep Wall Stretch",     reps: "30s each",  note: "Arm straight on wall, rotate away" },
      { name: "Tricep Overhead Stretch",reps: "30s each",  note: "Elbow behind head, push down" },
      { name: "Hip Flexor Lunge",       reps: "45s each",  note: "Knee on floor, push hips forward" },
      { name: "Figure-4 Glute Stretch", reps: "45s each",  note: "Lying or seated" },
      { name: "Lat Stretch",            reps: "30s each",  note: "Arm overhead, lean to side" },
      { name: "Child's Pose",           reps: "60 sec",    note: "Full back and shoulder release" },
      { name: "Seated Hamstring Stretch",reps: "45s each", note: "Don't bounce" },
    ],
  },
  evening: {
    title: "Evening Deload (5 min)",
    timing: "Before bed. Signals body to recover. Reduces soreness next day.",
    moves: [
      { name: "Pigeon Pose",    reps: "60s each", note: "Deep glute release" },
      { name: "Supine Twist",   reps: "30s each", note: "Lie on back, knee across body" },
      { name: "Legs Up the Wall",reps: "2 min",   note: "Recovery & lymph drainage" },
      { name: "Deep Breathing", reps: "5 min",    note: "Box breathing: 4-4-4-4" },
    ],
  },
};
