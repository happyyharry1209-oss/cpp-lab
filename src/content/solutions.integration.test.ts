import { describe, expect, it } from "vitest";
import { gradeExercise } from "@/lib/grader";
import { exercises } from "./exercises";

const describeIntegration =
  process.env.RUN_JUDGE0_INTEGRATION === "1" ? describe : describe.skip;

describeIntegration("all published exercise solutions", () => {
  it(
    "pass every configured test case through Judge0",
    async () => {
      const results = [];

      for (const exercise of exercises) {
        const result = await gradeExercise({
          exercise,
          sourceCode: exercise.solution,
        });
        results.push({
          slug: exercise.slug,
          status: result.status,
          passed: result.passed,
          total: result.total,
          message: result.message,
        });
      }

      expect(results).toEqual(
        exercises.map((exercise) => ({
          slug: exercise.slug,
          status: "accepted",
          passed: exercise.tests.length,
          total: exercise.tests.length,
          message: "所有測試通過",
        })),
      );
    },
    180_000,
  );
});
