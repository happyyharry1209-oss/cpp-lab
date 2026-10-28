import type { Metadata } from "next";
import { LoginPanel } from "@/components/login-panel";

export const metadata: Metadata = {
  title: "登入",
  description: "使用 GitHub 登入 C++ Lab，同步課程進度與程式草稿。",
};

export default function LoginPage() {
  return (
    <div className="support-page">
      <LoginPanel />
    </div>
  );
}
