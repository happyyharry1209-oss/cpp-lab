import { afterEach, describe, expect, it } from "vitest";
import { checkDailyRunLimit, resetRunLimitForTests } from "./rate-limit";

afterEach(() => resetRunLimitForTests());

describe("daily execution guard", () => {
  it("blocks requests after the configured daily allowance", () => {
    const now = new Date("2026-10-28T10:00:00Z");

    expect(checkDailyRunLimit("visitor", 2, now)).toMatchObject({
      allowed: true,
      remaining: 1,
    });
    expect(checkDailyRunLimit("visitor", 2, now)).toMatchObject({
      allowed: true,
      remaining: 0,
    });
    expect(checkDailyRunLimit("visitor", 2, now)).toMatchObject({
      allowed: false,
      remaining: 0,
    });
  });

  it("starts a fresh allowance the next day", () => {
    const firstDay = new Date("2026-10-28T10:00:00Z");
    const nextDay = new Date("2026-10-29T10:00:00Z");
    checkDailyRunLimit("visitor", 1, firstDay);

    expect(checkDailyRunLimit("visitor", 1, nextDay).allowed).toBe(true);
  });
});
