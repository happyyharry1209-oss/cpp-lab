import { NextResponse } from "next/server";
import { getExercise } from "@/content/exercises";
import { outputsMatch } from "@/lib/judge";
import { executeCpp, validateSource } from "@/lib/judge0";
import { checkDailyRunLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return `run:${forwarded?.split(",")[0]?.trim() ?? "local"}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      exerciseId?: string;
      sourceCode?: string;
      stdin?: string;
    };

    const exercise = body.exerciseId
      ? getExercise(body.exerciseId)
      : undefined;
    if (!exercise) {
      return NextResponse.json(
        { error: "找不到這道練習題。" },
        { status: 404 },
      );
    }

    const sourceCode = body.sourceCode ?? "";
    const validationError = validateSource(sourceCode);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const limit = Number(process.env.DAILY_RUN_LIMIT ?? 12);
    const rate = checkDailyRunLimit(clientKey(request), limit);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "今天的執行次數已用完，請明天再試。" },
        { status: 429 },
      );
    }

    const sample = exercise.samples[0];
    const stdin = body.stdin ?? sample.input;
    const result = await executeCpp({ sourceCode, stdin });
    const sampleMatched =
      result.status === "accepted" &&
      outputsMatch(result.stdout, sample.output);

    return NextResponse.json(
      {
        ...result,
        status:
          result.status === "accepted" && !sampleMatched
            ? "wrong_answer"
            : result.status,
        expectedOutput: sample.output,
        sampleMatched,
      },
      {
        headers: {
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "執行請求格式不正確。" },
      { status: 400 },
    );
  }
}
