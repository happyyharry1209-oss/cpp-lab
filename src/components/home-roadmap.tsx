"use client";

import {
  Braces,
  ChartNoAxesColumnIncreasing,
  Database,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { lessons } from "@/content/lessons";
import { readLocalProgress } from "@/lib/progress";

const modules = [
  {
    label: "基礎語法",
    detail: "輸入輸出、型別、條件判斷",
    icon: Braces,
    firstIndex: 0,
    count: 2,
  },
  {
    label: "流程與資料",
    detail: "迴圈、陣列、函式拆解",
    icon: Database,
    firstIndex: 2,
    count: 2,
  },
  {
    label: "排序與效率",
    detail: "有序資料、線性搜尋、複雜度",
    icon: ChartNoAxesColumnIncreasing,
    firstIndex: 4,
    count: 2,
  },
  {
    label: "二分搜尋",
    detail: "不變量、變體與除錯",
    icon: Search,
    firstIndex: 6,
    count: 2,
  },
];

export function HomeRoadmap() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setCompleted(readLocalProgress().completedLessons);
    update();
    window.addEventListener("cpp-lab-progress", update);
    return () => window.removeEventListener("cpp-lab-progress", update);
  }, []);

  return (
    <div className="roadmap-grid">
      {modules.map((module, index) => {
        const Icon = module.icon;
        const moduleLessons = lessons.slice(
          module.firstIndex,
          module.firstIndex + module.count,
        );
        const done = moduleLessons.filter((lesson) =>
          completed.includes(lesson.slug),
        ).length;
        const percentage = Math.round((done / module.count) * 100);

        return (
          <article className="roadmap-step" key={module.label}>
            <div className="roadmap-step-top">
              <span className="roadmap-icon">
                <Icon size={24} />
              </span>
              {index < modules.length - 1 ? (
                <span className="roadmap-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
            <h3>{module.label}</h3>
            <p>{module.detail}</p>
            <div className="progress-meta">
              <span>
                已完成 {done} / {module.count}
              </span>
              <span>{percentage}%</span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label={`${module.label}進度`}
              aria-valuemax={module.count}
              aria-valuenow={done}
            >
              <span style={{ width: `${percentage}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
