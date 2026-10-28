"use client";

import { ChevronDown, Lightbulb, LockKeyhole } from "lucide-react";
import { HINT_STAGE_COUNT } from "@/lib/progress";

const hintLabels = [
  "概念提示",
  "解題步驟",
  "程式骨架",
  "局部程式碼",
  "完整解答",
];

export function HintPanel({
  hints,
  level,
  onReveal,
}: {
  hints: readonly string[];
  level: number;
  onReveal: () => void;
}) {
  return (
    <section className="hint-panel">
      <div className="hint-heading">
        <span>
          <Lightbulb size={17} />
          提示
        </span>
        <span className="hint-count">
          {level} / {HINT_STAGE_COUNT}
        </span>
      </div>

      {level === 0 ? (
        <div className="hint-empty">
          <LockKeyhole size={17} />
          <p>先自己試試看。需要時再展開第一個提示。</p>
        </div>
      ) : (
        <ol className="hint-list">
          {hints.slice(0, level).map((hint, index) => (
            <li key={hintLabels[index]}>
              <button
                className="hint-reveal"
                type="button"
                aria-expanded="true"
              >
                <span>
                  <span className="hint-label">
                    {index + 1}. {hintLabels[index]}
                  </span>
                  {index === 4 ? (
                    <pre>
                      <code>{hint}</code>
                    </pre>
                  ) : (
                    <p>{hint}</p>
                  )}
                </span>
                <ChevronDown size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      )}

      <button
        className="hint-next"
        type="button"
        onClick={onReveal}
        disabled={level >= HINT_STAGE_COUNT}
      >
        {level >= HINT_STAGE_COUNT ? "已顯示完整解答" : "顯示下一個提示"}
      </button>
    </section>
  );
}
