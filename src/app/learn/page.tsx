import type { Metadata } from "next";
import { LearningPath } from "@/components/learning-path";

export const metadata: Metadata = {
  title: "學習路線",
  description: "八節 C++ 核心課程，從輸入輸出、陣列、函式一路走到二分搜尋。",
};

export default function LearnPage() {
  return (
    <div className="support-page">
      <LearningPath />
    </div>
  );
}
