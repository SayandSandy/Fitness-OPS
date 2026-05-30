"use client";

import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { TRACKING_DATA } from "@/lib/data/schedule";
import { WEEK_SCHEDULE } from "@/lib/data/workouts";
import { WEEK_NARRATIVES } from "@/lib/data/narrative";
import { getCurrentWeek } from "@/lib/utils/dates";
import { motion } from "framer-motion";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function SchedulePage() {
  const currentWeek = getCurrentWeek();

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">10-WEEK SCHEDULE</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">May 31 – August 6 · 6 training days + 1 active rest</p>
        </motion.div>

        {/* Weekly Split */}
        <motion.div variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border border-[var(--cyber-accent)]/20">
          <div className="text-[10px] text-[var(--cyber-accent)] tracking-[3px] mb-3 uppercase">WEEKLY SPLIT</div>
          {WEEK_SCHEDULE.map((d, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < 6 ? "1px solid var(--cyber-border)" : "none" }}>
              <div className="px-2 py-1 rounded-md text-[11px] font-bold text-center min-w-[40px]" style={{ backgroundColor: d.color + "20", color: d.color }}>{d.day}</div>
              <div className="text-[12px] text-[var(--foreground)] flex-1">{d.label}</div>
              <div className="text-[9px] text-[var(--muted-foreground)] uppercase tracking-wider">{d.type}</div>
            </div>
          ))}
        </motion.div>

        {/* Progression Phases */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-gold)] tracking-wider mb-2">10-WEEK PROGRESSION PHASES</div>
        </motion.div>

        {TRACKING_DATA.progression.map((p, i) => (
          <motion.div key={i} variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border border-[var(--cyber-border)]">
            <div className="flex items-center justify-between mb-2">
              <div className="font-display text-base tracking-wider" style={{ color: i + 1 <= currentWeek ? "var(--cyber-accent)" : "var(--muted-foreground)" }}>
                {p.phase}: {p.focus.toUpperCase()}
              </div>
              {i + 1 <= Math.ceil(currentWeek / 2) && (
                <span className="text-[8px] px-2 py-0.5 rounded bg-[var(--cyber-accent)]/20 text-[var(--cyber-accent)]">ACTIVE</span>
              )}
            </div>
            <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
            <div className="h-1 bg-[var(--cyber-dim)] rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-[var(--cyber-accent)] rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (currentWeek / 2 / (i + 1)) * 100)}%` }} />
            </div>
          </motion.div>
        ))}

        {/* Week Narratives */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-accent)] tracking-wider mb-2">MISSION BRIEFINGS</div>
        </motion.div>

        {WEEK_NARRATIVES.map((n) => (
          <motion.div key={n.week} variants={item} className="rounded-xl p-3 border-l-[3px] bg-[var(--cyber-card)]" style={{ borderColor: n.week <= currentWeek ? "var(--cyber-accent)" : "var(--cyber-dim)", opacity: n.week <= currentWeek ? 1 : 0.4 }}>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold tracking-wider" style={{ color: n.week <= currentWeek ? "var(--cyber-accent)" : "var(--muted-foreground)" }}>WEEK {n.week}</span>
              <span className="font-display text-sm" style={{ color: n.week === currentWeek ? "var(--cyber-accent)" : "var(--foreground)" }}>{n.title}</span>
            </div>
            <p className="text-[10px] text-[var(--muted-foreground)] mt-1">{n.text}</p>
          </motion.div>
        ))}
      </motion.div>
      <BottomNav />
    </div>
  );
}
