import type { Metadata } from "next";
import { PracticeWorkspace } from "@/components/practice-workspace";

export const metadata: Metadata = {
  title: "程式練習工作台",
  description: "選擇 C++ 練習題，使用分層提示、程式編輯器與即時批改完成題目。",
};

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; exercise?: string }>;
}) {
  const params = await searchParams;
  return (
    <PracticeWorkspace
      initialExerciseSlug={params.exercise}
      initialQuery={params.q ?? ""}
    />
  );
}
