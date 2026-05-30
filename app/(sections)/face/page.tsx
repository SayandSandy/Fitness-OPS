"use client";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { FACE_DATA } from "@/lib/data/face";
import { motion } from "framer-motion";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function FacePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">FACE FAT & JAWLINE</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">Daily exercises + lifestyle hacks for facial definition</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl p-4 bg-[var(--cyber-card)] border border-[#FF9EF5]/30">
          <div className="text-[10px] text-[#FF9EF5] tracking-[3px] mb-2 uppercase">⚠️ KEY TRUTH</div>
          <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">
            You cannot spot-reduce face fat directly. It burns as overall body fat drops — and it&apos;s often the last to go.
            BUT: cutting sodium + drinking water + shadow boxing = visible face change within 1–2 weeks from de-bloating alone.
          </p>
        </motion.div>

        <motion.div variants={item}>
          <div className="font-display text-lg text-[#FF9EF5] tracking-wider mb-2">DAILY FACE EXERCISE ROUTINE (7 min)</div>
        </motion.div>
        {FACE_DATA.exercises.map((ex, i) => (
          <motion.div key={i} variants={item} className="flex items-start justify-between gap-3 rounded-lg p-3 bg-[var(--cyber-card)] border-l-2 border-[#FF9EF5]/40">
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[var(--foreground)] mb-0.5">{ex.name}</div>
              <div className="text-[10px] text-[var(--muted-foreground)] leading-relaxed">{ex.note}</div>
            </div>
            <div className="px-2 py-1 rounded bg-[var(--cyber-dim)] text-[10px] text-[#FF9EF5] whitespace-nowrap flex-shrink-0">{ex.reps}</div>
          </motion.div>
        ))}

        <motion.div variants={item}>
          <div className="font-display text-lg text-[#FF9EF5] tracking-wider mb-2">LIFESTYLE TIPS</div>
        </motion.div>
        {FACE_DATA.tips.map((t, i) => (
          <motion.div key={i} variants={item} className="flex items-start gap-3 rounded-lg p-3 bg-[var(--cyber-card)]">
            <span className="text-lg flex-shrink-0">{t.icon}</span>
            <span className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">{t.tip}</span>
          </motion.div>
        ))}
      </motion.div>
      <BottomNav />
    </div>
  );
}
