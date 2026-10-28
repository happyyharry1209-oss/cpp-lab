import { describe, expect, it } from "vitest";
import { lessons } from "./lessons";
import { exercises } from "./exercises";

describe("C++ Lab content catalogue", () => {
  it("ships the eight-lesson V1 learning path", () => {
    expect(lessons).toHaveLength(8);
    expect(lessons[0].slug).toBe("input-output-types");
    expect(lessons.at(-1)?.slug).toBe("binary-search-debugging");
  });

  it("ships twelve complete exercises", () => {
    expect(exercises).toHaveLength(12);
    for (const exercise of exercises) {
      expect(exercise.hints).toHaveLength(5);
      expect(exercise.samples.length).toBeGreaterThanOrEqual(2);
      expect(exercise.tests.length).toBeGreaterThanOrEqual(2);
      expect(exercise.solution.length).toBeGreaterThan(20);
    }
  });
});
