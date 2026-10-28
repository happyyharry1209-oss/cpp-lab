# C++ Lab

C++ Lab 是一個繁體中文、桌面優先的 C++ 學習網站。首頁負責介紹學習路線與作品集內容，練習工作台則獨立處理題目、分層提示、程式編輯與真實批改。

正式網站：<https://cpp-lab-sandy.vercel.app>

## 已完成

- 8 節從基礎語法到二分搜尋的課程
- 12 道 C++17 練習題，題題包含五階段提示、範例與多組測資
- 首頁、練習工作台、學習路線、課程內頁、進度中心、筆記與作品集說明
- CodeMirror 6 程式編輯器
- Judge0 隔離編譯與執行
- 編譯錯誤、執行錯誤、逾時、錯誤答案與通過狀態
- 本機草稿、提示、課程及題目完成度保存
- 可選的 GitHub OAuth 與 Supabase 跨裝置進度同步
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

## 啟用 GitHub 登入與雲端進度

1. 在 [Supabase](https://supabase.com/) 建立專案。
2. 在 SQL Editor 執行 `supabase/migrations/202610280001_user_progress.sql`。
3. 在 Authentication → Providers 啟用 GitHub，依照 Supabase 指示建立 GitHub OAuth App。
4. 在 Supabase 的 Redirect URLs 加入 `http://localhost:3000/auth/callback`，部署後再加入正式網域的相同路徑。
5. 複製 `.env.example` 為 `.env.local`，填入：

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OWNER_GITHUB_EMAIL=your-github-email@example.com
```

`anon` key 可以公開，但只在資料庫 RLS 已啟用時安全。不要在前端使用或提交 `service_role` key。

## 部署到 Vercel

1. 建立 GitHub 儲存庫並推送本專案。
2. 在 Vercel 匯入儲存庫。
3. 將 Judge0 環境變數加入 Vercel Project Settings。
4. 部署後以 `/`、`/practice` 與一題完整提交進行 smoke test。

目前 production 專案可使用 `pnpm deploy` 部署。Supabase 的 URL Configuration 需要包含：

```text
https://cpp-lab-sandy.vercel.app/auth/callback
```

## 公開前待完成

沒有 Supabase 設定時，網站會自動使用本機進度。設定 GitHub OAuth 後，課程、題目、提示與草稿進度會在本機與雲端之間合併；正式提交會驗證登入 token 與 `OWNER_GITHUB_EMAIL`。筆記目前仍只保存在本機。若要長期公開，還需要把程序內執行限額改為跨伺服器持續保存的流量限制。
