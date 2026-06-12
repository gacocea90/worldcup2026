import type { Match } from '../data/matches';

export const DISPLAY_TZ = 'Europe/Bucharest';

// Fixed UTC offsets for the venue timezones during the tournament (June–July 2026).
// US/Canada are on daylight time; Mexico abolished DST so CST stays UTC-6.
const VENUE_OFFSETS: Record<string, number> = {
  ET: -4,
  CDT: -5,
  CST: -6,
  PT: -7,
};

export function kickoffUtc(match: Match): Date {
  const [y, mo, d] = match.date.split('-').map(Number);
  const m = match.time.match(/^(\d{1,2}):(\d{2}) (\w+)$/);
  if (!m) return new Date(`${match.date}T12:00:00Z`);
  const [, hh, mm, tz] = m;
  return new Date(Date.UTC(y, mo - 1, d, Number(hh) - (VENUE_OFFSETS[tz] ?? 0), Number(mm)));
}

// YYYY-MM-DD in Romania time — used for day grouping and the "today" badge
export function localDateKey(date: Date): string {
  return date.toLocaleDateString('en-CA', { timeZone: DISPLAY_TZ });
}

export function localTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: DISPLAY_TZ });
}

export function todayKey(): string {
  return localDateKey(new Date());
}
