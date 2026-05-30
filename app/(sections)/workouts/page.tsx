"use client";

import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WEEK_SCHEDULE, WORKOUTS } from "@/lib/data/workouts";
import { WORKOUT_FLAVORS } from "@/lib/data/narrative";
import { getDayKey } from "@/lib/utils/dates";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function WorkoutsPage() {
  const todayKey = getDayKey();

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopHeader />

      <div className="px-4 py-4">
        <div className="font-display text-2xl tracking-wider text-[var(--foreground)] mb-1">
          WORKOUT PLANS
        </div>
        <div className="text-[11px] text-[var(--muted-foreground)] mb-4">
          Tap a day to see the full session
        </div>

        <motion.div
          className="space-y-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {WEEK_SCHEDULE.map((day) => {
            const workout = WORKOUTS[day.type];
            const isToday = day.day === todayKey;
            const flavor = WORKOUT_FLAVORS.find((f) => f.type === day.type);

            return (
              <motion.div key={day.day} variants={item}>
                <Link href={`/workouts/${day.type}`}>
                  <div
                    className={`relative overflow-hidden rounded-xl p-4 border transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                      isToday ? "glow-accent" : ""
                    }`}
                    style={{
                      borderColor: isToday
                        ? day.color + "80"
                        : day.color + "30",
                      background: `linear-gradient(135deg, var(--cyber-card) 0%, ${day.color}08 100%)`,
                    }}
                  >
                    {isToday && (
                      <div
                        className="absolute top-2 right-3 text-[8px] tracking-[3px] font-bold uppercase px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: day.color + "20",
                          color: day.color,
                        }}
                      >
                        TODAY
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {/* Day badge */}
                      <div
                        className="w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: day.color + "15",
                          border: `1px solid ${day.color}40`,
                        }}
                      >
                        <span
                          className="font-display text-sm leading-none"
                          style={{ color: day.color }}
                        >
                          {day.day}
                        </span>
                        <span
                          className="text-[7px] mt-0.5 uppercase"
                          style={{ color: day.color + "90" }}
                        >
                          {day.type === "rest" ? "REST" : "TRAIN"}
                        </span>
                      </div>

                      {/* Workout info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-base tracking-wider text-[var(--foreground)]">
                          {workout.title}
                        </div>
                        <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                          {workout.subtitle}
                        </div>
                        {flavor && (
                          <div
                            className="text-[9px] mt-1 italic truncate"
                            style={{ color: day.color + "80" }}
                          >
                            {flavor.text}
                          </div>
                        )}
                      </div>

                      {/* Arrow + exercise count */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center border"
                          style={{
                            borderColor: day.color + "40",
                            color: day.color,
                          }}
                        >
                          <ChevronRight size={16} />
                        </div>
                        <span
                          className="text-[8px] font-bold"
                          style={{ color: day.color }}
                        >
                          {workout.exercises.length}
                        </span>
                      </div>
                    </div>

                    {/* Border accent line at left */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                      style={{ backgroundColor: day.color }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
