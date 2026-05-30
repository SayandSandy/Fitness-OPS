"use client";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { TRACKING_DATA } from "@/lib/data/schedule";
import { useStreakStore } from "@/lib/store/useStreakStore";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { formatDate, getWeekDates, isToday } from "@/lib/utils/dates";
import { motion } from "framer-motion";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

// Simple Streak Calendar
function StreakCalendar() {
  const { checkins } = useStreakStore(useShallow((s) => ({ checkins: s.checkins })));
  const weeks: Date[][] = [];
  const today = new Date();

  // Generate 5 weeks back
  for (let w = 4; w >= 0; w--) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() - (w * 7) + 1);
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + d);
      week.push(date);
    }
    weeks.push(week);
  }

  const getColor = (date: Date) => {
    const dateStr = formatDate(date);
    const checkin = checkins.find((c) => c.date === dateStr);
    if (date > today) return "var(--theme-dim)";
    if (!checkin) return "var(--theme-red)" + "33";
    if (checkin.status === "complete") return "var(--theme-orange)";
    if (checkin.status === "rest") return "var(--theme-accent-dark)";
    return "var(--theme-red)" + "33";
  };

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-center text-[8px] text-[var(--muted-foreground)]">{d}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1">
          {week.map((date, di) => (
            <motion.div key={di}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: wi * 0.05 + di * 0.02 }}
              className="aspect-square rounded-md flex items-center justify-center text-[8px]"
              style={{
                backgroundColor: getColor(date),
                border: isToday(date) ? "2px solid var(--foreground)" : "none",
                color: "var(--background)",
                fontWeight: isToday(date) ? 700 : 400,
              }}>
              {date.getDate()}
            </motion.div>
          ))}
        </div>
      ))}
      <div className="flex items-center justify-center gap-4 mt-2">
        {[
          { color: "var(--theme-orange)", label: "Complete" },
          { color: "var(--theme-accent-dark)", label: "Rest" },
          { color: "var(--theme-red)" + "33", label: "Missed" },
        ].map((l, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: l.color }} />
            <span className="text-[8px] text-[var(--muted-foreground)]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Weekly Meter
function WeeklyMeter() {
  const weeklyCount = useStreakStore((s) => s.getWeeklyCount());

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-[var(--muted-foreground)]">This Week</span>
        <span className="text-[10px] font-bold text-[var(--theme-orange)]">{weeklyCount}/6</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full transition-all duration-300"
            style={{ backgroundColor: i < weeklyCount ? "var(--theme-orange)" : "var(--theme-dim)" }} />
        ))}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const { currentStreak, longestStreak } = useStreakStore(
    useShallow((s) => ({ currentStreak: s.currentStreak, longestStreak: s.longestStreak }))
  );
  const today = formatDate();
  const recoveryScore = useJournalStore((s) => s.getRecoveryScore(today));
  const recoveryColor = recoveryScore >= 80 ? "var(--theme-orange)" : recoveryScore >= 60 ? "var(--theme-accent-dark)" : "var(--theme-red)";

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">TRACKING & RECOVERY</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">Measurements · Progress · Sleep · Consistency</p>
        </motion.div>

        {/* Streak + Weekly */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-4 card-dark border border-[var(--theme-border)] text-center">
            <div className="text-[8px] tracking-[3px] text-[var(--muted-foreground)] uppercase">CURRENT STREAK</div>
            <div className="font-display text-3xl text-[#FF6B35] mt-1">🔥 {currentStreak}</div>
            <div className="text-[8px] text-[var(--muted-foreground)] mt-0.5">Best: {longestStreak}</div>
          </div>
          <div className="rounded-xl p-4 card-dark border border-[var(--theme-border)] text-center">
            <div className="text-[8px] tracking-[3px] text-[var(--muted-foreground)] uppercase">RECOVERY</div>
            <div className="font-display text-3xl mt-1" style={{ color: recoveryColor }}>{recoveryScore}</div>
            <div className="text-[8px] text-[var(--muted-foreground)] mt-0.5">/ 100</div>
          </div>
        </motion.div>

        {/* Weekly Meter */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark border border-[var(--theme-border)]">
          <WeeklyMeter />
        </motion.div>

        {/* Streak Calendar */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark border border-[var(--theme-border)]">
          <div className="text-[9px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3">CONSISTENCY CALENDAR</div>
          <StreakCalendar />
        </motion.div>

        {/* Measurements */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--theme-orange)] tracking-wider mb-2">WHAT TO MEASURE</div>
        </motion.div>
        {TRACKING_DATA.measurements.map((m, i) => (
          <motion.div key={i} variants={item} className="rounded-lg p-3 card-dark">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-bold text-[var(--foreground)]">{m.metric}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-[var(--theme-orange)]/20 text-[var(--theme-orange)]">{m.freq}</span>
            </div>
            <div className="text-[10px] text-[var(--muted-foreground)]">{m.method}</div>
          </motion.div>
        ))}

        {/* Sleep */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--theme-accent-dark)] tracking-wider mb-2">SLEEP — THE GROWTH CATALYST</div>
        </motion.div>
        {TRACKING_DATA.sleep.map((s, i) => (
          <motion.div key={i} variants={item} className="rounded-lg p-3 card-dark border-l-2 text-[12px] text-[var(--muted-foreground)] leading-relaxed" style={{ borderColor: "var(--theme-accent-dark)" }}>→ {s}</motion.div>
        ))}

        {/* Expected Results */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark border border-[var(--theme-orange)]/30">
          <div className="font-display text-base text-[var(--theme-orange)] tracking-wider mb-3">10-WEEK EXPECTED RESULTS</div>
          {[
            { metric: "Body Weight", result: "~68–69 kg (-6 to -7 kg fat)" },
            { metric: "Arms (flexed)", result: "+1.5–2.5 cm in circumference" },
            { metric: "Chin-ups", result: "From ~2–3 → 8–12 clean reps" },
            { metric: "Face/Neck", result: "Visibly slimmer, more defined jawline" },
            { metric: "Posture", result: "APT and rounded shoulders largely corrected" },
            { metric: "Energy", result: "Noticeably higher — sleep, diet, and training synergy" },
          ].map((r, i) => (
            <div key={i} className="flex gap-4 py-2" style={{ borderBottom: i < 5 ? "1px solid var(--theme-border)" : "none" }}>
              <span className="text-[10px] text-[var(--theme-orange)] font-bold w-[120px] flex-shrink-0">{r.metric}</span>
              <span className="text-[11px] text-[var(--muted-foreground)]">{r.result}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <BottomNav />
    </div>
  );
}
