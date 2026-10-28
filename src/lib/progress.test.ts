import { describe, expect, it } from "vitest";
import { HINT_STAGE_COUNT, getNextHintLevel } from "./progress";

describe("progressive hints", () => {
  it("reveals one hint stage at a time", () => {
    expect(getNextHintLevel(0)).toBe(1);
    expect(getNextHintLevel(2)).toBe(3);
  });

  it("stops at the final hint stage", () => {
    expect(getNextHintLevel(HINT_STAGE_COUNT)).toBe(HINT_STAGE_COUNT);
  });
});
