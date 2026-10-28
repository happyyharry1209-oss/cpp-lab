import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

import HomePage from "./page";

describe("C++ Lab homepage", () => {
  it("presents the learning offer and links to a separate practice route", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /從基礎到實戰/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /開始練習/ }),
    ).toHaveAttribute("href", "/practice");
  });

  it("shows the learning roadmap without embedding the full practice workspace", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "能力路線圖" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("題目列表")).not.toBeInTheDocument();
  });
});
