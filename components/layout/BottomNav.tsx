"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, BarChart3, BookOpen, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SideDrawer } from "./SideDrawer";

const NAV_ITEMS = [
  { href: "/",           icon: Home,       label: "Home" },
  { href: "/workouts",   icon: Dumbbell,   label: "Train" },
  { href: "/tracking",   icon: BarChart3,  label: "Track" },
  { href: "/journal",    icon: BookOpen,   label: "Journal" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#121416]/90 backdrop-blur-md border-t border-[var(--theme-border)] pb-safe">
        <div className="flex items-stretch justify-around max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center py-2 px-4 flex-1 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[var(--theme-orange)] rounded-b-md shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "text-[var(--theme-orange)] scale-110 drop-shadow-md"
                      : "text-[var(--theme-muted)] group-hover:text-[var(--foreground)] group-hover:scale-105"
                  }`}
                />
                <span
                  className={`text-[9px] mt-1 tracking-widest uppercase transition-all duration-300 font-bold ${
                    isActive
                      ? "text-[var(--theme-orange)]"
                      : "text-[var(--theme-muted)] group-hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center py-2 px-4 flex-1 group"
          >
            <Menu
              size={20}
              className="text-[var(--theme-muted)] group-hover:text-[var(--foreground)] group-hover:scale-105 transition-all duration-300"
            />
            <span className="text-[9px] mt-1 tracking-widest font-bold uppercase text-[var(--theme-muted)] group-hover:text-[var(--foreground)] transition-all duration-300">
              More
            </span>
          </button>
        </div>
      </nav>

      <SideDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
