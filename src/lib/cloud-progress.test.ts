import { describe, expect, it } from "vitest";
import { EMPTY_PROGRESS, mergeProgress } from "./progress";

describe("cloud progress merge", () => {
  it("keeps completion from both local and cloud progress", () => {
    const merged = mergeProgress(
      {
        ...EMPTY_PROGRESS,
        completedLessons: ["input-output-types"],
        completedExercises: ["hello-cpp-lab"],
      },
      {
        ...EMPTY_PROGRESS,
        completedLessons: ["conditions-and-edges"],
        completedExercises: ["even-or-odd"],
      },
    );

    expect(merged.completedLessons).toEqual([
      "input-output-types",
      "conditions-and-edges",
    ]);
    expect(merged.completedExercises).toEqual([
      "hello-cpp-lab",
      "even-or-odd",
    ]);
  });

  it("keeps the furthest hint level and prefers a non-empty local draft", () => {
    const merged = mergeProgress(
      {
        ...EMPTY_PROGRESS,
        hintLevels: { "binary-search": 3 },
        drafts: { "binary-search": "// local draft" },
      },
      {
        ...EMPTY_PROGRESS,
        hintLevels: { "binary-search": 2 },
        drafts: { "binary-search": "// cloud draft" },
      },
    );

    expect(merged.hintLevels["binary-search"]).toBe(3);
    expect(merged.drafts["binary-search"]).toBe("// local draft");
  });
});
