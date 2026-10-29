import { createHmac } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

interface RateEntry {
  day: string;
  count: number;
}

const entries = new Map<string, RateEntry>();
let rateLimitClient: SupabaseClient | null | undefined;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

export type RateLimitReserve = (
  key: string,
  limit: number,
) => Promise<RateLimitResult | null>;

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getRateLimitClient() {
  if (rateLimitClient !== undefined) {
    return rateLimitClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  rateLimitClient =
    url && key
      ? createClient(url, key, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        })
      : null;

  return rateLimitClient;
}

const reservePersistent: RateLimitReserve = async (key, limit) => {
  const client = getRateLimitClient();
  if (!client) {
    return null;
  }

  const secret =
    process.env.RATE_LIMIT_SECRET ?? "cpp-lab-development-rate-limit";
  const hashedKey = createHmac("sha256", secret)
    .update(key)
    .digest("hex");
  const { data, error } = await client.rpc("reserve_judge_execution", {
    p_key: hashedKey,
    p_limit: limit,
  });

  if (error) {
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.allowed !== "boolean") {
    return null;
  }

  return {
    allowed: row.allowed,
    remaining: Math.max(0, Number(row.remaining ?? 0)),
    retryAfterSeconds: Math.max(
      1,
      Number(row.retry_after_seconds ?? 86_400),
    ),
  };
};

export async function checkDailyRunLimit(
  key: string,
  limit: number,
  now = new Date(),
  reserve: RateLimitReserve = reservePersistent,
): Promise<RateLimitResult> {
  const persistent = await reserve(key, limit);
  if (persistent) {
    return persistent;
  }

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
  rateLimitClient = undefined;
}
