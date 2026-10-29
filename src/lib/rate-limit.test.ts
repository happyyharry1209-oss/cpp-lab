import { afterEach, describe, expect, it, vi } from "vitest";
import { checkDailyRunLimit, resetRunLimitForTests } from "./rate-limit";

afterEach(() => resetRunLimitForTests());

describe("daily execution guard", () => {
  it("blocks requests after the configured daily allowance", async () => {
    const now = new Date("2026-10-28T10:00:00Z");

    expect(await checkDailyRunLimit("visitor", 2, now)).toMatchObject({
      allowed: true,
      remaining: 1,
    });
    expect(await checkDailyRunLimit("visitor", 2, now)).toMatchObject({
      allowed: true,
      remaining: 0,
    });
    expect(await checkDailyRunLimit("visitor", 2, now)).toMatchObject({
      allowed: false,
      remaining: 0,
    });
  });

  it("starts a fresh allowance the next day", async () => {
    const firstDay = new Date("2026-10-28T10:00:00Z");
    const nextDay = new Date("2026-10-29T10:00:00Z");
    await checkDailyRunLimit("visitor", 1, firstDay);

    expect((await checkDailyRunLimit("visitor", 1, nextDay)).allowed).toBe(
      true,
    );
  });

  it("prefers the shared persistent reservation when available", async () => {
    const reserve = vi.fn().mockResolvedValue({
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 120,
    });

    const result = await checkDailyRunLimit(
      "visitor",
      3,
      new Date("2026-10-28T10:00:00Z"),
      reserve,
    );

    expect(reserve).toHaveBeenCalledWith("visitor", 3);
    expect(result).toEqual({
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 120,
    });
  });
});
