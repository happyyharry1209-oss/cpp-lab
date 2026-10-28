"use client";

import { Github, UserRound } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { signInWithGitHub } from "@/lib/supabase/auth-store";

export function AuthControl() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <span
        className="avatar-button auth-loading"
        aria-label="正在確認登入狀態"
        title="正在確認登入狀態"
      />
    );
  }

  if (auth.user) {
    return (
      <Link
        className="avatar-button signed-in-avatar"
        href="/dashboard"
        aria-label={`個人中心：${auth.user.email ?? "已登入"}`}
        title={auth.user.email ?? "個人中心"}
      >
        <UserRound size={20} />
      </Link>
    );
  }

  if (auth.configured) {
    return (
      <button
        type="button"
        className="avatar-button github-login-button"
        aria-label="使用 GitHub 登入"
        title="使用 GitHub 登入"
        onClick={() => void signInWithGitHub()}
      >
        <Github size={19} />
      </button>
    );
  }

  return (
    <Link
      className="avatar-button"
      href="/login"
      aria-label="登入設定"
      title="登入設定"
    >
      <UserRound size={20} />
    </Link>
  );
}
