interface RateEntry {
  day: string;
  count: number;
}

const entries = new Map<string, RateEntry>();

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function checkDailyRunLimit(
  key: string,
  limit: number,
  now = new Date(),
) {
  const day = dayKey(now);
  const existing = entries.get(key);
  const entry =
    !existing || existing.day !== day
      ? { day, count: 0 }
      : existing;

  if (entry.count >= limit) {
    entries.set(key, entry);
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  entries.set(key, entry);

  return {
    allowed: true,
    remaining: Math.max(0, limit - entry.count),
  };
}

export function resetRunLimitForTests() {
  entries.clear();
}
