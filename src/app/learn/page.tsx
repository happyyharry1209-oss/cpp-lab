import type { Metadata } from "next";
import { LearningPath } from "@/components/learning-path";

export const metadata: Metadata = {
  title: "學習路線",
  description:
    "十四節 C++ 課程，從輸入輸出、二分搜尋一路走到字串、STL 與上下界。",
};

export default function LearnPage() {
  return (
    <div className="support-page">
      <LearningPath />
    </div>
  );
}
