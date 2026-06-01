"use client";

import { useShallow } from "zustand/react/shallow";

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
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const MENU_ITEMS = [
  { href: "/profile",   icon: "👤", label: "Profile",   desc: "Stats & Armory" },
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
  const { level, levelName, xp, gems } = useUserStore(
    useShallow((s) => ({ level: s.level, levelName: s.levelName, xp: s.xp, gems: s.gems }))
  );
  const progress = getLevelProgress(xp);
  const xpToNext = getXPToNextLevel(xp);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[300px] bg-[#121416] border-l border-[var(--theme-border)] p-0"
      >
        <SheetHeader className="p-5 pb-3">
          <SheetTitle className="font-display text-xl tracking-tight text-[var(--foreground)]">
            COMMAND CENTER
          </SheetTitle>
        </SheetHeader>

        {/* User Stats Card */}
        <Link href="/profile" onClick={() => onOpenChange(false)} className="block mx-4 mb-4">
          <div className="p-4 rounded-xl card-dark hover:border-[var(--theme-orange)]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] tracking-widest text-[var(--theme-muted)] uppercase">
                  OPERATIVE STATUS
                </div>
                <div className="font-display text-lg text-[var(--theme-orange)] leading-tight">
                  LVL {level} — {levelName}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <span>💎</span>
                  <span className="font-bold text-[var(--theme-accent)]">{gems}</span>
                </div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-[var(--theme-muted)]">
                <span>{xp} XP</span>
                <span>{xpToNext} XP to next</span>
              </div>
              <div className="h-1.5 bg-[var(--theme-dim)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--theme-orange)] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Link>

        <Separator className="bg-[var(--theme-border)]" />

        {/* Menu Items */}
        <div className="py-2">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 px-5 py-3 hover:card-dark transition-colors duration-150"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="text-sm font-bold text-[var(--foreground)]">
                  {item.label}
                </div>
                <div className="text-[10px] text-[var(--theme-muted)]">
                  {item.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Separator className="bg-[var(--theme-border)]" />

        {/* Logout */}
        <div className="px-5 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors text-xs font-bold tracking-widest uppercase"
          >
            <LogOut size={14} />
            DISCONNECT
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <div className="text-[10px] tracking-[4px] text-[var(--theme-muted)] uppercase">
            10-WEEK PROTOCOL
          </div>
          <div className="text-[10px] tracking-[2px] text-[var(--theme-dim)] uppercase mt-1">
            75KG → 68KG · BENGALURU
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
