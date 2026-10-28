import { describe, expect, it } from "vitest";
import type { Exercise } from "@/content/exercises";
import { gradeExercise } from "./grader";

const exercise: Exercise = {
  slug: "sample",
  title: "Sample",
  category: "基礎語法",
  difficulty: 1,
  summary: "Sample",
  description: "Sample",
  inputFormat: "n",
  outputFormat: "n",
  starterCode: "",
  hints: ["1", "2", "3", "4", "5"],
  solution: "int main() { return 0; }",
  samples: [{ input: "1", output: "1" }],
  tests: [
    { input: "1", output: "1" },
    { input: "2", output: "4" },
  ],
  lessonSlug: "input-output-types",
};

describe("exercise grading", () => {
  it("accepts the program when every test output matches", async () => {
    const result = await gradeExercise({
      exercise,
      sourceCode: "int main(){}",
      execute: async ({ stdin }) => ({
        status: "accepted",
        stdout: stdin === "1" ? "1\n" : "4\n",
        stderr: "",
        compileOutput: "",
        durationMs: 10,
        memoryKb: 100,
        passed: 0,
        total: 1,
      }),
    });

    expect(result.status).toBe("accepted");
    expect(result.passed).toBe(2);
    expect(result.total).toBe(2);
    expect(result.durationMs).toBe(20);
  });

  it("reports the first failing test with a useful diff", async () => {
    const result = await gradeExercise({
      exercise,
      sourceCode: "int main(){}",
      execute: async ({ stdin }) => ({
        status: "accepted",
        stdout: stdin === "1" ? "1\n" : "3\n",
        stderr: "",
        compileOutput: "",
        durationMs: 8,
        memoryKb: 100,
        passed: 0,
        total: 1,
      }),
    });

    expect(result.status).toBe("wrong_answer");
    expect(result.passed).toBe(1);
    expect(result.failedCase).toMatchObject({
      index: 1,
      input: "2",
      expected: "4",
      actual: "3",
    });
  });
});
