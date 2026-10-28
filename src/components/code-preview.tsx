import { Play } from "lucide-react";
import Link from "next/link";

export function CodePreview() {
  return (
    <div className="hero-editor" aria-label="C++ 程式碼預覽">
      <div className="hero-editor-bar">
        <span className="hero-editor-title">
          <span className="mini-brand">C++</span>
          C++ Lab
        </span>
        <Link className="run-pill" href="/practice">
          <Play size={14} fill="currentColor" />
          執行
        </Link>
      </div>
      <div className="hero-editor-tabs">
        <span className="editor-file is-active">main.cpp</span>
        <span className="editor-output-label">執行結果</span>
      </div>
      <div className="hero-editor-body">
        <pre aria-label="C++ 範例程式">
          <code>
            <span className="line-number">1</span>
            <span className="code-keyword">#include</span>
            <span className="code-string"> &lt;iostream&gt;</span>
            {"\n"}
            <span className="line-number">2</span>
            <span className="code-keyword">using namespace</span> std;{"\n\n"}
            <span className="line-number">3</span>
            <span className="code-type">int</span>{" "}
            <span className="code-function">main</span>() {"{"}
            {"\n"}
            <span className="line-number">5</span>
            {"    "}std::cout &lt;&lt;{" "}
            <span className="code-string">&quot;Hello, C++ Lab!&quot;</span>
            {"\n"}
            <span className="line-number">6</span>
            {"    "}
            <span className="code-keyword">return</span> 0;{"\n"}
            <span className="line-number">7</span>
            {"}"}
          </code>
        </pre>
        <div className="hero-editor-result">
          <div>Hello, C++ Lab!</div>
          <span>編譯成功 · 0.02s</span>
        </div>
      </div>
    </div>
  );
}
