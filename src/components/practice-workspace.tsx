"use client";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Filter,
  Play,
  RotateCcw,
  Search,
  Send,
  TerminalSquare,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  exercises,
  type Exercise,
  type ExerciseCategory,
} from "@/content/exercises";
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
];

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
  const [query, setQuery] = useState(initialQuery);
  const [codeOverride, setCodeOverride] = useState<string | null>(null);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"result" | "output">("result");
  const { progress, save: saveProgress } = useLocalProgress();

  const exercise = useMemo(
    () => exercises.find((item) => item.slug === selectedSlug) ?? exercises[0],
    [selectedSlug],
  );

  const code =
    codeOverride ??
    progress.drafts[exercise.slug] ??
    exercise.starterCode;
  const hintLevel = progress.hintLevels[exercise.slug] ?? 0;

  const filteredExercises = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return exercises.filter((item) => {
      const inCategory = category === "全部" || item.category === category;
      const inSearch =
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery);
      return inCategory && inSearch;
    });
  }, [category, query]);

  function selectExercise(nextSlug: string) {
    const next = exercises.find((item) => item.slug === nextSlug);
    if (!next) return;

    const saved = readLocalProgress();
    setSelectedSlug(next.slug);
    setCodeOverride(saved.drafts[next.slug] ?? next.starterCode);
    setResult(null);
    setTab("result");
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
    <div className="practice-page">
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
            12 道 C++17 練習
          </span>
          <span>
            <Check size={17} />
            {progress.completedExercises.length} 題已完成
          </span>
        </div>
      </header>

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
                  onClick={() => setCategory(item)}
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
              <h2 id="exercise-title">{exercise.title}</h2>
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
          </div>

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

          <div className="result-panel" aria-live="polite">
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
