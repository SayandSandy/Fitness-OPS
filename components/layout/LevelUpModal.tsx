"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { playSound } from "@/lib/utils/sounds";
import { useSettingsStore } from "@/lib/store/useSettingsStore";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  newLevelName: string;
}

export function LevelUpModal({ isOpen, onClose, newLevel, newLevelName }: LevelUpModalProps) {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  useEffect(() => {
    if (isOpen) {
      if (soundEnabled) {
        playSound("level_up");
      }
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, soundEnabled]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-full max-w-sm card-dark border-2 border-[var(--theme-orange)] rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Celebration background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--theme-orange)_0%,transparent_70%)]" />
            </div>

            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-[var(--theme-orange)]/20 border-4 border-[var(--theme-orange)] flex items-center justify-center mb-6 relative"
            >
              <Trophy size={48} className="text-[var(--theme-orange)]" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -right-2 -top-2 bg-[var(--theme-accent-dark)] rounded-full p-1"
              >
                <ArrowUp size={20} className="text-white" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl text-[var(--foreground)] tracking-wider mb-2"
            >
              RANK UP!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-1 mb-8"
            >
              <div className="text-[12px] tracking-[4px] text-[var(--theme-orange)] font-bold uppercase">
                LEVEL {newLevel}
              </div>
              <div className="font-display text-2xl text-[var(--theme-accent-dark)] tracking-wider">
                {newLevelName}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--theme-dim)] border border-[var(--theme-border)]"
            >
              <div className="text-[10px] text-[var(--muted-foreground)] tracking-wider uppercase">REWARD:</div>
              <div className="text-[14px] font-bold text-emerald-400 flex items-center gap-1">
                +1 GEM 💎
              </div>
            </motion.div>

            <button
              onClick={onClose}
              className="mt-6 text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] tracking-wider uppercase transition-colors"
            >
              TAP TO CONTINUE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
