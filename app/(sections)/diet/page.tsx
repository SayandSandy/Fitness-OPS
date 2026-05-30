"use client";
import { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { DIET_DATA } from "@/lib/data/diet";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function DietPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const total = DIET_DATA.meals.reduce((a, m) => a + m.kcal, 0);
  const totalP = DIET_DATA.meals.reduce((a, m) => a + m.protein, 0);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <motion.div className="px-4 py-4 space-y-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">DIET & NUTRITION</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">Fat loss + muscle preservation · ~1900 kcal/day</p>
        </motion.div>

        {/* Macro Cards */}
        <motion.div variants={item} className="grid grid-cols-2 gap-2">
          {[
            { l: "CALORIES", v: `~${DIET_DATA.targets.kcal}`, u: "/day", c: "var(--cyber-red)" },
            { l: "PROTEIN", v: `${DIET_DATA.targets.protein}g`, u: "/day", c: "var(--cyber-accent)" },
            { l: "CARBS", v: `${DIET_DATA.targets.carbs}g`, u: "/day", c: "var(--cyber-gold)" },
            { l: "FATS", v: `${DIET_DATA.targets.fat}g`, u: "/day", c: "var(--cyber-purple)" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-3 text-center bg-[var(--cyber-card)] border" style={{ borderColor: s.c + "30" }}>
              <div className="text-[9px] text-[var(--muted-foreground)] tracking-wider">{s.l}</div>
              <div className="font-display text-2xl leading-none" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9px] text-[var(--muted-foreground)]">{s.u}</div>
            </div>
          ))}
        </motion.div>

        {/* Meals */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-accent)] tracking-wider mb-2">MEAL PLAN — TAP TO EXPAND</div>
        </motion.div>
        {DIET_DATA.meals.map((m, i) => (
          <motion.div key={i} variants={item}
            className="rounded-xl overflow-hidden bg-[var(--cyber-card)] border transition-colors cursor-pointer"
            style={{ borderColor: expanded === i ? "var(--cyber-accent)" + "60" : "var(--cyber-border)" }}
            onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="p-3 flex items-center gap-3">
              <span className="text-xl flex-shrink-0">{m.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[var(--foreground)]">{m.label}</span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">{m.time}</span>
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--cyber-red)]/20 text-[var(--cyber-red)]">{m.kcal} kcal</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--cyber-accent)]/20 text-[var(--cyber-accent)]">{m.protein}g protein</span>
                </div>
              </div>
              {expanded === i ? <ChevronUp size={14} className="text-[var(--muted-foreground)]" /> : <ChevronDown size={14} className="text-[var(--muted-foreground)]" />}
            </div>
            <AnimatePresence>
              {expanded === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-3 pb-3">
                    <div className="rounded-lg p-3 bg-[var(--cyber-dim)]">
                      {m.items.map((it, j) => (
                        <div key={j} className="text-[12px] text-[var(--foreground)] py-1" style={{ borderBottom: j < m.items.length - 1 ? "1px solid var(--cyber-border)" : "none" }}>→ {it}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Totals */}
        <motion.div variants={item} className="rounded-xl p-3 bg-[var(--cyber-card)] border border-[var(--cyber-accent)]/20">
          <div className="flex gap-4 text-[11px]">
            <span><span className="text-[var(--cyber-red)]">Total: </span>{total} kcal</span>
            <span><span className="text-[var(--cyber-accent)]">Protein: </span>{totalP}g</span>
            <span><span className="text-[var(--cyber-gold)]">Deficit: </span>~300 kcal</span>
          </div>
        </motion.div>

        {/* Avoid */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-red)] tracking-wider mb-2">🚫 NEVER EAT</div>
        </motion.div>
        <motion.div variants={item} className="rounded-xl p-3 bg-[var(--cyber-card)] border border-[var(--cyber-red)]/20">
          {DIET_DATA.avoid.map((a, i) => (
            <div key={i} className="text-[12px] text-[var(--muted-foreground)] py-1.5" style={{ borderBottom: i < DIET_DATA.avoid.length - 1 ? "1px solid var(--cyber-border)" : "none" }}>✗ {a}</div>
          ))}
        </motion.div>

        {/* Rules */}
        <motion.div variants={item}>
          <div className="font-display text-lg text-[var(--cyber-gold)] tracking-wider mb-2">NUTRITION RULES</div>
        </motion.div>
        {DIET_DATA.rules.map((r, i) => (
          <motion.div key={i} variants={item} className="rounded-lg p-3 bg-[var(--cyber-card)] border-l-2 text-[12px] text-[var(--muted-foreground)] leading-relaxed" style={{ borderColor: "var(--cyber-gold)" }}>✓ {r}</motion.div>
        ))}
      </motion.div>
      <BottomNav />
    </div>
  );
}
