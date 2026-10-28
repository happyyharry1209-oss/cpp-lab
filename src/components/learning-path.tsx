"use client";

import {
  ArrowRight,
  Check,
  Clock3,
  LockKeyhole,
  Play,
} from "lucide-react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { useLocalProgress } from "@/hooks/use-local-progress";

export function LearningPath() {
  const { progress } = useLocalProgress();
  const completed = lessons.filter((lesson) =>
    progress.completedLessons.includes(lesson.slug),
  ).length;
  const percentage = Math.round((completed / lessons.length) * 100);
  const nextLesson =
    lessons.find(
      (lesson) => !progress.completedLessons.includes(lesson.slug),
    ) ?? lessons[0];

  return (
    <div className="learning-path">
      <div className="learning-overview">
        <div>
          <span className="content-eyebrow">V1 核心路線</span>
          <h1>學習路線</h1>
          <p>
            八節課從 C++ 基礎語法一路走到二分搜尋。你可以自由閱讀，但依序完成通常更容易建立連結。
          </p>
        </div>
        <div className="overview-progress">
          <span>{percentage}%</span>
          <div className="progress-track">
            <i style={{ width: `${percentage}%` }} />
          </div>
          <small>
            {completed} / {lessons.length} 節課已完成
          </small>
        </div>
      </div>

      <div className="route-callout">
        <div>
          <span className="callout-icon">
            <Play size={18} fill="currentColor" />
          </span>
          <div>
            <strong>從下一節繼續</strong>
            <p>第 {nextLesson.number} 課 · {nextLesson.title}</p>
          </div>
        </div>
        <Link href={`/learn/${nextLesson.slug}`}>
          繼續學習 <ArrowRight size={16} />
        </Link>
      </div>

      <div className="lesson-list" aria-label="八節核心課程">
        {lessons.map((lesson) => {
          const done = progress.completedLessons.includes(lesson.slug);
          const previousDone =
            lesson.number === 1 ||
            progress.completedLessons.includes(
              lessons[lesson.number - 2]?.slug,
            );
          return (
            <Link
              className={done ? "lesson-card is-complete" : "lesson-card"}
              href={`/learn/${lesson.slug}`}
              key={lesson.slug}
              aria-label={`第 ${lesson.number} 課：${lesson.title}`}
            >
              <span className="lesson-number">
                {done ? <Check size={18} /> : String(lesson.number).padStart(2, "0")}
              </span>
              <div className="lesson-card-copy">
                <div>
                  <h2>{lesson.title}</h2>
                  <span>
                    <Clock3 size={13} />
                    {lesson.duration}
                  </span>
                </div>
                <p>{lesson.summary}</p>
                <ul>
                  {lesson.objectives.slice(0, 2).map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>
              <span className="lesson-state">
                {done ? (
                  "已完成"
                ) : previousDone ? (
                  <>
                    開始 <ArrowRight size={15} />
                  </>
                ) : (
                  <LockKeyhole size={15} aria-label="可閱讀" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
