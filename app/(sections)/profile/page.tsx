"use client";

import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/lib/store/useUserStore";
import { useStreakStore } from "@/lib/store/useStreakStore";
import { useWorkoutStore } from "@/lib/store/useWorkoutStore";
import { getLevelProgress, getXPToNextLevel } from "@/lib/utils/xp";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { auth } from "@/lib/firebase";
import { Trophy, Flame, Zap, Dumbbell, Calendar, LogOut, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
  const { level, levelName, xp, gems } = useUserStore(
    useShallow((s) => ({ level: s.level, levelName: s.levelName, xp: s.xp, gems: s.gems }))
  );
  const { longestStreak } = useStreakStore(
    useShallow((s) => ({ longestStreak: s.longestStreak }))
  );
  const { completedSessions } = useWorkoutStore(
    useShallow((s) => ({ completedSessions: s.completedSessions }))
  );
  const user = auth.currentUser;

  const progress = getLevelProgress(xp);
  const xpToNext = getXPToNextLevel(xp);
  
  const totalWorkouts = Object.keys(completedSessions || {}).length;
  
  const recentWorkouts = Object.entries(completedSessions || {})
    .sort((a, b) => new Date(b[1].completedAt).getTime() - new Date(a[1].completedAt).getTime())
    .slice(0, 5);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />

      <motion.div 
        className="px-4 py-6 space-y-6 max-w-lg mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* User ID Card */}
        <motion.div variants={item} className="relative overflow-hidden rounded-xl card-dark p-6">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={100} />
          </div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full card-dark border-2 border-[var(--theme-orange)] flex items-center justify-center">
              <span className="font-display text-2xl text-[var(--theme-orange)]">
                {level}
              </span>
            </div>
            <div>
              <div className="font-display text-2xl tracking-wider text-[var(--foreground)] uppercase">
                {user?.displayName || "OPERATIVE"}
              </div>
              <div className="text-xs text-[var(--theme-orange)] tracking-[2px] uppercase flex items-center gap-2 mt-1">
                <span>{levelName}</span>
                <span>•</span>
                <span className="text-[var(--theme-accent-dark)]">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Contact info if available */}
          {(user?.email || user?.phoneNumber) && (
            <div className="mt-6 flex flex-col gap-2 text-xs text-[var(--muted-foreground)]">
              {user.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-widest text-[var(--muted-foreground)] uppercase">Progress to Next Rank</span>
              <span className="text-[10px] text-[var(--theme-orange)]">{xpToNext} XP left</span>
            </div>
            <div className="h-2 bg-[var(--theme-dim)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--theme-orange)] to-[var(--theme-accent-dark)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Lifetime Stats */}
        <motion.div variants={item}>
          <div className="text-[10px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3 px-1">
            Lifetime Statistics
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl card-dark hover:border-[var(--theme-orange)]/30 transition-all">
              <div className="flex items-center gap-2 text-[var(--theme-orange)] mb-2">
                <Dumbbell size={16} />
                <span className="text-[10px] uppercase tracking-wider">Total Workouts</span>
              </div>
              <div className="font-display text-3xl">{totalWorkouts}</div>
            </div>
            <div className="p-4 rounded-xl card-dark hover:border-[#FF6B35]/30 transition-all">
              <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                <Flame size={16} />
                <span className="text-[10px] uppercase tracking-wider">Longest Streak</span>
              </div>
              <div className="font-display text-3xl">{longestStreak}</div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <div className="text-[10px] tracking-[3px] text-[var(--muted-foreground)] uppercase mb-3 px-1">
            Recent Activity
          </div>
          <div className="space-y-3">
            {recentWorkouts.length > 0 ? (
              recentWorkouts.map(([date, data]) => (
                <div key={date} className="flex items-center justify-between p-4 rounded-xl card-dark hover:card-dark transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--theme-dim)] flex items-center justify-center text-[var(--theme-orange)]">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-wide uppercase text-[var(--foreground)]">
                        {data.dayType.replace("-", " ")}
                      </div>
                      <div className="text-[10px] text-[var(--muted-foreground)]">
                        {new Date(data.completedAt).toLocaleDateString()} • {data.durationMinutes} mins
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[var(--theme-accent-dark)]">+{data.xpEarned} XP</div>
                    <div className="text-[10px] text-[var(--muted-foreground)] uppercase">{data.exercises.length} Exercises</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 rounded-xl border border-dashed border-[var(--theme-border)] text-[var(--muted-foreground)]">
                <p className="text-xs uppercase tracking-widest">No activity recorded yet</p>
                <p className="text-[10px] mt-2">Complete a workout to see it here.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div variants={item} className="pt-6">
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-sm"
          >
            <LogOut size={16} />
            Terminate Connection
          </button>
        </motion.div>

      </motion.div>

      <BottomNav />
    </div>
  );
}
