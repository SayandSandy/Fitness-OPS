"use client";

import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/lib/store/useUserStore";
import { useStreakStore } from "@/lib/store/useStreakStore";
import { getLevelProgress } from "@/lib/utils/xp";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function TopHeader() {
  const { level, levelName, xp, gems } = useUserStore(
    useShallow((s) => ({ level: s.level, levelName: s.levelName, xp: s.xp, gems: s.gems }))
  );
  const { currentStreak } = useStreakStore(
    useShallow((s) => ({ currentStreak: s.currentStreak }))
  );
  const progress = getLevelProgress(xp);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-[#121416]/90 backdrop-blur-md border-b border-[var(--theme-border)]">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Title & Back Button */}
        <div className="flex items-center gap-3">
          {pathname !== "/" && (
            <button
              onClick={() => router.back()}
              className="p-1 rounded hover:bg-[var(--theme-dim)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="font-display text-xl leading-none tracking-tight text-[var(--foreground)]">
              FITNESS OPS
            </h1>
            <span className="text-[9px] tracking-widest text-[var(--theme-muted)] uppercase mt-0.5">
              10-WEEK PROTOCOL
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          {currentStreak > 0 && (
            <motion.div
              className="flex items-center gap-1 pulse-fire"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-sm">🔥</span>
              <span className="text-xs font-bold text-[#FF6B35]">
                {currentStreak}
              </span>
            </motion.div>
          )}

          {/* Gems */}
          <div className="flex items-center gap-1">
            <span className="text-sm">💎</span>
            <span className="text-xs font-bold text-[var(--theme-accent)]">
              {gems}
            </span>
          </div>

          {/* Level Badge + XP Bar */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] tracking-widest text-[var(--theme-muted)] uppercase">
                  LVL
                </span>
                <span className="font-display text-base leading-none text-[var(--theme-orange)]">
                  {level}
                </span>
              </div>
              <span className="text-[9px] tracking-wider text-[var(--theme-muted)] uppercase">
                {levelName}
              </span>
            </div>

            {/* XP Ring */}
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="var(--theme-dim)"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="var(--theme-orange)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 88} ${88 - progress * 88}`}
                  initial={{ strokeDasharray: "0 88" }}
                  animate={{
                    strokeDasharray: `${progress * 88} ${88 - progress * 88}`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-[var(--theme-orange)]">
                XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
