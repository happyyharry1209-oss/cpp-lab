import { describe, expect, it } from "vitest";
import {
  mapJudge0Status,
  normalizeOutput,
  outputsMatch,
} from "./judge";

describe("output comparison", () => {
  it("ignores trailing spaces and a final line ending", () => {
    expect(outputsMatch("Hello, World!\r\n", "Hello, World!")).toBe(true);
    expect(normalizeOutput("42  \n")).toBe("42");
  });

  it("keeps meaningful internal whitespace differences", () => {
    expect(outputsMatch("1  2", "1 2")).toBe(false);
  });
});

describe("Judge0 status mapping", () => {
  it("maps accepted execution", () => {
    expect(mapJudge0Status(3)).toBe("accepted");
  });

  it("maps compile and time-limit failures", () => {
    expect(mapJudge0Status(6)).toBe("compile_error");
    expect(mapJudge0Status(5)).toBe("time_limit");
  });
});
