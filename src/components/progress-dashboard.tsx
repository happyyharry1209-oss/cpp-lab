"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Code2,
  Lightbulb,
  Target,
} from "lucide-react";
import Link from "next/link";
import { CloudAccountPanel } from "./cloud-account-panel";
import { exercises } from "@/content/exercises";
import { lessons } from "@/content/lessons";
import { useLocalProgress } from "@/hooks/use-local-progress";

export function ProgressDashboard() {
  const { progress } = useLocalProgress();
  const completedLessons = progress.completedLessons.length;
  const completedExercises = progress.completedExercises.length;
  const unlockedHints = Object.values(progress.hintLevels).reduce(
    (sum, level) => sum + level,
    0,
  );
  const lessonPercent = Math.round((completedLessons / lessons.length) * 100);
  const exercisePercent = Math.round(
    (completedExercises / exercises.length) * 100,
  );
  const nextLesson =
    lessons.find(
      (lesson) => !progress.completedLessons.includes(lesson.slug),
    ) ?? lessons[0];
  const lastExercise = exercises.find(
    (exercise) => exercise.slug === progress.lastExerciseSlug,
  );

  return (
    <div className="dashboard-page">
      <header className="content-page-header">
        <span className="content-eyebrow">個人學習紀錄</span>
        <h1>我的學習進度</h1>
        <p>所有數字都來自這台電腦上的實際學習紀錄。</p>
      </header>

      <CloudAccountPanel />

      <section className="stat-grid" aria-label="學習統計">
        <article>
          <span className="stat-icon">
            <BookOpenCheck size={20} />
          </span>
          <strong>{completedLessons}</strong>
          <p>完成課程</p>
          <small>共 {lessons.length} 節</small>
        </article>
        <article>
          <span className="stat-icon">
            <Code2 size={20} />
          </span>
          <strong>{completedExercises}</strong>
          <p>通過題目</p>
          <small>共 {exercises.length} 題</small>
        </article>
        <article>
          <span className="stat-icon">
            <Lightbulb size={20} />
          </span>
          <strong>{unlockedHints}</strong>
          <p>已展開提示</p>
          <small>每個提示都有紀錄</small>
        </article>
      </section>

      <div className="dashboard-columns">
        <section className="dashboard-progress-card">
          <div className="panel-heading">
            <h2>路線完成度</h2>
            <Link href="/learn">
              查看路線 <ArrowRight size={14} />
            </Link>
          </div>
          <div className="dashboard-progress-block">
            <div>
              <span>核心課程</span>
              <strong>{lessonPercent}%</strong>
            </div>
            <div className="progress-track">
              <i style={{ width: `${lessonPercent}%` }} />
            </div>
            <small>
              {completedLessons} / {lessons.length} 節
            </small>
          </div>
          <div className="dashboard-progress-block">
            <div>
              <span>實作練習</span>
              <strong>{exercisePercent}%</strong>
            </div>
            <div className="progress-track">
              <i style={{ width: `${exercisePercent}%` }} />
            </div>
            <small>
              {completedExercises} / {exercises.length} 題
            </small>
          </div>
        </section>

        <aside className="next-action-card">
          <span>
            <Target size={20} />
          </span>
          <h2>下一步</h2>
          <p>
            第 {nextLesson.number} 課：{nextLesson.title}
          </p>
          <Link className="primary-button compact" href={`/learn/${nextLesson.slug}`}>
            繼續學習
            <ArrowRight size={15} />
          </Link>
        </aside>
      </div>

      <section className="recent-panel">
        <div className="panel-heading">
          <h2>最近練習</h2>
          <Link href="/practice">打開工作台</Link>
        </div>
        {lastExercise ? (
          <Link href={`/practice?exercise=${lastExercise.slug}`}>
            <span className="recent-check">
              {progress.completedExercises.includes(lastExercise.slug) ? (
                <Check size={18} />
              ) : (
                <Code2 size={18} />
              )}
            </span>
            <div>
              <strong>{lastExercise.title}</strong>
              <p>{lastExercise.category} · {lastExercise.summary}</p>
            </div>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <div className="empty-state">
            <Code2 size={24} />
            <p>還沒有練習紀錄，從第一道題開始吧。</p>
            <Link className="primary-button compact" href="/practice">
              開始第一題
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
