import { NextResponse } from "next/server";
import { getExercise } from "@/content/exercises";
import { gradeExercise } from "@/lib/grader";
import { validateSource } from "@/lib/judge0";
import { checkDailyRunLimit } from "@/lib/rate-limit";
import { authorizeOwnerRequest } from "@/lib/supabase/server";

export const runtime = "nodejs";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return `submit:${forwarded?.split(",")[0]?.trim() ?? "local"}`;
}

export async function POST(request: Request) {
  try {
    const authorization = await authorizeOwnerRequest(request);
    if (!authorization.allowed) {
      return NextResponse.json(
        { error: authorization.error },
        { status: authorization.status ?? 403 },
      );
    }

    const body = (await request.json()) as {
      exerciseId?: string;
      sourceCode?: string;
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

    const limit = Number(process.env.DAILY_SUBMIT_LIMIT ?? 10);
    const rate = await checkDailyRunLimit(clientKey(request), limit);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: "今天的提交次數已用完，請明天再試。",
          retryAfterSeconds: rate.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfterSeconds ?? 86_400),
          },
        },
      );
    }

    const result = await gradeExercise({ exercise, sourceCode });

    return NextResponse.json(result, {
      headers: {
        "X-RateLimit-Remaining": String(rate.remaining),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "提交請求格式不正確。" },
      { status: 400 },
    );
  }
}
