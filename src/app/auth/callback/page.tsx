import type { Metadata } from "next";
import { AuthCallback } from "@/components/auth-callback";

export const metadata: Metadata = {
  title: "完成登入",
};

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
