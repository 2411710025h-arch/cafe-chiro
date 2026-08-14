/**
 * Reservation availability logic.
 * Opening hours 11:00–18:00, closed Wednesdays. Slots every 30 minutes.
 * A duration is only selectable if it finishes by closing time.
 */

export const OPEN_MINUTES = 11 * 60; // 11:00
export const CLOSE_MINUTES = 18 * 60; // 18:00
export const SLOT_STEP = 30;
export const DURATIONS = [60, 90, 120] as const;
export type Duration = (typeof DURATIONS)[number];

export const WEDNESDAY = 3;

export function minutesToTime(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** All candidate start times (before applying duration limits). */
export function generateStartTimes(): string[] {
  const times: string[] = [];
  const shortest = DURATIONS[0];
  for (let m = OPEN_MINUTES; m + shortest <= CLOSE_MINUTES; m += SLOT_STEP) {
    times.push(minutesToTime(m));
  }
  return times;
}

/** Durations that still fit before closing for a given start time. */
export function availableDurations(startTime: string): Duration[] {
  const start = timeToMinutes(startTime);
  return DURATIONS.filter((d) => start + d <= CLOSE_MINUTES);
}

export function durationFits(startTime: string, duration: number): boolean {
  return timeToMinutes(startTime) + duration <= CLOSE_MINUTES;
}

/** YYYY-MM-DD from local date parts (timezone-safe for a demo). */
export function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateString(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function isClosedDate(dateStr: string): boolean {
  return parseDateString(dateStr).getDay() === WEDNESDAY;
}

export interface DayOption {
  date: string; // YYYY-MM-DD
  weekday: number; // 0..6
  closed: boolean;
  isToday: boolean;
}

/** Build the next `count` days starting today, for the date picker. */
export function buildDayOptions(count = 45, from: Date = new Date()): DayOption[] {
  const base = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const todayStr = toDateString(base);
  const days: DayOption[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const date = toDateString(d);
    days.push({
      date,
      weekday: d.getDay(),
      closed: d.getDay() === WEDNESDAY,
      isToday: date === todayStr
    });
  }
  return days;
}

/** Generate a reservation code like CHIRO-260814-A3F2 from the visit date. */
export function generateReservationCode(dateStr: string): string {
  const d = parseDateString(dateStr);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `CHIRO-${yy}${mm}${dd}-${suffix}`;
}
