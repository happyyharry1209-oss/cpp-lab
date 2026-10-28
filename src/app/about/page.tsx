import {
  Braces,
  Code2,
  Database,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <span className="content-eyebrow">關於 C++ Lab</span>
        <h1>
          把「看懂」
          <br />
          變成「寫得出來」
        </h1>
        <p>
          C++ Lab 是一個從零開始的個人學習作品。它把課程、分層提示、程式編輯與真實批改放在同一條學習路徑中，解決初學者最常見的斷點：理解題目後仍不知道如何下筆。
        </p>
      </header>

      <section className="about-story">
        <div>
          <span>01</span>
          <h2>問題不是題目不夠多</h2>
        </div>
        <p>
          剛開始學 C++ 時，真正令我卡住的是語法與問題拆解之間的距離。直接看完整解答太快，只讀語法教學又不知道怎麼應用。因此網站採用五段式提示：概念、步驟、骨架、局部程式碼，最後才是完整解答。
        </p>
      </section>

      <section className="about-story">
        <div>
          <span>02</span>
          <h2>每個功能都有學習目的</h2>
        </div>
        <p>
          首頁負責說明學習路線；練習工作台專注在寫程式；課程頁提供概念與範例；個人中心只呈現實際完成紀錄。網站不加入排行榜、社群或裝飾性數據，避免注意力離開學習本身。
        </p>
      </section>

      <section className="technical-overview">
        <div className="technical-copy">
          <span className="content-eyebrow">Technical case study</span>
          <h2>從介面到安全執行</h2>
          <p>
            前端使用 Next.js 與 CodeMirror；C++17 由伺服器轉送到隔離的執行服務批改。原始碼、API 金鑰與批改流程不直接暴露在瀏覽器。
          </p>
        </div>
        <div className="tech-grid">
          <article>
            <Code2 size={21} />
            <h3>Next.js + TypeScript</h3>
            <p>頁面、路由、伺服器 API 與型別化內容資料。</p>
          </article>
          <article>
            <Braces size={21} />
            <h3>CodeMirror 6</h3>
            <p>C++ 語法上色、行號與專注的編輯環境。</p>
          </article>
          <article>
            <ShieldCheck size={21} />
            <h3>Judge0</h3>
            <p>隔離編譯與執行，加入時間、記憶體和輸出限制。</p>
          </article>
          <article>
            <Database size={21} />
            <h3>Local-first progress</h3>
            <p>第一版先把草稿和完成度保存在瀏覽器。</p>
          </article>
          <article>
            <MonitorSmartphone size={21} />
            <h3>Responsive UI</h3>
            <p>桌面優先，同時保留窄螢幕閱讀與操作能力。</p>
          </article>
          <article>
            <Sparkles size={21} />
            <h3>Extensible content</h3>
            <p>課程與題目分離，之後可以直接增加模組。</p>
          </article>
        </div>
      </section>

      <footer className="about-footer">
        <div>
          <h2>下一步</h2>
          <p>加入更多語法、STL、資料結構與專案型練習。</p>
        </div>
        <a className="primary-button" href="/practice">
          回到練習工作台
        </a>
      </footer>
    </div>
  );
}
