import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./code-editor", () => ({
  CodeEditor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <textarea
      aria-label="C++ 程式碼"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

import { PracticeWorkspace } from "./practice-workspace";

const fetchMock = vi.fn();

beforeEach(() => {
  localStorage.clear();
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({
      status: "accepted",
      stdout: "Hello, C++ Lab!",
      stderr: "",
      compileOutput: "",
      durationMs: 7,
      memoryKb: 900,
      passed: 1,
      total: 1,
      sampleMatched: true,
    }),
  });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("practice workspace", () => {
  it("reveals hints one stage at a time", async () => {
    const user = userEvent.setup();
    render(<PracticeWorkspace initialExerciseSlug="hello-cpp-lab" />);

    expect(screen.queryByText(/輸出可以使用 cout/)).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "顯示下一個提示" }),
    );
    expect(screen.getByText(/輸出可以使用 cout/)).toBeInTheDocument();
  });

  it("posts code to the execution endpoint and shows the result", async () => {
    const user = userEvent.setup();
    render(<PracticeWorkspace initialExerciseSlug="hello-cpp-lab" />);

    await user.click(screen.getByRole("button", { name: "執行測試" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByText("測試通過")).toBeInTheDocument();
    expect(
      screen.getByText("Hello, C++ Lab!", {
        selector: ".result-output-preview pre",
      }),
    ).toBeInTheDocument();
  });

  it("selects the first matching exercise when changing category", async () => {
    const user = userEvent.setup();
    render(<PracticeWorkspace initialExerciseSlug="hello-cpp-lab" />);

    await user.click(screen.getByRole("button", { name: /^STL/ }));

    expect(
      screen.getByRole("heading", { name: "第一個重複單字" }),
    ).toBeInTheDocument();
  });

  it("filters by learning stage and difficulty", async () => {
    const user = userEvent.setup();
    render(<PracticeWorkspace initialExerciseSlug="hello-cpp-lab" />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "篩選學習階段" }),
      "2",
    );
    expect(
      screen.getByRole("heading", { name: "計算母音數量" }),
    ).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "篩選題目難度" }),
      "1",
    );
    expect(
      screen.getByRole("heading", { name: "不重複數字數量" }),
    ).toBeInTheDocument();
  });

  it("shows constraints, strategy and debugging guidance", () => {
    render(<PracticeWorkspace initialExerciseSlug="hello-cpp-lab" />);

    expect(
      screen.getByRole("heading", { name: "解題思路" }),
    ).toBeInTheDocument();
    expect(screen.getByText("先建立最小的 main 函式。")).toBeInTheDocument();
    expect(screen.getByText("常見錯誤與修正")).toBeInTheDocument();
    expect(screen.getByText("時間 O(1)")).toBeInTheDocument();
  });
});
