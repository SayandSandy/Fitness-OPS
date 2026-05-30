"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/lib/store/useUserStore";
import { getLevelProgress, getXPToNextLevel } from "@/lib/utils/xp";

const MENU_ITEMS = [
  { href: "/schedule",  icon: "📅", label: "Schedule",  desc: "10-week overview" },
  { href: "/arms",      icon: "🦾", label: "Arms",      desc: "Arm development program" },
  { href: "/posture",   icon: "🧍", label: "Posture",   desc: "APT & shoulder fix" },
  { href: "/mobility",  icon: "🧘", label: "Mobility",  desc: "Stretch routines" },
  { href: "/face",      icon: "😮", label: "Face",      desc: "Face fat reduction" },
  { href: "/diet",      icon: "🥗", label: "Diet",      desc: "Meal plan & macros" },
  { href: "/routine",   icon: "⏰", label: "Routine",   desc: "Daily schedule" },
];

interface SideDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SideDrawer({ open, onOpenChange }: SideDrawerProps) {
  const { level, levelName, xp, gems } = useUserStore();
  const progress = getLevelProgress(xp);
  const xpToNext = getXPToNextLevel(xp);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[300px] bg-[#0A0E14] border-l border-[var(--cyber-border)] p-0"
      >
        <SheetHeader className="p-5 pb-3">
          <SheetTitle className="font-display text-xl tracking-wider text-[var(--foreground)]">
            COMMAND CENTER
          </SheetTitle>
        </SheetHeader>

        {/* User Stats Card */}
        <div className="mx-4 mb-4 p-4 rounded-xl bg-[var(--cyber-card)] border border-[var(--cyber-border)]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[8px] tracking-[3px] text-[var(--muted-foreground)] uppercase">
                OPERATIVE STATUS
              </div>
              <div className="font-display text-lg text-[var(--cyber-accent)] leading-tight">
                LVL {level} — {levelName}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <span>💎</span>
                <span className="font-bold text-[var(--cyber-blue)]">{gems}</span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-[var(--muted-foreground)]">
              <span>{xp} XP</span>
              <span>{xpToNext} XP to next</span>
            </div>
            <div className="h-1.5 bg-[var(--cyber-dim)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--cyber-accent)] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-[var(--cyber-border)]" />

        {/* Menu Items */}
        <div className="py-2">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--cyber-card)] transition-colors duration-150"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="text-sm font-bold text-[var(--foreground)]">
                  {item.label}
                </div>
                <div className="text-[10px] text-[var(--muted-foreground)]">
                  {item.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Separator className="bg-[var(--cyber-border)]" />

        {/* Footer */}
        <div className="p-4 text-center">
          <div className="text-[8px] tracking-[4px] text-[var(--muted-foreground)] uppercase">
            MAY 31 – AUG 6 · 10 WEEKS
          </div>
          <div className="text-[8px] tracking-[2px] text-[var(--cyber-dim)] uppercase mt-1">
            75KG → 68KG · BENGALURU
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
