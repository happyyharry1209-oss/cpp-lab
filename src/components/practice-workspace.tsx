"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Filter,
  Gauge,
  ListChecks,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Search,
  Send,
  TerminalSquare,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  exercises,
  type Exercise,
  type ExerciseCategory,
} from "@/content/exercises";
import { getLesson } from "@/content/lessons";
import type { ExecutionResult } from "@/lib/judge";
import {
  getNextHintLevel,
  readLocalProgress,
  uniquePush,
} from "@/lib/progress";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { getAccessToken } from "@/lib/supabase/auth-store";
import { CodeEditor } from "./code-editor";
import { HintPanel } from "./hint-panel";

const categories: Array<"全部" | ExerciseCategory> = [
  "全部",
  "基礎語法",
  "流程控制",
  "陣列",
  "函式",
  "搜尋",
  "字串",
  "STL",
];

type StageFilter = "all" | "1" | "2";
type DifficultyFilter = "all" | "1" | "2" | "3";

const statusLabels: Record<ExecutionResult["status"], string> = {
  accepted: "測試通過",
  compile_error: "編譯失敗",
  runtime_error: "執行錯誤",
  time_limit: "執行逾時",
  memory_limit: "記憶體超限",
  wrong_answer: "答案不正確",
  internal_error: "執行服務暫時無法使用",
};

function difficultyStars(level: Exercise["difficulty"]) {
  return "★".repeat(level) + "☆".repeat(3 - level);
}

function filterExerciseList(
  category: (typeof categories)[number],
  query: string,
  stage: StageFilter,
  difficulty: DifficultyFilter,
) {
  const normalizedQuery = query.trim().toLowerCase();
  return exercises.filter((item) => {
    const inCategory = category === "全部" || item.category === category;
    const inStage = stage === "all" || item.stage === Number(stage);
    const inDifficulty =
      difficulty === "all" || item.difficulty === Number(difficulty);
    const inSearch =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.summary.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery);
    return inCategory && inStage && inDifficulty && inSearch;
  });
}

export function PracticeWorkspace({
  initialExerciseSlug = "hello-cpp-lab",
  initialQuery = "",
}: {
  initialExerciseSlug?: string;
  initialQuery?: string;
}) {
  const initialExercise =
    exercises.find((item) => item.slug === initialExerciseSlug) ??
    exercises[0];
  const [selectedSlug, setSelectedSlug] = useState(initialExercise.slug);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("全部");
  const [stage, setStage] = useState<StageFilter>("all");
  const [difficulty, setDifficulty] =
    useState<DifficultyFilter>("all");
  const [query, setQuery] = useState(initialQuery);
  const [codeOverride, setCodeOverride] = useState<string | null>(null);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"result" | "output">("result");
  const [focusMode, setFocusMode] = useState(false);
  const { progress, save: saveProgress } = useLocalProgress();

  const exercise = useMemo(
    () => exercises.find((item) => item.slug === selectedSlug) ?? exercises[0],
    [selectedSlug],
  );
  const relatedLesson = useMemo(
    () => getLesson(exercise.lessonSlug),
    [exercise.lessonSlug],
  );

  const code =
    codeOverride ??
    progress.drafts[exercise.slug] ??
    exercise.starterCode;
  const hintLevel = progress.hintLevels[exercise.slug] ?? 0;

  useEffect(() => {
    document.documentElement.classList.toggle(
      "practice-focus-mode",
      focusMode,
    );
    return () => {
      document.documentElement.classList.remove("practice-focus-mode");
    };
  }, [focusMode]);

  useEffect(() => {
    if (!focusMode) {
      return;
    }

    const exitOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFocusMode(false);
      }
    };
    window.addEventListener("keydown", exitOnEscape);
    return () => window.removeEventListener("keydown", exitOnEscape);
  }, [focusMode]);

  const filteredExercises = useMemo(() => {
    return filterExerciseList(category, query, stage, difficulty);
  }, [category, difficulty, query, stage]);

  function selectExercise(nextSlug: string) {
    const next = exercises.find((item) => item.slug === nextSlug);
    if (!next) return;

    const saved = readLocalProgress();
    setSelectedSlug(next.slug);
    setCodeOverride(saved.drafts[next.slug] ?? next.starterCode);
    setResult(null);
    setTab("result");
  }

  function selectCategory(nextCategory: (typeof categories)[number]) {
    const matchingExercises = filterExerciseList(
      nextCategory,
      query,
      stage,
      difficulty,
    );
    setCategory(nextCategory);
    if (
      matchingExercises.length > 0 &&
      !matchingExercises.some((item) => item.slug === selectedSlug)
    ) {
      selectExercise(matchingExercises[0].slug);
    }
  }

  function selectStage(nextStage: StageFilter) {
    const matchingExercises = filterExerciseList(
      category,
      query,
      nextStage,
      difficulty,
    );
    setStage(nextStage);
    if (
      matchingExercises.length > 0 &&
      !matchingExercises.some((item) => item.slug === selectedSlug)
    ) {
      selectExercise(matchingExercises[0].slug);
    }
  }

  function selectDifficulty(nextDifficulty: DifficultyFilter) {
    const matchingExercises = filterExerciseList(
      category,
      query,
      stage,
      nextDifficulty,
    );
    setDifficulty(nextDifficulty);
    if (
      matchingExercises.length > 0 &&
      !matchingExercises.some((item) => item.slug === selectedSlug)
    ) {
      selectExercise(matchingExercises[0].slug);
    }
  }

  function updateCode(nextCode: string) {
    setCodeOverride(nextCode);
    const latest = readLocalProgress();
    const next = {
      ...latest,
      drafts: { ...latest.drafts, [exercise.slug]: nextCode },
      lastExerciseSlug: exercise.slug,
    };
    saveProgress(next);
  }

  function revealHint() {
    const nextLevel = getNextHintLevel(hintLevel);
    const latest = readLocalProgress();
    saveProgress({
      ...latest,
      hintLevels: { ...latest.hintLevels, [exercise.slug]: nextLevel },
      lastExerciseSlug: exercise.slug,
    });
  }

  async function execute(mode: "run" | "submit") {
    setBusy(true);
    setResult(null);
    setTab("result");
    try {
      const accessToken = mode === "submit" ? await getAccessToken() : null;
      const response = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {}),
        },
        body: JSON.stringify({
          exerciseId: exercise.slug,
          sourceCode: code,
        }),
      });
      const payload = (await response.json()) as ExecutionResult & {
        error?: string;
      };

      if (!response.ok) {
        setResult({
          status: "internal_error",
          stdout: "",
          stderr: "",
          compileOutput: "",
          durationMs: 0,
          memoryKb: 0,
          passed: 0,
          total: exercise.tests.length,
          message: payload.error ?? "執行請求失敗。",
        });
        return;
      }

      setResult(payload);
      if (payload.status === "accepted") {
        const latest = readLocalProgress();
        saveProgress({
          ...latest,
          completedExercises: uniquePush(
            latest.completedExercises,
            exercise.slug,
          ),
          lastExerciseSlug: exercise.slug,
        });
      }
    } catch {
      setResult({
        status: "internal_error",
        stdout: "",
        stderr: "",
        compileOutput: "",
        durationMs: 0,
        memoryKb: 0,
        passed: 0,
        total: exercise.tests.length,
        message: "無法連線到 C++ 執行服務。",
      });
    } finally {
      setBusy(false);
    }
  }

  function resetCode() {
    setCodeOverride(exercise.starterCode);
    updateCode(exercise.starterCode);
    setResult(null);
  }

  const completed = progress.completedExercises.includes(exercise.slug);

  return (
    <div className={focusMode ? "practice-page is-focus-mode" : "practice-page"}>
      <header className="practice-page-heading">
        <div>
          <p className="breadcrumb">
            練習題庫 <ChevronRight size={14} /> {exercise.category}
          </p>
          <h1>程式練習工作台</h1>
          <p>選擇題目、拆解問題，從第一個提示開始動手。</p>
        </div>
        <div className="practice-summary">
          <span>
            <Code2 size={17} />
            {exercises.length} 道 C++17 練習
          </span>
          <span>
            <Check size={17} />
            {progress.completedExercises.length} 題已完成
          </span>
          <button
            type="button"
            className="focus-mode-button"
            onClick={() => setFocusMode(true)}
          >
            <Maximize2 size={15} />
            專注模式
          </button>
        </div>
      </header>

      {focusMode ? (
        <div className="focus-mode-toolbar">
          <span>
            專注模式 · 第 {exercise.stage === 1 ? "一" : "二"}階段 ·{" "}
            {exercise.title}
          </span>
          <button type="button" onClick={() => setFocusMode(false)}>
            <Minimize2 size={15} />
            離開專注模式
          </button>
        </div>
      ) : null}

      <div className="practice-layout">
        <aside className="exercise-library" aria-label="題目列表">
          <div className="library-title-row">
            <h2>題目列表</h2>
            <span>{exercises.length}</span>
          </div>
          <label className="workspace-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜尋題目..."
              aria-label="搜尋題目"
            />
          </label>

          <div className="workspace-filter-row">
            <label>
              <span>階段</span>
              <select
                aria-label="篩選學習階段"
                value={stage}
                onChange={(event) =>
                  selectStage(event.target.value as StageFilter)
                }
              >
                <option value="all">全部階段</option>
                <option value="1">第一階段</option>
                <option value="2">第二階段</option>
              </select>
            </label>
            <label>
              <span>難度</span>
              <select
                aria-label="篩選題目難度"
                value={difficulty}
                onChange={(event) =>
                  selectDifficulty(event.target.value as DifficultyFilter)
                }
              >
                <option value="all">全部難度</option>
                <option value="1">入門</option>
                <option value="2">基礎</option>
                <option value="3">進階</option>
              </select>
            </label>
          </div>

          <div className="category-list" aria-label="題目分類">
            {categories.map((item) => {
              const count =
                item === "全部"
                  ? exercises.length
                  : exercises.filter((exerciseItem) => exerciseItem.category === item)
                      .length;
              return (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "is-active" : undefined}
                  onClick={() => selectCategory(item)}
                >
                  <span>{item}</span>
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="exercise-list">
            {filteredExercises.map((item, index) => (
              <button
                key={item.slug}
                className={
                  selectedSlug === item.slug ? "exercise-row is-active" : "exercise-row"
                }
                type="button"
                onClick={() => selectExercise(item.slug)}
              >
                <span className="exercise-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.summary}</small>
                </span>
                {progress.completedExercises.includes(item.slug) ? (
                  <Check className="completed-mark" size={16} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>
            ))}
            {filteredExercises.length === 0 ? (
              <div className="empty-filter">
                <Filter size={18} />
                找不到符合條件的題目
              </div>
            ) : null}
          </div>
        </aside>

        <section className="problem-panel" aria-labelledby="exercise-title">
          <div className="problem-header">
            <div>
              <span className="exercise-kicker">{exercise.category}</span>
              {exercise.stage === 2 ? (
                <span className="exercise-stage-badge">第二階段</span>
              ) : null}
              <h2 id="exercise-title">{exercise.title}</h2>
              {relatedLesson ? (
                <Link
                  className="related-lesson-link"
                  href={`/learn/${relatedLesson.slug}`}
                >
                  <BookOpen size={13} />
                  回顧第 {relatedLesson.number} 課：{relatedLesson.title}
                </Link>
              ) : null}
            </div>
            <span
              className="difficulty"
              aria-label={`難度 ${exercise.difficulty} 顆星`}
            >
              {difficultyStars(exercise.difficulty)}
            </span>
          </div>
          <p className="problem-description">{exercise.description}</p>

          <dl className="problem-spec">
            <div>
              <dt>輸入格式</dt>
              <dd>{exercise.inputFormat}</dd>
            </div>
            <div>
              <dt>輸出格式</dt>
              <dd>{exercise.outputFormat}</dd>
            </div>
            <div>
              <dt>限制與邊界</dt>
              <dd>
                <ul className="constraint-list">
                  {exercise.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="sample-block">
            <div className="sample-heading">
              <h3>公開範例</h3>
              <span>第 1 組</span>
            </div>
            <div className="sample-grid">
              <div>
                <span>輸入</span>
                <pre>{exercise.samples[0].input || "（無）"}</pre>
              </div>
              <div>
                <span>預期輸出</span>
                <pre>{exercise.samples[0].output}</pre>
              </div>
            </div>
            {exercise.samples.length > 1 ? (
              <details className="more-samples">
                <summary>
                  查看其他 {exercise.samples.length - 1} 組公開範例
                </summary>
                {exercise.samples.slice(1).map((sample, index) => (
                  <div className="sample-grid" key={`${sample.input}-${index}`}>
                    <div>
                      <span>輸入</span>
                      <pre>{sample.input || "（無）"}</pre>
                    </div>
                    <div>
                      <span>預期輸出</span>
                      <pre>{sample.output}</pre>
                    </div>
                  </div>
                ))}
              </details>
            ) : null}
          </div>

          <section className="solution-guide">
            <h3>
              <ListChecks size={16} />
              解題思路
            </h3>
            <ol>
              {exercise.strategy.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="complexity-box">
              <Gauge size={16} />
              <span>時間 {exercise.complexity.time}</span>
              <span>空間 {exercise.complexity.space}</span>
              <p>{exercise.complexity.explanation}</p>
            </div>
            <details className="problem-explainer">
              <summary>逐步推演</summary>
              <ol>
                {exercise.walkthrough.map((state) => (
                  <li key={state}>{state}</li>
                ))}
              </ol>
            </details>
            <details className="problem-explainer is-warning">
              <summary>
                <TriangleAlert size={14} />
                常見錯誤與修正
              </summary>
              <ul>
                {exercise.commonMistakes.map((item) => (
                  <li key={item.mistake}>
                    <strong>{item.mistake}</strong>
                    <p>{item.fix}</p>
                  </li>
                ))}
              </ul>
            </details>
          </section>

          <HintPanel
            hints={exercise.hints}
            level={hintLevel}
            onReveal={revealHint}
          />

          <div className="problem-next">
            <span>{completed ? "這道題已完成" : "完成後會記錄在你的學習進度"}</span>
            <ArrowRight size={16} />
          </div>
        </section>

        <section className="workspace-editor-panel" aria-label="程式編輯器與測試結果">
          <div className="workspace-editor-toolbar">
            <div>
              <TerminalSquare size={17} />
              <span>main.cpp</span>
            </div>
            <div className="editor-toolbar-actions">
              <button type="button" onClick={resetCode} title="恢復起始程式碼">
                <RotateCcw size={15} />
                重設
              </button>
              <span className="language-pill">C++17</span>
            </div>
          </div>

          <CodeEditor value={code} onChange={updateCode} />

          <div className="workspace-runbar">
            <div className="run-shortcut">
              <Clock3 size={15} />
              執行上限 2 秒 · 記憶體 128 MiB
            </div>
            <div className="run-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => execute("run")}
                disabled={busy}
              >
                <Play size={16} />
                執行測試
              </button>
              <button
                type="button"
                className="primary-button compact"
                onClick={() => execute("submit")}
                disabled={busy}
              >
                <Send size={16} />
                提交批改
              </button>
            </div>
          </div>

          <div
            className={
              result ? "result-panel has-result" : "result-panel is-empty"
            }
            aria-live="polite"
          >
            <div className="result-tabs">
              <button
                type="button"
                className={tab === "result" ? "is-active" : undefined}
                onClick={() => setTab("result")}
              >
                測試結果
              </button>
              <button
                type="button"
                className={tab === "output" ? "is-active" : undefined}
                onClick={() => setTab("output")}
              >
                輸出內容
              </button>
              {result ? (
                <span>
                  {result.durationMs} ms ·{" "}
                  {Math.max(1, Math.round(result.memoryKb / 1024))} MiB
                </span>
              ) : null}
            </div>

            {busy ? (
              <div className="result-placeholder">
                <span className="loading-dot" />
                正在編譯並執行你的程式...
              </div>
            ) : result ? (
              tab === "result" ? (
                <div className="result-content">
                  <strong className={`result-status status-${result.status}`}>
                    {result.status === "accepted" ? <Check size={17} /> : null}
                    {statusLabels[result.status]}
                  </strong>
                  <p>{result.message}</p>
                  {result.total > 1 ? (
                    <span className="test-count">
                      通過 {result.passed} / {result.total} 組測資
                    </span>
                  ) : null}
                  {result.stdout ? (
                    <div className="result-output-preview">
                      <span>你的輸出</span>
                      <pre>{result.stdout}</pre>
                    </div>
                  ) : null}
                  {result.compileOutput ? (
                    <pre className="error-output">{result.compileOutput}</pre>
                  ) : null}
                  {result.stderr ? (
                    <pre className="error-output">{result.stderr}</pre>
                  ) : null}
                  {result.failedCase ? (
                    <div className="failed-case">
                      <p>第一組未通過：第 {result.failedCase.index + 1} 組</p>
                      <div>
                        <span>輸入</span>
                        <pre>{result.failedCase.input || "（無）"}</pre>
                        <span>預期</span>
                        <pre>{result.failedCase.expected}</pre>
                        <span>你的輸出</span>
                        <pre>{result.failedCase.actual}</pre>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <pre className="stdout-output">
                  {result.stdout || "（程式沒有輸出）"}
                </pre>
              )
            ) : (
              <div className="result-placeholder">
                <Play size={18} />
                執行或提交後，結果會顯示在這裡。
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
