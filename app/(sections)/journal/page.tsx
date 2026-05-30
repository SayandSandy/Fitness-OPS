"use client";
import { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { formatDate, getDayKey } from "@/lib/utils/dates";
import { useUserStore } from "@/lib/store/useUserStore";
import { XP_AWARDS } from "@/lib/utils/xp";
import { motion } from "framer-motion";
import type { Mood, EnergyLevel, Soreness } from "@/types/tracking";

const MOODS: Mood[] = ["😴", "😐", "😊", "💪", "🔥"];
const ENERGIES: { value: EnergyLevel; label: string; icon: string }[] = [
  { value: "low", label: "Low", icon: "🪫" },
  { value: "medium", label: "Medium", icon: "😐" },
  { value: "high", label: "High", icon: "⚡" },
];
const SORENESS_OPTS: { value: Soreness; label: string }[] = [
  { value: "none", label: "None" },
  { value: "mild", label: "Mild" },
  { value: "high", label: "High" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function JournalPage() {
  const today = formatDate();
  const isSunday = getDayKey() === "SUN";

  const entry = useJournalStore((s) => s.getEntry(today));
  const setMood = useJournalStore((s) => s.setMood);
  const setEnergy = useJournalStore((s) => s.setEnergy);
  const setSoreness = useJournalStore((s) => s.setSoreness);
  const setSleepQuality = useJournalStore((s) => s.setSleepQuality);
  const setNotes = useJournalStore((s) => s.setNotes);
  const setWeeklyReflection = useJournalStore((s) => s.setWeeklyReflection);
  const recoveryScore = useJournalStore((s) => s.getRecoveryScore(today));
  const addXP = useUserStore((s) => s.addXP);

  const [noteSaved, setNoteSaved] = useState(false);

  const recoveryColor =
    recoveryScore >= 80 ? "var(--theme-orange)" : recoveryScore >= 60 ? "var(--theme-accent-dark)" : "var(--theme-red)";
  const recoveryText =
    recoveryScore >= 80 ? "Push hard" : recoveryScore >= 60 ? "Moderate effort" : "Take it easy";

  const handleNoteSave = (notes: string) => {
    setNotes(today, notes);
    if (!noteSaved) {
      addXP(XP_AWARDS.journal_entry);
      setNoteSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">DAILY JOURNAL</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">{new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</p>
        </motion.div>

        {/* Recovery Score Ring */}
        <motion.div variants={item} className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--theme-dim)" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke={recoveryColor} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(recoveryScore / 100) * 327} ${327 - (recoveryScore / 100) * 327}`}
                style={{ transition: "all 0.8s ease-out" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl" style={{ color: recoveryColor }}>{recoveryScore}</span>
              <span className="text-[8px] text-[var(--muted-foreground)] tracking-wider uppercase">RECOVERY</span>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item} className="text-center text-[11px] font-bold tracking-wider uppercase" style={{ color: recoveryColor }}>
          {recoveryText}
        </motion.div>

        {/* Mood */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark">
          <div className="text-[9px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3">HOW DO YOU FEEL?</div>
          <div className="flex justify-around">
            {MOODS.map((m) => (
              <button key={m} onClick={() => setMood(today, m)}
                className="text-2xl p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: entry?.mood === m ? "var(--theme-orange)" + "20" : "transparent",
                  border: entry?.mood === m ? "1px solid var(--theme-orange)" : "1px solid transparent",
                  transform: entry?.mood === m ? "scale(1.15)" : "scale(1)",
                }}>
                {m}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Energy */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark">
          <div className="text-[9px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3">ENERGY LEVEL</div>
          <div className="grid grid-cols-3 gap-2">
            {ENERGIES.map((e) => (
              <button key={e.value} onClick={() => setEnergy(today, e.value)}
                className="py-2.5 rounded-lg text-[11px] font-bold transition-all border"
                style={{
                  backgroundColor: entry?.energy === e.value ? "var(--theme-orange)" + "15" : "var(--theme-dim)",
                  borderColor: entry?.energy === e.value ? "var(--theme-orange)" + "60" : "transparent",
                  color: entry?.energy === e.value ? "var(--theme-orange)" : "var(--muted-foreground)",
                }}>
                {e.icon} {e.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Soreness */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark">
          <div className="text-[9px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3">MUSCLE SORENESS</div>
          <div className="grid grid-cols-3 gap-2">
            {SORENESS_OPTS.map((s) => (
              <button key={s.value} onClick={() => setSoreness(today, s.value)}
                className="py-2.5 rounded-lg text-[11px] font-bold transition-all border"
                style={{
                  backgroundColor: entry?.soreness === s.value ? "var(--theme-orange)" + "15" : "var(--theme-dim)",
                  borderColor: entry?.soreness === s.value ? "var(--theme-orange)" + "60" : "transparent",
                  color: entry?.soreness === s.value ? "var(--theme-orange)" : "var(--muted-foreground)",
                }}>
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sleep Quality */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark">
          <div className="text-[9px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3">SLEEP QUALITY</div>
          <div className="flex justify-around">
            {[1, 2, 3, 4, 5].map((q) => (
              <button key={q} onClick={() => setSleepQuality(today, q)}
                className="text-xl p-1 transition-all"
                style={{ opacity: q <= (entry?.sleepQuality || 0) ? 1 : 0.3 }}>
                ⭐
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div variants={item} className="rounded-xl p-4 card-dark">
          <div className="text-[9px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3">DAILY NOTES</div>
          <textarea
            className="w-full bg-[var(--theme-dim)] rounded-lg p-3 text-[12px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] border-none outline-none resize-none min-h-[80px]"
            placeholder="How was today? Energy, workout feel, observations..."
            defaultValue={entry?.notes || ""}
            onBlur={(e) => handleNoteSave(e.target.value)}
          />
          {noteSaved && <div className="text-[9px] text-[var(--theme-orange)] mt-1">✓ Saved (+{XP_AWARDS.journal_entry} XP)</div>}
        </motion.div>

        {/* Sunday Weekly Reflection */}
        {isSunday && (
          <motion.div variants={item} className="rounded-xl p-4 card-dark border-[var(--theme-accent-dark)]/30">
            <div className="text-[9px] tracking-[3px] text-[var(--theme-accent-dark)] uppercase mb-3">📝 WEEKLY REFLECTION</div>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-[var(--muted-foreground)] mb-1">What was your strongest session?</div>
                <textarea className="w-full bg-[var(--theme-dim)] rounded-lg p-2 text-[12px] text-[var(--foreground)] border-none outline-none resize-none min-h-[50px]"
                  defaultValue={entry?.weeklyReflection?.strongestSession || ""}
                  onBlur={(e) => setWeeklyReflection(today, "strongestSession", e.target.value)} />
              </div>
              <div>
                <div className="text-[10px] text-[var(--muted-foreground)] mb-1">What to improve next week?</div>
                <textarea className="w-full bg-[var(--theme-dim)] rounded-lg p-2 text-[12px] text-[var(--foreground)] border-none outline-none resize-none min-h-[50px]"
                  defaultValue={entry?.weeklyReflection?.improvement || ""}
                  onBlur={(e) => setWeeklyReflection(today, "improvement", e.target.value)} />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      <BottomNav />
    </div>
  );
}
