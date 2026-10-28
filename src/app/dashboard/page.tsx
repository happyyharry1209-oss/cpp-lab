import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress-dashboard";

export const metadata: Metadata = {
  title: "個人中心",
  description: "查看 C++ Lab 課程、題目與提示的實際學習進度。",
};

export default function DashboardPage() {
  return (
    <div className="support-page">
      <ProgressDashboard />
    </div>
  );
}
