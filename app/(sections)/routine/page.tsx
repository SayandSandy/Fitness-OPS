"use client";
import { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ROUTINE_TEMPLATE, CAT_STYLES } from "@/lib/data/routine";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function RoutinePage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-3" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">DAILY ROUTINE</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">Template for a training day — 6:30 AM to 10:00 PM</p>
        </motion.div>

        {/* Legend */}
        <motion.div variants={item} className="flex gap-2 flex-wrap">
          {Object.entries(CAT_STYLES).filter(([k]) => k !== "work").map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
              <span className="text-[9px] text-[var(--muted-foreground)]">{v.label}</span>
            </div>
          ))}
        </motion.div>

        {ROUTINE_TEMPLATE.workday.map((r, i) => {
          const cs = CAT_STYLES[r.cat] || CAT_STYLES.habit;
          return (
            <motion.div key={i} variants={item}
              className="rounded-xl p-3 bg-[var(--cyber-card)] border cursor-pointer transition-colors"
              style={{ borderColor: expanded === i ? cs.color + "60" : "var(--cyber-border)" }}
              onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{r.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold transition-colors" style={{ color: expanded === i ? cs.color : "var(--foreground)" }}>{r.label}</span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">{r.time}</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ backgroundColor: cs.color + "20", color: cs.color }}>{cs.label}</span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">{r.dur}</span>
                  </div>
                </div>
                {expanded === i ? <ChevronUp size={12} className="text-[var(--muted-foreground)]" /> : <ChevronDown size={12} className="text-[var(--muted-foreground)]" />}
              </div>
              <AnimatePresence>
                {expanded === i && r.note && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-2 pt-2 text-[12px] text-[var(--muted-foreground)] leading-relaxed" style={{ borderTop: "1px solid var(--cyber-border)" }}>{r.note}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
      <BottomNav />
    </div>
  );
}
