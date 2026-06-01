"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { LevelUpModal } from "@/components/layout/LevelUpModal";
import { useUserStore } from "@/lib/store/useUserStore";
import { useStreakStore } from "@/lib/store/useStreakStore";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { useQuestStore } from "@/lib/store/useQuestStore";
import { WEEK_SCHEDULE, WORKOUTS } from "@/lib/data/workouts";
import { WEEK_NARRATIVES, WORKOUT_FLAVORS } from "@/lib/data/narrative";
import { getCurrentWeek, getDayKey, formatDate } from "@/lib/utils/dates";
import { getLevelProgress, getXPToNextLevel } from "@/lib/utils/xp";
import { DAILY_QUESTS, WEEKLY_QUESTS } from "@/lib/data/quests";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  ChevronRight,
  Flame,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Check,
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
  const { level, levelName, xp, gems, addXP, addGems } = useUserStore(
    useShallow((s) => ({
      level: s.level,
      levelName: s.levelName,
      xp: s.xp,
      gems: s.gems,
      addXP: s.addXP,
      addGems: s.addGems,
    }))
  );
  const { currentStreak, longestStreak } = useStreakStore(
    useShallow((s) => ({ currentStreak: s.currentStreak, longestStreak: s.longestStreak }))
  );
  const weeklyCount = useStreakStore((s) => s.getWeeklyCount());
  
  const today = formatDate();
  const recoveryScore = useJournalStore((s) => s.getRecoveryScore(today));
  
  const { isCompleted, completeQuest } = useQuestStore(
    useShallow((s) => ({
      isCompleted: s.isCompleted,
      completeQuest: s.completeQuest,
    }))
  );

  const [levelUpData, setLevelUpData] = useState<{ show: boolean; level: number; name: string }>({
    show: false,
    level: 0,
    name: "",
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCompleteQuest = (questId: string, xpReward: number, gemReward?: number) => {
    if (!isCompleted(questId)) {
      completeQuest(questId);
      const leveledUp = addXP(xpReward);
      if (gemReward) addGems(gemReward);

      if (leveledUp) {
        const freshLevel = useUserStore.getState().level;
        const freshName = useUserStore.getState().levelName;
        setLevelUpData({ show: true, level: freshLevel, name: freshName });
      }
    }
  };

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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--background)] pb-24">
        <TopHeader />
        <div className="px-4 py-4 space-y-4">
          <Skeleton className="h-[90px] w-full rounded-xl" />
          <Skeleton className="h-[120px] w-full rounded-xl" />
          <div className="grid grid-cols-4 gap-2">
            <Skeleton className="h-[90px] w-full rounded-xl" />
            <Skeleton className="h-[90px] w-full rounded-xl" />
            <Skeleton className="h-[90px] w-full rounded-xl" />
            <Skeleton className="h-[90px] w-full rounded-xl" />
          </div>
          <Skeleton className="h-[90px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      
      <LevelUpModal
        isOpen={levelUpData.show}
        onClose={() => setLevelUpData({ ...levelUpData, show: false })}
        newLevel={levelUpData.level}
        newLevelName={levelUpData.name}
      />

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
            <div className="absolute top-2 right-3 text-[10px] tracking-[4px] text-[var(--theme-orange)]/60 uppercase">
              WEEK {currentWeek}/10
            </div>
            <div className="font-display text-lg text-[var(--theme-orange)] tracking-wider leading-none">
              {narrative.title}
            </div>
            <div className="text-[11px] text-[var(--theme-muted)] mt-1.5 leading-relaxed">
              {narrative.text}
            </div>
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
        {todaySchedule && todaySchedule.type !== "rest" && todayWorkout && (
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

        {/* Rest Day Card */}
        {todaySchedule && todaySchedule.type === "rest" && (
          <motion.div variants={item}>
            <div className="relative overflow-hidden rounded-xl p-4 border card-dark border-[var(--theme-accent-dark)]/30 bg-gradient-to-br from-[var(--theme-card)] to-[var(--theme-accent-dark)]/10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[9px] tracking-[3px] uppercase font-bold text-[var(--theme-accent-dark)]">
                    TODAY — {todaySchedule.day}
                  </div>
                  <div className="font-display text-2xl tracking-wider text-[var(--foreground)] mt-0.5">
                    ACTIVE RECOVERY
                  </div>
                  <div className="text-[11px] text-[var(--theme-muted)] mt-0.5">
                    Focus on mobility, sleep, and nutrition. Let the muscles rebuild.
                  </div>
                </div>
              </div>
            </div>
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
              href: "/tracking"
            },
            {
              icon: <Target size={16} className="text-[var(--theme-orange)]" />,
              value: `${weeklyCount}/6`,
              label: "THIS WEEK",
              color: "var(--theme-orange)",
              href: "/tracking"
            },
            {
              icon: <Trophy size={16} className="text-[var(--theme-accent-dark)]" />,
              value: level,
              label: levelName.toUpperCase(),
              color: "var(--theme-accent-dark)",
              href: "/profile"
            },
            {
              icon: (
                <TrendingUp size={16} style={{ color: recoveryScore === 50 ? "var(--theme-muted)" : recoveryColor }} />
              ),
              value: recoveryScore === 50 ? "—" : recoveryScore,
              label: "RECOVERY",
              color: recoveryScore === 50 ? "var(--theme-muted)" : recoveryColor,
              href: "/journal"
            },
          ].map((stat, i) => (
            <Link
              key={i}
              href={stat.href}
              className="group flex flex-col items-center p-3 rounded-xl card-dark hover:border-[var(--theme-orange)]/50 hover:card-dark hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {stat.icon}
              <span
                className="font-display text-xl leading-none mt-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-[11px] tracking-wider text-[var(--theme-muted)] mt-0.5 uppercase">
                {stat.label}
              </span>
            </Link>
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

        {/* Daily Quests */}
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
            {DAILY_QUESTS.map((quest) => {
              const completed = isCompleted(quest.id);
              return (
                <div
                  key={quest.id}
                  onClick={() => handleCompleteQuest(quest.id, quest.xp, quest.gems)}
                  className="group flex items-center gap-3 p-3 rounded-lg card-dark border transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: completed ? "var(--theme-orange)" : "transparent",
                    opacity: completed ? 0.7 : 1,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      completed
                        ? "border-[var(--theme-orange)] bg-[var(--theme-orange)]"
                        : "border-[var(--theme-dim)] group-hover:border-[var(--theme-orange)]"
                    }`}
                  >
                    {completed && <Check size={10} className="text-black" />}
                  </div>
                  <span
                    className={`text-[11px] flex-1 transition-all ${
                      completed ? "text-[var(--theme-muted)] line-through" : "text-[var(--foreground)]"
                    }`}
                  >
                    {quest.title}
                  </span>
                  {!completed && (
                    <span className="text-[9px] text-[var(--theme-orange)] font-bold">
                      +{quest.xp}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Quests */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-2 mt-4">
            <div className="text-[9px] tracking-[3px] text-[var(--theme-accent-dark)] uppercase">
              WEEKLY QUESTS
            </div>
          </div>
          <div className="space-y-1.5">
            {WEEKLY_QUESTS.map((quest) => {
              const completed = isCompleted(quest.id, `week_${currentWeek}`);
              return (
                <div
                  key={quest.id}
                  onClick={() => {
                    if (!completed) {
                      completeQuest(quest.id, `week_${currentWeek}`);
                      const leveledUp = addXP(quest.xp);
                      if (quest.gems) addGems(quest.gems);

                      if (leveledUp) {
                        const freshLevel = useUserStore.getState().level;
                        const freshName = useUserStore.getState().levelName;
                        setLevelUpData({ show: true, level: freshLevel, name: freshName });
                      }
                    }
                  }}
                  className="group flex items-center gap-3 p-3 rounded-lg card-dark border transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: completed ? "var(--theme-accent-dark)" : "transparent",
                    opacity: completed ? 0.7 : 1,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      completed
                        ? "border-[var(--theme-accent-dark)] bg-[var(--theme-accent-dark)]"
                        : "border-[var(--theme-dim)] group-hover:border-[var(--theme-accent-dark)]"
                    }`}
                  >
                    {completed && <Check size={10} className="text-black" />}
                  </div>
                  <span
                    className={`text-[11px] flex-1 transition-all ${
                      completed ? "text-[var(--theme-muted)] line-through" : "text-[var(--foreground)]"
                    }`}
                  >
                    {quest.title}
                  </span>
                  {!completed && (
                    <div className="flex gap-2">
                      <span className="text-[9px] text-[var(--theme-accent-dark)] font-bold">
                        +{quest.xp} XP
                      </span>
                      {quest.gems && (
                        <span className="text-[9px] text-emerald-400 font-bold">
                          +{quest.gems} 💎
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Longest Streak */}
        {longestStreak > 0 && (
          <motion.div
            variants={item}
            className="text-center p-3 rounded-xl card-dark border-[var(--theme-border)] mt-4"
          >
            <div className="text-[11px] tracking-[3px] text-[var(--theme-muted)] uppercase">
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
