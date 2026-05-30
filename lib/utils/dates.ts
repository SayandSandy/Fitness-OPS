/**
 * Get the current week number of the program (1-10)
 * Program starts May 31, 2025
 */
export function getCurrentWeek(startDate?: string): number {
  const start = startDate
    ? new Date(startDate)
    : new Date("2025-05-31");
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  return Math.max(1, Math.min(week, 10));
}

/**
 * Get the day of the week as a schedule key (MON, TUE, etc.)
 */
export function getDayKey(date?: Date): string {
  const d = date || new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[d.getDay()];
}

/**
 * Format a date as YYYY-MM-DD
 */
export function formatDate(date?: Date): string {
  const d = date || new Date();
  return d.toISOString().split("T")[0];
}

/**
 * Format a date for display (e.g., "May 31, 2025")
 */
export function formatDisplayDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get all dates in a given week (Mon to Sun)
 */
export function getWeekDates(date?: Date): Date[] {
  const d = date || new Date();
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7)); // Monday

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const dd = new Date(monday);
    dd.setDate(monday.getDate() + i);
    dates.push(dd);
  }
  return dates;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(d1: Date | string, d2: Date | string): boolean {
  const a = typeof d1 === "string" ? new Date(d1) : d1;
  const b = typeof d2 === "string" ? new Date(d2) : d2;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  return isSameDay(date, new Date());
}

/**
 * Get the number of days between two dates
 */
export function daysBetween(d1: Date | string, d2: Date | string): number {
  const a = typeof d1 === "string" ? new Date(d1) : d1;
  const b = typeof d2 === "string" ? new Date(d2) : d2;
  const diffMs = Math.abs(b.getTime() - a.getTime());
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
