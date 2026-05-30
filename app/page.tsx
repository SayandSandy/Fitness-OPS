"use client";

import { useShallow } from "zustand/react/shallow";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { useUserStore } from "@/lib/store/useUserStore";
import { useStreakStore } from "@/lib/store/useStreakStore";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { WEEK_SCHEDULE, WORKOUTS } from "@/lib/data/workouts";
import { WEEK_NARRATIVES, WORKOUT_FLAVORS } from "@/lib/data/narrative";
import { getCurrentWeek, getDayKey, formatDate } from "@/lib/utils/dates";
import { getLevelProgress, getXPToNextLevel } from "@/lib/utils/xp";
import { DAILY_QUESTS } from "@/lib/data/quests";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Flame,
  Zap,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  const { level, levelName, xp, gems } = useUserStore(
    useShallow((s) => ({ level: s.level, levelName: s.levelName, xp: s.xp, gems: s.gems }))
  );
  const { currentStreak, longestStreak } = useStreakStore(
    useShallow((s) => ({ currentStreak: s.currentStreak, longestStreak: s.longestStreak }))
  );
  const weeklyCount = useStreakStore((s) => s.getWeeklyCount());
  const today = formatDate();
  const recoveryScore = useJournalStore((s) => s.getRecoveryScore(today));

  const currentWeek = getCurrentWeek();
  const narrative = WEEK_NARRATIVES.find((n) => n.week === currentWeek);
  const todayKey = getDayKey();
  const todaySchedule = WEEK_SCHEDULE.find((s) => s.day === todayKey);
  const todayWorkout = todaySchedule ? WORKOUTS[todaySchedule.type] : null;
  const flavor = WORKOUT_FLAVORS.find((f) => f.type === todaySchedule?.type);
  const progress = getLevelProgress(xp);
  const xpToNext = getXPToNextLevel(xp);

  const recoveryColor =
    recoveryScore >= 80
      ? "var(--theme-orange)"
      : recoveryScore >= 60
      ? "var(--theme-accent-dark)"
      : "var(--theme-red)";

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />

      <motion.div
        className="px-4 py-4 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Week Narrative Banner */}
        {narrative && (
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-xl border border-[var(--theme-orange)]/20 card-dark p-4"
          >
            <div className="absolute top-2 right-3 text-[8px] tracking-[4px] text-[var(--theme-orange)]/60 uppercase">
              WEEK {currentWeek}/10
            </div>
            <div className="font-display text-lg text-[var(--theme-orange)] tracking-wider leading-none">
              {narrative.title}
            </div>
            <div className="text-[11px] text-[var(--theme-muted)] mt-1.5 leading-relaxed">
              {narrative.text}
            </div>
            {/* Progress bar for weeks */}
            <div className="mt-3 h-1 bg-[var(--theme-dim)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--theme-orange)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${currentWeek * 10}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Today's Workout Card */}
        {todaySchedule && todayWorkout && (
          <motion.div variants={item}>
            <Link href={`/workouts/${todaySchedule.type}`}>
              <div
                className="relative overflow-hidden rounded-xl p-4 border transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  borderColor: todaySchedule.color + "40",
                  background: `linear-gradient(135deg, var(--theme-card) 0%, ${todaySchedule.color}08 100%)`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className="text-[9px] tracking-[3px] uppercase font-bold"
                      style={{ color: todaySchedule.color }}
                    >
                      TODAY — {todaySchedule.day}
                    </div>
                    <div className="font-display text-2xl tracking-wider text-[var(--foreground)] mt-0.5">
                      {todayWorkout.title}
                    </div>
                    <div className="text-[11px] text-[var(--theme-muted)] mt-0.5">
                      {todayWorkout.subtitle}
                    </div>
                    {flavor && (
                      <div
                        className="text-[10px] mt-2 italic"
                        style={{ color: todaySchedule.color + "aa" }}
                      >
                        &ldquo;{flavor.text}&rdquo;
                      </div>
                    )}
                  </div>
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full border"
                    style={{
                      borderColor: todaySchedule.color + "60",
                      color: todaySchedule.color,
                    }}
                  >
                    <ChevronRight size={20} />
                  </div>
                </div>

                <div
                  className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                  style={{ color: todaySchedule.color }}
                >
                  <Zap size={12} />
                  <span>
                    {todayWorkout.exercises.length} EXERCISES · START WORKOUT →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Stats Row */}
        <motion.div
          variants={item}
          className="grid grid-cols-4 gap-2"
        >
          {[
            {
              icon: <Flame size={16} className="text-[#FF6B35]" />,
              value: currentStreak,
              label: "STREAK",
              color: "#FF6B35",
            },
            {
              icon: <Target size={16} className="text-[var(--theme-orange)]" />,
              value: `${weeklyCount}/6`,
              label: "THIS WEEK",
              color: "var(--theme-orange)",
            },
            {
              icon: <Trophy size={16} className="text-[var(--theme-accent-dark)]" />,
              value: level,
              label: levelName.toUpperCase(),
              color: "var(--theme-accent-dark)",
            },
            {
              icon: (
                <TrendingUp size={16} style={{ color: recoveryColor }} />
              ),
              value: recoveryScore,
              label: "RECOVERY",
              color: recoveryColor,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group flex flex-col items-center p-3 rounded-xl card-dark hover:border-[var(--theme-orange)]/50 hover:card-dark hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {stat.icon}
              <span
                className="font-display text-xl leading-none mt-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-[7px] tracking-wider text-[var(--theme-muted)] mt-0.5 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* XP Progress Card */}
        <motion.div
          variants={item}
          className="rounded-xl p-4 card-dark hover:border-[var(--theme-orange)]/30 transition-all duration-300 shadow-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[3px] text-[var(--theme-muted)] uppercase">
                EXPERIENCE POINTS
              </span>
            </div>
            <div className="text-[10px] text-[var(--theme-orange)] font-bold">
              {xpToNext} XP to Level {level + 1}
            </div>
          </div>
          <div className="h-2 bg-[var(--theme-dim)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--theme-orange)] to-[var(--theme-accent-dark)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] text-[var(--theme-muted)]">
            <span>LVL {level} — {levelName}</span>
            <span>{xp} XP Total</span>
          </div>
        </motion.div>

        {/* Weekly Schedule Preview */}
        <motion.div variants={item}>
          <div className="text-[9px] tracking-[3px] text-[var(--theme-muted)] uppercase mb-2">
            WEEKLY SPLIT
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {WEEK_SCHEDULE.map((day) => {
              const isToday = day.day === todayKey;
              return (
                <Link
                  key={day.day}
                  href={`/workouts/${day.type}`}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-150 ${
                    isToday
                      ? "scale-105"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: isToday ? day.color + "15" : "var(--theme-card)",
                    borderColor: isToday ? day.color + "60" : "var(--theme-border)",
                  }}
                >
                  <span
                    className="text-[9px] font-bold"
                    style={{ color: isToday ? day.color : "var(--theme-muted)" }}
                  >
                    {day.day}
                  </span>
                  <span
                    className="text-[7px] mt-0.5"
                    style={{ color: isToday ? day.color : "var(--theme-dim)" }}
                  >
                    {day.type === "rest" ? "REST" : "TRAIN"}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Quests Preview */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] tracking-[3px] text-[var(--theme-muted)] uppercase">
              DAILY QUESTS
            </div>
            <span className="text-[9px] text-[var(--theme-orange)] font-bold">
              +{DAILY_QUESTS.reduce((a, q) => a + q.xp, 0)} XP
            </span>
          </div>
          <div className="space-y-1.5">
            {DAILY_QUESTS.map((quest) => (
              <div
                key={quest.id}
                className="group flex items-center gap-3 p-3 rounded-lg card-dark hover:border-[var(--theme-orange)]/50 hover:card-dark transition-all duration-300 cursor-pointer"
              >
                <div className="w-4 h-4 rounded border-2 border-[var(--theme-dim)] group-hover:border-[var(--theme-orange)] flex-shrink-0 transition-colors duration-300" />
                <span className="text-[11px] text-[var(--foreground)] flex-1">
                  {quest.title}
                </span>
                <span className="text-[9px] text-[var(--theme-orange)] font-bold">
                  +{quest.xp}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Longest Streak */}
        {longestStreak > 0 && (
          <motion.div
            variants={item}
            className="text-center p-3 rounded-xl card-dark border-[var(--theme-border)]"
          >
            <div className="text-[8px] tracking-[3px] text-[var(--theme-muted)] uppercase">
              LONGEST STREAK RECORD
            </div>
            <div className="font-display text-2xl text-[#FF6B35] mt-0.5">
              🔥 {longestStreak} DAYS
            </div>
          </motion.div>
        )}
      </motion.div>

      <BottomNav />
    </div>
  );
}
