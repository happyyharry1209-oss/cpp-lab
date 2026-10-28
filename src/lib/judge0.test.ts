import { describe, expect, it } from "vitest";
import {
  buildJudge0Request,
  executeCpp,
  validateSource,
  type Judge0Transport,
} from "./judge0";

describe("Judge0 request building", () => {
  it("uses C++17 and base64 encodes source and input", () => {
    const request = buildJudge0Request({
      sourceCode: "#include <iostream>\n",
      stdin: "42",
    });

    expect(request.language_id).toBe(54);
    expect(request.cpu_time_limit).toBe(2);
    expect(request.memory_limit).toBe(131072);
    expect(Buffer.from(request.source_code, "base64").toString()).toContain(
      "#include",
    );
    expect(Buffer.from(request.stdin, "base64").toString()).toBe("42");
  });

  it("rejects empty or oversized source", () => {
    expect(validateSource("   ")).toContain("空白");
    expect(validateSource("x".repeat(65 * 1024))).toContain("64 KiB");
  });
});

describe("Judge0 execution adapter", () => {
  it("decodes successful stdout from the execution provider", async () => {
    const transport: Judge0Transport = async () => ({
      status: { id: 3, description: "Accepted" },
      stdout: Buffer.from("Hello\n").toString("base64"),
      stderr: null,
      compile_output: null,
      time: "0.01",
      memory: 1200,
    });

    const result = await executeCpp(
      { sourceCode: "int main(){}", stdin: "" },
      transport,
    );

    expect(result.status).toBe("accepted");
    expect(result.stdout).toBe("Hello\n");
    expect(result.durationMs).toBe(10);
  });

  it("surfaces compile output when compilation fails", async () => {
    const transport: Judge0Transport = async () => ({
      status: { id: 6, description: "Compilation Error" },
      stdout: null,
      stderr: null,
      compile_output: Buffer.from("missing semicolon").toString("base64"),
      time: null,
      memory: null,
    });

    const result = await executeCpp(
      { sourceCode: "int main(){}", stdin: "" },
      transport,
    );

    expect(result.status).toBe("compile_error");
    expect(result.compileOutput).toBe("missing semicolon");
  });
});
