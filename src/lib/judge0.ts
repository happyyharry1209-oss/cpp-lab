import {
  EXECUTION_LIMITS,
  mapJudge0Status,
  type ExecutionResult,
} from "./judge";

export interface Judge0Request {
  language_id: number;
  source_code: string;
  stdin: string;
  cpu_time_limit: number;
  memory_limit: number;
}

export interface Judge0Response {
  status: {
    id: number;
    description: string;
  };
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
}

export interface ExecutionInput {
  sourceCode: string;
  stdin: string;
}

export type Judge0Transport = (
  request: Judge0Request,
) => Promise<Judge0Response>;

function base64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

function decode(value: string | null) {
  if (!value) {
    return "";
  }
  return Buffer.from(value, "base64").toString("utf8");
}

export function validateSource(sourceCode: string) {
  if (!sourceCode.trim()) {
    return "程式碼不能是空白的。";
  }

  if (Buffer.byteLength(sourceCode, "utf8") > EXECUTION_LIMITS.sourceBytes) {
    return "程式碼不可超過 64 KiB。";
  }

  return null;
}

export function buildJudge0Request(
  input: ExecutionInput,
): Judge0Request {
  return {
    language_id: 54,
    source_code: base64(input.sourceCode),
    stdin: base64(input.stdin),
    cpu_time_limit: EXECUTION_LIMITS.wallSeconds,
    memory_limit: EXECUTION_LIMITS.memoryMb * 1024,
  };
}

const defaultTransport: Judge0Transport = async (request) => {
  const baseUrl = (
    process.env.JUDGE0_API_URL ?? "https://ce.judge0.com"
  ).replace(/\/$/, "");
  const apiKey = process.env.JUDGE0_API_KEY;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-RapidAPI-Key"] = apiKey;
    headers["X-RapidAPI-Host"] =
      process.env.JUDGE0_API_HOST ??
      new URL(baseUrl).hostname;
  }

  const response = await fetch(
    `${baseUrl}/submissions?base64_encoded=true&wait=true`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Judge0 回傳 HTTP ${response.status}`);
  }

  return (await response.json()) as Judge0Response;
};

export async function executeCpp(
  input: ExecutionInput,
  transport: Judge0Transport = defaultTransport,
): Promise<ExecutionResult> {
  const validationError = validateSource(input.sourceCode);
  if (validationError) {
    return {
      status: "compile_error",
      stdout: "",
      stderr: "",
      compileOutput: validationError,
      durationMs: 0,
      memoryKb: 0,
      passed: 0,
      total: 1,
      message: validationError,
    };
  }

  try {
    const response = await transport(buildJudge0Request(input));
    const stdout = decode(response.stdout);
    const stderr = decode(response.stderr);
    const compileOutput = decode(response.compile_output);
    const status = mapJudge0Status(response.status.id);

    return {
      status,
      stdout,
      stderr,
      compileOutput,
      durationMs: Math.round(Number(response.time ?? 0) * 1000),
      memoryKb: response.memory ?? 0,
      passed: 0,
      total: 1,
      message: response.status.description,
    };
  } catch (error) {
    return {
      status: "internal_error",
      stdout: "",
      stderr: "",
      compileOutput: "",
      durationMs: 0,
      memoryKb: 0,
      passed: 0,
      total: 1,
      message:
        error instanceof Error
          ? error.message
          : "C++ 執行服務暫時無法使用。",
    };
  }
}
