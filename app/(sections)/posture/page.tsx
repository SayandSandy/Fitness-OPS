"use client";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { POSTURE_DATA } from "@/lib/data/posture";
import { motion } from "framer-motion";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function PosturePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">POSTURE CORRECTION</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">Anterior Pelvic Tilt · Rounded Shoulders · Forward Head</p>
        </motion.div>

        {POSTURE_DATA.issues.map((iss, i) => (
          <motion.div key={i} variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border" style={{ borderColor: iss.color + "40" }}>
            <div className="font-display text-xl tracking-wider mb-2" style={{ color: iss.color }}>{i === 0 ? "🍑" : "🧍"} {iss.name.toUpperCase()}</div>
            <p className="text-[11px] text-[var(--muted-foreground)] mb-3 leading-relaxed">{iss.cause}</p>
            {iss.fixes.map((f, j) => (
              <div key={j} className="text-[11px] text-[var(--foreground)] py-1.5 leading-relaxed" style={{ borderBottom: j < iss.fixes.length - 1 ? "1px solid var(--cyber-border)" : "none" }}>→ {f}</div>
            ))}
            <div className="mt-3 rounded-md p-2 text-[10px]" style={{ backgroundColor: iss.color + "12", color: iss.color }}>⏱ Timeline: {iss.timeline}</div>
          </motion.div>
        ))}

        <motion.div variants={item}>
          <div className="font-display text-xl text-[var(--cyber-accent)] tracking-wider mb-1">⏱️ DAILY 10-MIN POSTURE ROUTINE</div>
          <p className="text-[10px] text-[var(--muted-foreground)] mb-3">Every morning — takes 10 min, changes everything in 4–6 weeks</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border border-[var(--cyber-accent)]/30">
          {POSTURE_DATA.dailyRoutine.map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 5 ? "1px solid var(--cyber-border)" : "none" }}>
              <div>
                <div className="text-[12px] font-bold text-[var(--foreground)]">{r.move}</div>
                <div className="text-[10px] text-[var(--muted-foreground)]">{r.why}</div>
              </div>
              <div className="px-2 py-1 rounded bg-[var(--cyber-dim)] text-[10px] text-[var(--cyber-accent)] whitespace-nowrap">{r.time}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-blue)] tracking-wider mb-2">ALL-DAY POSTURE HABITS</div>
        </motion.div>
        {POSTURE_DATA.habits.map((h, i) => (
          <motion.div key={i} variants={item} className="rounded-lg p-3 bg-[var(--cyber-card)] border-l-2 text-[12px] text-[var(--muted-foreground)] leading-relaxed" style={{ borderColor: "var(--cyber-blue)" }}>→ {h}</motion.div>
        ))}
      </motion.div>
      <BottomNav />
    </div>
  );
}
