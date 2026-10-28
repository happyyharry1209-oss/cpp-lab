import type { Metadata } from "next";
import { NotesEditor } from "@/components/notes-editor";

export const metadata: Metadata = {
  title: "我的筆記",
  description: "整理 C++ 語法、常見錯誤與解題步驟。",
};

export default function NotesPage() {
  return (
    <div className="support-page">
      <NotesEditor />
    </div>
  );
}
