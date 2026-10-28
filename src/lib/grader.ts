import type { Exercise } from "@/content/exercises";
import { normalizeOutput, outputsMatch, type ExecutionResult } from "./judge";
import { executeCpp, type ExecutionInput } from "./judge0";

type Execute = (input: ExecutionInput) => Promise<ExecutionResult>;

export async function gradeExercise({
  exercise,
  sourceCode,
  execute = executeCpp,
}: {
  exercise: Exercise;
  sourceCode: string;
  execute?: Execute;
}): Promise<ExecutionResult> {
  let passed = 0;
  let durationMs = 0;
  let memoryKb = 0;
  let lastResult: ExecutionResult | undefined;

  for (let index = 0; index < exercise.tests.length; index++) {
    const test = exercise.tests[index];
    const result = await execute({
      sourceCode,
      stdin: test.input,
    });

    lastResult = result;
    durationMs += result.durationMs;
    memoryKb = Math.max(memoryKb, result.memoryKb);

    if (result.status !== "accepted") {
      return {
        ...result,
        passed,
        total: exercise.tests.length,
        durationMs,
        memoryKb,
      };
    }

    if (!outputsMatch(result.stdout, test.output)) {
      return {
        ...result,
        status: "wrong_answer",
        passed,
        total: exercise.tests.length,
        durationMs,
        memoryKb,
        failedCase: {
          index,
          input: test.input,
          expected: normalizeOutput(test.output),
          actual: normalizeOutput(result.stdout),
        },
      };
    }

    passed++;
  }

  return {
    status: "accepted",
    stdout: lastResult?.stdout ?? "",
    stderr: lastResult?.stderr ?? "",
    compileOutput: lastResult?.compileOutput ?? "",
    durationMs,
    memoryKb,
    passed,
    total: exercise.tests.length,
    message: "所有測試通過",
  };
}
