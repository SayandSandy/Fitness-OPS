"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WORKOUTS, TAG_STYLES } from "@/lib/data/workouts";
import { WORKOUT_FLAVORS } from "@/lib/data/narrative";
import { useWorkoutStore } from "@/lib/store/useWorkoutStore";
import { useUserStore } from "@/lib/store/useUserStore";
import { useStreakStore } from "@/lib/store/useStreakStore";
import { XP_AWARDS } from "@/lib/utils/xp";
import { formatDate } from "@/lib/utils/dates";
import { playBeep } from "@/lib/utils/sounds";
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Timer,
  SkipForward,
  Trophy,
  Zap,
} from "lucide-react";
import type { WorkoutType } from "@/types/workout";

// Rest Timer Component (inline for simplicity)
function RestTimerOverlay({
  duration,
  onComplete,
  onSkip,
}: {
  duration: number;
  onComplete: () => void;
  onSkip: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        if (prev <= 4 && prev > 1 && soundEnabled) {
          playBeep(800, 80, 0.2);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete, soundEnabled]);

  const progress = 1 - timeLeft / duration;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - progress);

  const color =
    timeLeft > 30
      ? "var(--theme-orange)"
      : timeLeft > 15
      ? "var(--theme-accent-dark)"
      : "var(--theme-red)";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: "rgba(8, 11, 15, 0.9)", backdropFilter: "blur(8px)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-[10px] tracking-[4px] text-[var(--muted-foreground)] uppercase">
          REST TIME
        </div>

        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="var(--theme-dim)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl" style={{ color }}>
              {timeLeft}
            </span>
            <span className="text-[9px] text-[var(--muted-foreground)] tracking-wider uppercase">
              SECONDS
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="px-6 py-2.5 rounded-lg border text-[11px] font-bold tracking-wider uppercase transition-all hover:card-dark"
            style={{
              borderColor: "var(--theme-border)",
              color: "var(--muted-foreground)",
            }}
          >
            SKIP REST
          </button>
          <button
            onClick={() => setTimeLeft((t) => t + 30)}
            className="px-6 py-2.5 rounded-lg border text-[11px] font-bold tracking-wider uppercase transition-all hover:card-dark"
            style={{
              borderColor: color + "60",
              color: color,
            }}
          >
            +30s
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Workout Complete Screen
function WorkoutComplete({
  xpEarned,
  exerciseCount,
  onClose,
}: {
  xpEarned: number;
  exerciseCount: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        backgroundColor: "rgba(8, 11, 15, 0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-4 p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
        >
          <Trophy size={64} className="text-[var(--theme-accent-dark)]" />
        </motion.div>

        <div className="font-display text-3xl tracking-wider text-[var(--foreground)] text-center">
          WORKOUT COMPLETE
        </div>

        <div className="flex gap-6 mt-2">
          <div className="text-center">
            <div className="font-display text-2xl text-[var(--theme-orange)]">
              {exerciseCount}
            </div>
            <div className="text-[8px] tracking-wider text-[var(--muted-foreground)] uppercase">
              EXERCISES
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl text-[var(--theme-accent-dark)]">
              +{xpEarned}
            </div>
            <div className="text-[8px] tracking-wider text-[var(--muted-foreground)] uppercase">
              XP EARNED
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-8 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "var(--theme-orange)",
            color: "var(--background)",
          }}
        >
          CONTINUE
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function WorkoutDayClientPage({ day }: { day: string }) {
  const workout = WORKOUTS[day as WorkoutType];
  const flavor = WORKOUT_FLAVORS.find((f) => f.type === day);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentEx, setCurrentEx] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({});
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const restDuration = useSettingsStore((s) => s.restTimerDuration);

  const addXP = useUserStore((s) => s.addXP);
  const addCheckin = useStreakStore((s) => s.addCheckin);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center text-[var(--muted-foreground)]">
        Workout not found
      </div>
    );
  }

  const handleCompleteSet = () => {
    const sets = (completedSets[currentEx] || 0) + 1;
    const targetSets = parseInt(workout.exercises[currentEx].sets) || 3;

    setCompletedSets((prev) => ({ ...prev, [currentEx]: sets }));
    setTotalXP((prev) => prev + XP_AWARDS.complete_set);

    if (sets >= targetSets) {
      // Exercise complete
      setCompletedExercises((prev) => new Set(prev).add(currentEx));
      setTotalXP((prev) => prev + XP_AWARDS.complete_exercise);

      if (currentEx < workout.exercises.length - 1) {
        setShowRestTimer(true);
      } else {
        // Workout complete!
        const finalXP = totalXP + XP_AWARDS.complete_set + XP_AWARDS.complete_exercise + XP_AWARDS.complete_workout;
        setTotalXP(finalXP);
        addXP(finalXP);
        addCheckin(formatDate(), "complete", day);
        setSessionActive(false);
        setShowComplete(true);
      }
    } else {
      setShowRestTimer(true);
    }
  };

  const handleRestComplete = () => {
    setShowRestTimer(false);
    if (completedExercises.has(currentEx) && currentEx < workout.exercises.length - 1) {
      setCurrentEx((prev) => prev + 1);
    }
  };

  const tagStyle = TAG_STYLES[workout.exercises[currentEx]?.tag] || {
    color: "var(--muted-foreground)",
    label: "MISC",
  };

  // ─── Session Active View ──────────────────────────────────────────────────
  if (sessionActive) {
    const ex = workout.exercises[currentEx];
    const setsCompleted = completedSets[currentEx] || 0;
    const targetSets = parseInt(ex.sets) || 3;

    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        <AnimatePresence>
          {showRestTimer && (
            <RestTimerOverlay
              duration={restDuration}
              onComplete={handleRestComplete}
              onSkip={handleRestComplete}
            />
          )}
        </AnimatePresence>

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--theme-border)]">
          <button
            onClick={() => setSessionActive(false)}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-[10px] tracking-[3px] text-[var(--muted-foreground)] uppercase">
            {currentEx + 1} / {workout.exercises.length}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--theme-accent-dark)]">
            <Zap size={12} />
            <span>+{totalXP}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[var(--theme-dim)]">
          <div
            className="h-full bg-[var(--theme-orange)] transition-all duration-300"
            style={{
              width: `${((currentEx + (setsCompleted / targetSets)) / workout.exercises.length) * 100}%`,
            }}
          />
        </div>

        {/* Exercise Display */}
        <motion.div
          key={currentEx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col items-center justify-center px-6 text-center"
        >
          <div
            className="px-3 py-1 rounded text-[9px] font-bold tracking-[2px] uppercase mb-3"
            style={{
              backgroundColor: tagStyle.color + "20",
              color: tagStyle.color,
            }}
          >
            {tagStyle.label}
          </div>

          <h2 className="font-display text-3xl tracking-wider text-[var(--foreground)] mb-2">
            {ex.name}
          </h2>

          <div className="text-[12px] text-[var(--muted-foreground)] max-w-xs mb-6">
            {ex.note}
          </div>

          {/* Sets Display */}
          <div className="flex gap-2 mb-8">
            {Array.from({ length: targetSets }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                style={{
                  borderColor:
                    i < setsCompleted
                      ? "var(--theme-orange)"
                      : "var(--theme-dim)",
                  backgroundColor:
                    i < setsCompleted
                      ? "var(--theme-orange)"
                      : "transparent",
                  color:
                    i < setsCompleted
                      ? "var(--background)"
                      : "var(--muted-foreground)",
                }}
              >
                {i < setsCompleted ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <span className="text-[10px] font-bold">{i + 1}</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[var(--muted-foreground)] mb-6">
            Target: <span className="text-[var(--foreground)] font-bold">{ex.reps}</span> reps
          </div>

          {/* Complete Set Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCompleteSet}
            className="w-full max-w-xs py-4 rounded-xl font-bold text-base tracking-wider uppercase transition-all"
            style={{
              backgroundColor: "var(--theme-orange)",
              color: "var(--background)",
            }}
          >
            {setsCompleted >= targetSets - 1 && !completedExercises.has(currentEx)
              ? "FINISH EXERCISE"
              : `COMPLETE SET ${setsCompleted + 1}`}
          </motion.button>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--theme-border)]">
          <button
            onClick={() => setCurrentEx(Math.max(0, currentEx - 1))}
            disabled={currentEx === 0}
            className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] disabled:opacity-30"
          >
            <ChevronLeft size={14} /> PREV
          </button>

          <button
            onClick={() => {
              setCompletedExercises((prev) => new Set(prev).add(currentEx));
              setCurrentEx(Math.min(workout.exercises.length - 1, currentEx + 1));
            }}
            className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]"
          >
            <SkipForward size={14} /> SKIP
          </button>

          <button
            onClick={() =>
              setCurrentEx(Math.min(workout.exercises.length - 1, currentEx + 1))
            }
            disabled={currentEx === workout.exercises.length - 1}
            className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] disabled:opacity-30"
          >
            NEXT <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // ─── Workout Overview View ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />

      <AnimatePresence>
        {showComplete && (
          <WorkoutComplete
            xpEarned={totalXP}
            exerciseCount={workout.exercises.length}
            onClose={() => setShowComplete(false)}
          />
        )}
      </AnimatePresence>

      <div className="px-4 py-4">
        {/* Workout Header */}
        <div
          className="rounded-xl p-4 mb-4 border-l-[3px]"
          style={{
            borderColor: workout.color,
            backgroundColor: "var(--theme-card)",
          }}
        >
          <div
            className="font-display text-2xl tracking-wider leading-none"
            style={{ color: workout.color }}
          >
            {workout.title}
          </div>
          <div className="text-[11px] text-[var(--muted-foreground)] mt-1">
            {workout.subtitle}
          </div>
          {flavor && (
            <div
              className="text-[10px] mt-2 italic"
              style={{ color: workout.color + "aa" }}
            >
              &ldquo;{flavor.text}&rdquo;
            </div>
          )}

          <div className="mt-3 text-[11px]">
            <span className="text-[var(--theme-orange)] font-bold">
              WARM-UP:{" "}
            </span>
            <span className="text-[var(--muted-foreground)]">
              {workout.warmup}
            </span>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setSessionActive(true);
            setCurrentEx(0);
            setCompletedSets({});
            setCompletedExercises(new Set());
            setTotalXP(0);
          }}
          className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase mb-4 flex items-center justify-center gap-2 transition-all hover:brightness-110"
          style={{
            backgroundColor: workout.color,
            color: "#000",
          }}
        >
          <Timer size={16} />
          START WORKOUT
        </motion.button>

        {/* Rest instructions */}
        <div className="text-[9px] text-[var(--muted-foreground)] tracking-[2px] uppercase mb-3 text-center">
          REST {restDuration}S BETWEEN SETS
        </div>

        {/* Exercise List */}
        <motion.div
          className="space-y-2"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          initial="hidden"
          animate="show"
        >
          {workout.exercises.map((ex, i) => {
            const tag = TAG_STYLES[ex.tag] || {
              color: "var(--muted-foreground)",
              label: ex.tag.toUpperCase(),
            };
            const isCompleted = completedExercises.has(i);

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                className="rounded-xl p-3 border-l-[3px]"
                style={{
                  borderColor: tag.color,
                  backgroundColor: "var(--theme-card)",
                  opacity: isCompleted ? 0.5 : 1,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span
                      className="inline-block px-1.5 py-0.5 rounded text-[7px] font-bold tracking-[1px] uppercase mb-1"
                      style={{
                        backgroundColor: tag.color + "20",
                        color: tag.color,
                      }}
                    >
                      {tag.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle2
                          size={14}
                          className="text-[var(--theme-orange)] flex-shrink-0"
                        />
                      ) : (
                        <Circle
                          size={14}
                          className="text-[var(--theme-dim)] flex-shrink-0"
                        />
                      )}
                      <span className="text-[13px] font-bold text-[var(--foreground)]">
                        {ex.name}
                      </span>
                    </div>
                    {ex.note && (
                      <div className="text-[10px] text-[var(--muted-foreground)] mt-1 ml-5 leading-relaxed">
                        {ex.note}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1.5 flex-shrink-0">
                    {[
                      { l: "SETS", v: ex.sets },
                      { l: "REPS", v: ex.reps },
                    ].map((b, j) => (
                      <div
                        key={j}
                        className="rounded-md px-2 py-1 text-center"
                        style={{ backgroundColor: "var(--theme-dim)" }}
                      >
                        <div className="text-[7px] text-[var(--muted-foreground)]">
                          {b.l}
                        </div>
                        <div
                          className="text-[12px] font-bold"
                          style={{ color: workout.color }}
                        >
                          {b.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Cooldown */}
        <div
          className="mt-3 rounded-xl p-3 border-l-[3px]"
          style={{
            borderColor: "var(--theme-orange)",
            backgroundColor: "var(--theme-card)",
          }}
        >
          <span className="text-[var(--theme-orange)] font-bold text-[10px]">
            COOL-DOWN:{" "}
          </span>
          <span className="text-[11px] text-[var(--muted-foreground)]">
            {workout.cooldown}
          </span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
