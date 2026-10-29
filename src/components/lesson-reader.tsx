"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Lesson } from "@/content/lessons";
import { lessons } from "@/content/lessons";
import { exercises } from "@/content/exercises";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { uniquePush } from "@/lib/progress";

function LessonQuizCard({
  id,
  quiz,
  selected,
  onSelect,
}: {
  id: string;
  quiz: Lesson["quiz"];
  selected: number | undefined;
  onSelect: (answer: number) => void;
}) {
  return (
    <section className="quiz-card" aria-labelledby={id}>
      <div className="quiz-heading">
        <span>
          <Lightbulb size={18} />
        </span>
        <div>
          <h2 id={id}>確認一下</h2>
          <p>{quiz.question}</p>
        </div>
      </div>
      <div className="quiz-options">
        {quiz.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={
              selected === index
                ? index === quiz.answer
                  ? "is-correct"
                  : "is-wrong"
                : undefined
            }
            onClick={() => onSelect(index)}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            {option}
          </button>
        ))}
      </div>
      {selected !== undefined ? (
        <p className="quiz-explanation" role="status">
          {selected === quiz.answer ? "答對了。" : "再看一次。"}
          {quiz.explanation}
        </p>
      ) : null}
    </section>
  );
}

export function LessonReader({ lesson }: { lesson: Lesson }) {
  const { progress, save } = useLocalProgress();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const completed = progress.completedLessons.includes(lesson.slug);
  const previous = lessons[lesson.number - 2];
  const next = lessons[lesson.number];
  const recommendedExercise = exercises.find(
    (exercise) => exercise.slug === lesson.recommendedExerciseSlug,
  );

  function markComplete() {
    save({
      ...progress,
      completedLessons: uniquePush(progress.completedLessons, lesson.slug),
      lastLessonSlug: lesson.slug,
    });
  }

  return (
    <div className="lesson-reader">
      <div className="lesson-reader-main">
        <Link className="back-link" href="/learn">
          <ArrowLeft size={15} />
          返回學習路線
        </Link>
        <header className="lesson-hero">
          <span className="content-eyebrow">
            第 {lesson.number} 課 · {lesson.duration}
          </span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
          <div className="lesson-objectives">
            {lesson.objectives.map((objective) => (
              <span key={objective}>
                <CheckCircle2 size={15} />
                {objective}
              </span>
            ))}
          </div>
        </header>

        <div className="lesson-sections">
          {lesson.sections.map((section, index) => (
            <section key={section.title} className="lesson-section">
              <span className="section-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.code ? (
                  <div className="lesson-code">
                    <div>
                      <span>main.cpp</span>
                      <span>C++17</span>
                    </div>
                    <pre>
                      <code>{section.code}</code>
                    </pre>
                  </div>
                ) : null}
                {section.trace ? (
                  <ol className="section-trace">
                    {section.trace.map((state) => (
                      <li key={state}>{state}</li>
                    ))}
                  </ol>
                ) : null}
                {section.pitfalls ? (
                  <ul className="section-pitfalls">
                    {section.pitfalls.map((pitfall) => (
                      <li key={pitfall}>{pitfall}</li>
                    ))}
                  </ul>
                ) : null}
                {section.keyPoints ? (
                  <ul className="section-key-points">
                    {section.keyPoints.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={14} />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <div className="quiz-stack">
          {lesson.quizzes.map((quiz, index) => (
            <LessonQuizCard
              key={quiz.question}
              id={`lesson-quiz-${index}`}
              quiz={quiz}
              selected={quizAnswers[index]}
              onSelect={(answer) =>
                setQuizAnswers((current) => ({ ...current, [index]: answer }))
              }
            />
          ))}
        </div>

        <div className="lesson-completion">
          <div>
            <CheckCircle2 size={24} />
            <div>
              <strong>{completed ? "這一課已完成" : "讀完後標記完成"}</strong>
              <p>完成紀錄會顯示在學習路線與個人進度。</p>
            </div>
          </div>
          <button
            type="button"
            className={completed ? "secondary-button" : "primary-button"}
            onClick={markComplete}
            disabled={completed}
          >
            <Check size={16} />
            {completed ? "已完成" : "標記本課完成"}
          </button>
        </div>

        {recommendedExercise ? (
          <Link
            className="recommended-practice"
            href={`/practice?exercise=${recommendedExercise.slug}`}
          >
            <span className="recommended-practice-icon">
              <Code2 size={20} />
            </span>
            <span>
              <small>學完這一課，試試看</small>
              <strong>{recommendedExercise.title}</strong>
              <p>{recommendedExercise.summary}</p>
            </span>
            <span className="recommended-practice-action">
              開始練習 <ArrowRight size={16} />
            </span>
          </Link>
        ) : null}

        <nav className="lesson-pagination" aria-label="課程翻頁">
          {previous ? (
            <Link href={`/learn/${previous.slug}`}>
              <ArrowLeft size={16} />
              <span>
                <small>上一課</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`}>
              <span>
                <small>下一課</small>
                {next.title}
              </span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href="/practice">
              <span>
                <small>進入練習</small>
                {exercises.length} 道 C++ 題目
              </span>
              <ArrowRight size={16} />
            </Link>
          )}
        </nav>
      </div>

      <aside className="lesson-reader-aside">
        <div className="lesson-outline">
          <h2>本課內容</h2>
          <ol>
            {lesson.sections.map((section, index) => (
              <li key={section.title}>
                <span>{index + 1}</span>
                {section.title}
              </li>
            ))}
            <li>
              <span>{lesson.sections.length + 1}</span>
              理解檢查（{lesson.quizzes.length} 題）
            </li>
          </ol>
        </div>
        <div className="lesson-time-note">
          <Clock3 size={16} />
          預估閱讀時間 {lesson.duration}
        </div>
      </aside>
    </div>
  );
}
