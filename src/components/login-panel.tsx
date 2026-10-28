"use client";

import { ArrowRight, Check, Cloud, Github, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { signInWithGitHub } from "@/lib/supabase/auth-store";

export function LoginPanel() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  async function login() {
    setError(null);
    setRedirecting(true);
    const result = await signInWithGitHub();
    if (result.error) {
      setError(result.error);
      setRedirecting(false);
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <span className="login-icon">
          <Cloud size={27} />
        </span>
        <span className="content-eyebrow">Personal cloud account</span>
        <h1>登入 C++ Lab</h1>
        <p>
          使用 GitHub 登入後，學習進度與程式草稿會同步到你的私人帳號。
          只有指定的 owner 帳號可以提交正式批改。
        </p>

        <ul className="login-benefits">
          <li>
            <Check size={15} /> 跨裝置同步課程與題目進度
          </li>
          <li>
            <Check size={15} /> 保存最後一次程式草稿與提示階段
          </li>
          <li>
            <Check size={15} /> 伺服器端檢查 owner 權限
          </li>
        </ul>

        {auth.user ? (
          <div className="login-complete">
            <span>已登入為 {auth.user.email}</span>
            <Link className="primary-button" href="/dashboard">
              前往個人中心 <ArrowRight size={16} />
            </Link>
          </div>
        ) : auth.configured ? (
          <button
            type="button"
            className="github-signin"
            onClick={() => void login()}
            disabled={auth.loading || redirecting}
          >
            {redirecting ? (
              <LoaderCircle className="spin" size={19} />
            ) : (
              <Github size={19} />
            )}
            {redirecting ? "正在前往 GitHub..." : "使用 GitHub 登入"}
          </button>
        ) : (
          <div className="login-setup-note">
            <strong>Supabase 尚未設定</strong>
            <p>
              目前網站會繼續使用瀏覽器本機進度。填入 Project URL、anon key
              與 owner email 後，即可啟用 GitHub 登入與雲端同步。
            </p>
            <Link href="/dashboard">先使用本機模式 <ArrowRight size={15} /></Link>
          </div>
        )}

        {error ? <p className="form-error">{error}</p> : null}
      </section>
      <aside className="login-aside">
        <span>Cloud sync</span>
        <h2>換一台電腦，從上次停下的地方繼續。</h2>
        <p>
          本機資料會先保留；登入後會與雲端版本合併，不會直接覆蓋已完成的課程。
        </p>
      </aside>
    </div>
  );
}
