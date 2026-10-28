# C++ Lab

C++ Lab 是一個繁體中文、桌面優先的 C++ 學習網站。首頁負責介紹學習路線與作品集內容，練習工作台則獨立處理題目、分層提示、程式編輯與真實批改。

## 已完成

- 8 節從基礎語法到二分搜尋的課程
- 12 道 C++17 練習題，題題包含五階段提示、範例與多組測資
- 首頁、練習工作台、學習路線、課程內頁、進度中心、筆記與作品集說明
- CodeMirror 6 程式編輯器
- Judge0 隔離編譯與執行
- 編譯錯誤、執行錯誤、逾時、錯誤答案與通過狀態
- 本機草稿、提示、課程及題目完成度保存
- 每日執行與提交的基本流量限制
- Vitest、Testing Library 與 Playwright 測試

## 開發

需求：Node.js 22、pnpm。

```powershell
pnpm install
pnpm dev
```

開啟 <http://localhost:3000>。

## 驗證

```powershell
pnpm test:run
pnpm lint
pnpm build
pnpm test:e2e
```

Playwright 預設使用電腦已安裝的 Google Chrome。

實際把 12 道題目的參考解答送到 Judge0，並跑完所有測資：

```powershell
$env:RUN_JUDGE0_INTEGRATION='1'; pnpm exec vitest run src/content/solutions.integration.test.ts
```

這個測試會呼叫外部執行服務，因此不包含在一般單元測試中。

## C++ 執行設定

開發環境預設使用公開的低流量 Judge0 CE 端點。正式部署時，建議使用自己的 Judge0 執行環境，並在 Vercel 設定：

```text
JUDGE0_API_URL=
JUDGE0_API_KEY=
JUDGE0_API_HOST=
DAILY_RUN_LIMIT=12
DAILY_SUBMIT_LIMIT=10
```

不要把金鑰提交到 Git。程式碼只會傳到伺服器端 API，再由伺服器轉送給 Judge0。

## 部署到 Vercel

1. 建立 GitHub 儲存庫並推送本專案。
2. 在 Vercel 匯入儲存庫。
3. 將 Judge0 環境變數加入 Vercel Project Settings。
4. 部署後以 `/`、`/practice` 與一題完整提交進行 smoke test。

## 公開前待完成

目前進度與筆記採本機瀏覽器保存，適合個人使用與功能驗證。若網站要長期公開，下一步應加入 Supabase GitHub OAuth、資料庫進度同步、以資料庫實作的持久化流量限制，以及只允許 owner 帳號提交的伺服器驗證。
