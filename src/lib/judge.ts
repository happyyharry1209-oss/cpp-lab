export const EXECUTION_LIMITS = {
  sourceBytes: 64 * 1024,
  compileSeconds: 10,
  wallSeconds: 2,
  memoryMb: 128,
  outputBytes: 64 * 1024,
} as const;

export type ExecutionStatus =
  | "accepted"
  | "compile_error"
  | "runtime_error"
  | "time_limit"
  | "memory_limit"
  | "wrong_answer"
  | "internal_error";

export interface FailedCase {
  index: number;
  input: string;
  expected: string;
  actual: string;
}

export interface ExecutionResult {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  compileOutput: string;
  durationMs: number;
  memoryKb: number;
  passed: number;
  total: number;
  failedCase?: FailedCase;
  message?: string;
}

export interface Judge0Status {
  id: number;
  description: string;
}

export function normalizeOutput(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n+$/g, "");
}

export function outputsMatch(actual: string, expected: string) {
  return normalizeOutput(actual) === normalizeOutput(expected);
}

export function mapJudge0Status(statusId: number): ExecutionStatus {
  if (statusId === 3) {
    return "accepted";
  }

  if (statusId === 4) {
    return "wrong_answer";
  }

  if (statusId === 5) {
    return "time_limit";
  }

  if (statusId === 6) {
    return "compile_error";
  }

  if (statusId >= 7 && statusId <= 12) {
    return "runtime_error";
  }

  return "internal_error";
}
