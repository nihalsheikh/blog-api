/**
 * Date helpers.
 *
 * The backend sends naive UTC timestamps (`datetime.now(timezone.utc)`
 * serialised by Pydantic, e.g. "2025-01-14T09:30:00.123456"). They carry no
 * timezone designator, so a bare `new Date(str)` would be parsed as local
 * time in some engines and shift the day. Appending "Z" forces UTC, after
 * which everything is formatted in the viewer's local zone.
 */

function toDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  // Already has a designator, or is a date-only string — pass through.
  if (/(Z|[+-]\d{2}:?\d{2})$/.test(value)) return new Date(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T00:00:00Z`);
  return new Date(`${value}Z`);
}

/** "14 Jan 2025" — the options form drops the day for a month/year caption. */
export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  },
): string {
  return toDate(value).toLocaleDateString("en-GB", options);
}

/** "14 Jan" — for dense card metadata. */
export function formatDateShort(value: string | Date): string {
  return toDate(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

/** "2 hours ago" */
export function timeAgo(value: string | Date): string {
  const date = toDate(value);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";

  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "minute"],
    [3600, "hour"],
    [86400, "day"],
    [604800, "week"],
    [2592000, "month"],
    [31536000, "year"],
  ];

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  let divisor = 1;
  let unit: Intl.RelativeTimeFormatUnit = "second";
  for (let i = 0; i < units.length; i += 1) {
    if (seconds < units[i][0]) break;
    divisor = units[i][0];
    unit = units[i][1];
  }

  return formatter.format(-Math.floor(seconds / divisor), unit);
}

/** Word count, used for the reading-time estimate. */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** "3 min read" — 200 words per minute, rounded up, floored at 1. */
export function readingTime(text: string): string {
  const minutes = Math.max(1, Math.ceil(countWords(text) / 200));
  return `${minutes} min read`;
}

/** A plain-text excerpt, trimmed on a word boundary. */
export function excerpt(text: string, maxLength = 180): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

/** Initials for the avatar tile — "Ada Lovelace" → "AL". */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
