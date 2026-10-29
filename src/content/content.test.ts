import { describe, expect, it } from "vitest";
import { lessons } from "./lessons";
import { exercises } from "./exercises";

describe("C++ Lab content catalogue", () => {
  it("ships both learning stages", () => {
    expect(lessons).toHaveLength(14);
    expect(lessons[0].slug).toBe("input-output-types");
    expect(lessons.at(-1)?.slug).toBe("binary-search-stl");
    expect(lessons.filter((lesson) => lesson.stage === 2)).toHaveLength(6);
  });

  it("ships twenty complete exercises", () => {
    expect(exercises).toHaveLength(20);
    expect(exercises.filter((exercise) => exercise.stage === 2)).toHaveLength(
      8,
    );
  });

  it("keeps every exercise complete enough for progressive learning", () => {
    for (const exercise of exercises) {
      expect(exercise.hints).toHaveLength(5);
      expect(exercise.samples.length).toBeGreaterThanOrEqual(2);
      expect(exercise.tests.length).toBeGreaterThanOrEqual(2);
      expect(exercise.solution.length).toBeGreaterThan(20);
      expect(
        lessons.some((lesson) => lesson.slug === exercise.lessonSlug),
      ).toBe(true);
    }
  });

  it("recommends an existing exercise after every lesson", () => {
    for (const lesson of lessons) {
      expect(
        exercises.some(
          (exercise) => exercise.slug === lesson.recommendedExerciseSlug,
        ),
      ).toBe(true);
    }
  });
});
