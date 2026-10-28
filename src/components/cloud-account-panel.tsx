"use client";

import { Check, Cloud, Github, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import {
  signInWithGitHub,
  signOutCloudAccount,
} from "@/lib/supabase/auth-store";

export function CloudAccountPanel() {
  const auth = useAuth();

  return (
    <section className="cloud-account-panel">
      <span className="cloud-account-icon">
        {auth.user ? <Check size={18} /> : <Cloud size={18} />}
      </span>
      <div>
        <strong>
          {auth.user
            ? "雲端進度已啟用"
            : auth.configured
              ? "登入以同步學習進度"
              : "目前使用本機進度"}
        </strong>
        <p>
          {auth.user
            ? `已登入 ${auth.user.email ?? "GitHub 帳號"}`
            : auth.configured
              ? "使用 GitHub 登入後，草稿與完成度會自動合併。"
              : "填入 Supabase 設定後即可啟用跨裝置同步。"}
        </p>
      </div>
      {auth.user ? (
        <button
          type="button"
          className="secondary-button"
          onClick={() => void signOutCloudAccount()}
        >
          <LogOut size={15} />
          登出
        </button>
      ) : auth.configured ? (
        <button
          type="button"
          className="secondary-button"
          onClick={() => void signInWithGitHub()}
        >
          <Github size={15} />
          GitHub 登入
        </button>
      ) : (
        <Link className="secondary-button" href="/login">
          查看設定
        </Link>
      )}
    </section>
  );
}
