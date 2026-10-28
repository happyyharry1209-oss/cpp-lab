import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/learn",
  useRouter: () => ({ push: vi.fn() }),
  notFound: vi.fn(),
}));

import AboutPage from "./about/page";
import DashboardPage from "./dashboard/page";
import LearnPage from "./learn/page";
import NotesPage from "./notes/page";

describe("supporting learning routes", () => {
  afterEach(() => cleanup());

  it("shows all eight lessons on the learning roadmap", () => {
    render(<LearnPage />);
    expect(
      screen.getByRole("heading", { name: "學習路線" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /第 \d+ 課/ })).toHaveLength(8);
  });

  it("provides personal progress, notes and project context", () => {
    render(<DashboardPage />);
    expect(
      screen.getByRole("heading", { name: "我的學習進度" }),
    ).toBeInTheDocument();
    cleanup();

    render(<NotesPage />);
    expect(screen.getByRole("heading", { name: "我的筆記" })).toBeInTheDocument();
    cleanup();

    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /把「看懂」\s*變成「寫得出來」/ }),
    ).toBeInTheDocument();
  });
});
