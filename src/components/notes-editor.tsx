"use client";

import { Check, FileText, Save, Trash2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const NOTES_KEY = "cpp-lab-notes-v1";
const NOTES_EVENT = "cpp-lab-notes";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(NOTES_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(NOTES_EVENT, callback);
  };
}

function getStoredNotes() {
  return window.localStorage.getItem(NOTES_KEY) ?? "";
}

export function NotesEditor() {
  const storedValue = useSyncExternalStore(subscribe, getStoredNotes, () => "");
  const [draft, setDraft] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const value = draft ?? storedValue;

  function save() {
    window.localStorage.setItem(NOTES_KEY, draft ?? storedValue);
    window.dispatchEvent(new Event(NOTES_EVENT));
    setDraft(null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  function clear() {
    window.localStorage.removeItem(NOTES_KEY);
    window.dispatchEvent(new Event(NOTES_EVENT));
    setDraft(null);
    setSaved(false);
  }

  return (
    <div className="notes-page">
      <header className="content-page-header">
        <span className="content-eyebrow">個人學習空間</span>
        <h1>我的筆記</h1>
        <p>整理語法、錯誤訊息與解題想法。內容只會保存在這台電腦的瀏覽器。</p>
      </header>

      <section className="notes-layout">
        <aside className="notes-guide">
          <span className="notes-icon">
            <FileText size={24} />
          </span>
          <h2>可以記什麼？</h2>
          <ul>
            <li>分成「輸入、處理、輸出」三步驟</li>
            <li>二分搜尋的 left、right 與更新規則</li>
            <li>曾遇過的編譯錯誤與修正方式</li>
            <li>提示展開後仍然不懂的地方</li>
          </ul>
        </aside>
        <div className="notes-editor">
          <div className="notes-toolbar">
            <span>學習筆記.txt</span>
            <span>{value.length} 字</span>
          </div>
          <textarea
            aria-label="學習筆記內容"
            value={value}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaved(false);
            }}
            placeholder={`今天學到了什麼？\n\n例如：\n二分搜尋使用閉區間時，迴圈條件是 left <= right；\n更新時要用 mid + 1 或 mid - 1，才能確保區間縮小。`}
          />
          <div className="notes-actions">
            <button type="button" className="secondary-button" onClick={clear}>
              <Trash2 size={15} />
              清除
            </button>
            <button type="button" className="primary-button" onClick={save}>
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "已儲存" : "儲存筆記"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
