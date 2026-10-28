"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

export function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    if (!client) {
      return;
    }

    const completeLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const nextParam = params.get("next");
      const next =
        nextParam?.startsWith("/") && !nextParam.startsWith("//")
          ? nextParam
          : "/dashboard";

      if (!code) {
        setError("登入回應缺少授權碼，請重新登入。");
        return;
      }

      const { error: exchangeError } =
        await client.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        setError(exchangeError.message);
        return;
      }

      router.replace(next);
    };

    void completeLogin();
  }, [router]);

  return (
    <div className="callback-page">
      {error || !isSupabaseConfigured ? (
        <>
          <h1>登入沒有完成</h1>
          <p>{error ?? "Supabase 尚未設定。"}</p>
          <a className="primary-button" href="/login">
            返回登入
          </a>
        </>
      ) : (
        <>
          <LoaderCircle className="spin" size={28} />
          <h1>正在完成登入</h1>
          <p>正在同步你的 C++ Lab 帳號，請稍候。</p>
        </>
      )}
    </div>
  );
}
