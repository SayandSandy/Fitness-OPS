"use client";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ARM_PROGRAM } from "@/lib/data/arms";
import { COLORS } from "@/lib/data/workouts";
import { motion } from "framer-motion";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function ArmsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">ARM DEVELOPMENT</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">4× per week · Biceps, Triceps, Brachialis, Forearms</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border border-[var(--cyber-gold)]/30">
          <div className="text-[10px] text-[var(--cyber-gold)] tracking-[3px] mb-2 uppercase">TRAINING OVERVIEW</div>
          <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">{ARM_PROGRAM.overview}</p>
        </motion.div>

        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-gold)] tracking-wider mb-2">WEEKLY ARM FREQUENCY</div>
        </motion.div>
        {ARM_PROGRAM.frequency.map((f, i) => (
          <motion.div key={i} variants={item} className="flex items-start gap-3 rounded-lg p-3 bg-[var(--cyber-card)]">
            <span className="px-2 py-1 rounded text-[10px] font-bold bg-[var(--cyber-gold)]/20 text-[var(--cyber-gold)] flex-shrink-0">{f.day}</span>
            <span className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">{f.focus}</span>
          </motion.div>
        ))}

        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-gold)] tracking-wider mb-2">ARM EXERCISE BREAKDOWN</div>
        </motion.div>
        {ARM_PROGRAM.exercises.map((ex, i) => (
          <motion.div key={i} variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border border-[var(--cyber-border)]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-display text-base text-[var(--cyber-gold)] tracking-wider">{ex.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--cyber-gold)]/20 text-[var(--cyber-gold)]">{ex.sets}</span>
            </div>
            <div className="text-[10px] text-[var(--cyber-accent)] mb-1">TARGET: {ex.muscle}</div>
            <div className="text-[10px] text-[var(--muted-foreground)]">📈 {ex.prog}</div>
          </motion.div>
        ))}

        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-gold)] tracking-wider mb-2">KEY PRINCIPLES</div>
        </motion.div>
        {ARM_PROGRAM.principles.map((p, i) => (
          <motion.div key={i} variants={item} className="rounded-lg p-3 bg-[var(--cyber-card)] border-l-2 border-[var(--cyber-gold)] text-[12px] text-[var(--muted-foreground)] leading-relaxed">
            → {p}
          </motion.div>
        ))}
      </motion.div>
      <BottomNav />
    </div>
  );
}
