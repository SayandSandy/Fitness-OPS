"use client";
import { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { MOBILITY_DATA } from "@/lib/data/mobility";
import { motion } from "framer-motion";

const TABS = [
  { key: "morning",     label: "🌅 Morning",      color: "var(--cyber-gold)" },
  { key: "preworkout",  label: "⚡ Pre-Workout",   color: "var(--cyber-red)" },
  { key: "postworkout", label: "🧊 Post-Workout",  color: "var(--cyber-blue)" },
  { key: "evening",     label: "🌙 Evening",       color: "var(--cyber-purple)" },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function MobilityPage() {
  const [tab, setTab] = useState<TabKey>("morning");
  const section = MOBILITY_DATA[tab];
  const tabConfig = TABS.find((t) => t.key === tab)!;

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />
      <div className="px-4 py-4 space-y-4">
        <div>
          <h1 className="font-display text-2xl tracking-wider text-[var(--foreground)]">MOBILITY & STRETCHING</h1>
          <p className="text-[11px] text-[var(--muted-foreground)]">4 distinct routines — when to do each matters</p>
        </div>

        <div className="rounded-xl p-3 bg-[var(--cyber-card)] text-[11px] text-[var(--muted-foreground)] leading-relaxed">
          <span className="text-[var(--cyber-accent)] font-bold">RULE: </span>
          Dynamic mobility BEFORE training. Static stretching AFTER training or in evening. Never static stretch cold muscles.
        </div>

        <div className="grid grid-cols-2 gap-2">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="py-2.5 px-3 rounded-lg text-[10px] font-bold transition-all duration-150 border"
              style={{
                backgroundColor: tab === t.key ? t.color + "15" : "var(--cyber-card)",
                borderColor: tab === t.key ? t.color + "60" : "var(--cyber-border)",
                color: tab === t.key ? t.color : "var(--muted-foreground)",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 bg-[var(--cyber-card)] border" style={{ borderColor: tabConfig.color + "40" }}>
          <div className="font-display text-xl tracking-wider mb-1" style={{ color: tabConfig.color }}>{section.title}</div>
          <div className="text-[10px] text-[var(--muted-foreground)] mb-4">{section.timing}</div>
          {section.moves.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < section.moves.length - 1 ? "1px solid var(--cyber-border)" : "none" }}>
              <div>
                <div className="text-[12px] font-bold text-[var(--foreground)]">{m.name}</div>
                <div className="text-[10px] text-[var(--muted-foreground)]">{m.note}</div>
              </div>
              <div className="px-2 py-1 rounded bg-[var(--cyber-dim)] text-[10px] whitespace-nowrap" style={{ color: tabConfig.color }}>{m.reps}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
