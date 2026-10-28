import {
  BookOpenCheck,
  ChartNoAxesColumnIncreasing,
  Code2,
  Lightbulb,
  Play,
} from "lucide-react";
import Link from "next/link";
import { CodePreview } from "@/components/code-preview";
import { HomeRoadmap } from "@/components/home-roadmap";

const features = [
  {
    title: "即時編譯執行",
    body: "直接在瀏覽器撰寫 C++17，提交後檢查每一組測資。",
    icon: Code2,
  },
  {
    title: "分層提示",
    body: "從概念、步驟到程式骨架，只在真正需要時展開。",
    icon: Lightbulb,
  },
  {
    title: "完整學習路線",
    body: "從輸入輸出開始，逐步走到二分搜尋與邊界除錯。",
    icon: BookOpenCheck,
  },
  {
    title: "真實進度紀錄",
    body: "記錄完成課程、通過題目和每一步提示，不製造假數據。",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <h1>
            從基礎到實戰，
            <br />
            打造你的 C++ 能力
          </h1>
          <p>
            從輸入輸出、陣列，到二分搜尋與邊界除錯。
            <br />
            用提示、實作和即時批改，走完一條真正能完成的學習路線。
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/practice">
              <Play size={18} fill="currentColor" />
              開始練習
            </Link>
            <Link className="text-link" href="/learn">
              先看學習路線
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-proof" aria-label="學習特色">
            <span>C++17</span>
            <span>8 節核心課程</span>
            <span>12 道實作練習</span>
          </div>
        </div>
        <CodePreview />
      </section>

      <section className="home-section roadmap-panel">
        <div className="section-heading">
          <div>
            <h2>能力路線圖</h2>
            <p>每完成一節課，再進入下一個概念。進度會保存在你的瀏覽器。</p>
          </div>
          <Link className="quiet-link" href="/learn">
            查看完整課程 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <HomeRoadmap />
      </section>

      <section className="feature-band">
        <div className="feature-intro">
          <h2>不是題庫堆疊，而是一條學習路徑</h2>
          <p>
            C++ Lab 的每個功能都服務同一個目標：讓你看懂題目後，真的能親手寫出程式。
          </p>
          <Link className="primary-button compact" href="/practice">
            從第一題開始
          </Link>
        </div>
        <div className="feature-list">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title}>
                <span className="feature-icon">
                  <Icon size={22} />
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="site-footer">
        <span>C++ Lab · Personal Learning Project</span>
        <span>Built with Next.js, CodeMirror and Judge0.</span>
      </footer>
    </div>
  );
}
