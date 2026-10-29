import { expect, test, type Page } from "@playwright/test";

const helloWorldSolution = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++ Lab!" << endl;
    return 0;
}`;

function captureRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("homepage opens a separate practice workspace", async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /從基礎到實戰/ }),
  ).toBeVisible();
  await expect(page.getByText("題目列表")).toHaveCount(0);

  await page.getByRole("link", { name: /開始練習/ }).first().click();
  await expect(page).toHaveURL(/\/practice/);
  await expect(
    page.getByRole("heading", { name: "程式練習工作台" }),
  ).toBeVisible();
  await expect(page.getByText("題目列表")).toBeVisible();
  expect(errors).toEqual([]);
});

test("practice workspace reveals a hint and executes real C++", async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/practice");
  await page.getByRole("button", { name: "顯示下一個提示" }).click();
  await expect(page.getByText("輸出可以使用 cout。")).toBeVisible();

  const editor = page.locator(".cm-content");
  await editor.click();
  await page.keyboard.press("Control+A");
  await editor.fill(helloWorldSolution);

  await page.getByRole("button", { name: "執行測試" }).click();
  await expect(
    page.getByText("測試通過", { exact: true }),
  ).toBeVisible({ timeout: 30_000 });
  await expect(
    page.getByText("Hello, C++ Lab!", {
      exact: true,
    }).last(),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("practice editor starts with code and accepts keyboard input", async ({
  page,
}) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/practice");

  const editor = page.locator(".cm-content");
  await expect(editor).toBeVisible();
  await expect(editor).toHaveAttribute("contenteditable", "true");
  await expect(editor).toContainText("#include <iostream>");

  await editor.click();
  await page.keyboard.press("Control+A");
  await page.keyboard.insertText("// typed in editor");
  await expect(editor).toContainText("// typed in editor");
  expect(errors).toEqual([]);
});

test("lesson content remains readable on a narrow viewport", async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/learn/input-output-types");

  await expect(
    page.getByRole("heading", { name: "輸入、輸出與資料型別" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "每個 C++ 程式都從 main 開始" }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
  expect(errors).toEqual([]);
});

test("second-stage lessons and STL exercises are discoverable", async ({
  page,
}) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/learn");
  await expect(
    page.getByRole("heading", { name: "第二階段：字串與 STL" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /第 9 課：std::string 字串基礎/ }),
  ).toBeVisible();

  await page.goto("/practice");
  await expect(page.getByText("20 道 C++17 練習")).toBeVisible();
  await page.getByRole("button", { name: /^STL/ }).click();
  await expect(
    page.getByRole("heading", { name: "第一個重複單字" }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "篩選題目難度" })
    .selectOption("1");
  await expect(
    page.getByRole("heading", { name: "不重複數字數量" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /回顧第 12 課：set 與 map 的查找/ }),
  ).toHaveAttribute("href", "/learn/sets-and-maps");
  expect(errors).toEqual([]);
});

test("a lesson recommends its next practice exercise", async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/learn/strings-basics");

  const recommended = page.getByRole("link", {
    name: /學完這一課，試試看.*計算母音數量/,
  });
  await expect(recommended).toBeVisible();
  await expect(recommended).toHaveAttribute(
    "href",
    "/practice?exercise=count-vowels",
  );
  expect(errors).toEqual([]);
});

test("detailed lessons and exercises expose guidance blocks", async ({
  page,
}) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/learn/strings-basics");
  await expect(
    page.getByRole("heading", { name: "逐步追蹤" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "常見錯誤與修正" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "確認一下" }),
  ).toHaveCount(2);

  await page.goto("/practice?exercise=count-vowels");
  await expect(
    page.getByRole("heading", { name: "解題思路" }),
  ).toBeVisible();
  await expect(page.getByText("輸入是一整行文字，可能包含空白。")).toBeVisible();
  await expect(page.getByText("常見錯誤與修正")).toBeVisible();
  await expect(page.getByText("時間 O(L)")).toBeVisible();
  expect(errors).toEqual([]);
});

test("login setup remains clear before Supabase is configured", async ({
  page,
}) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "登入 C++ Lab" })).toBeVisible();
  const setupNote = page.getByText("Supabase 尚未設定");
  const githubButton = page.locator(".github-signin");
  await expect(setupNote.or(githubButton)).toBeVisible();

  if (await setupNote.isVisible()) {
    await expect(
      page.getByRole("link", { name: /先使用本機模式/ }),
    ).toHaveAttribute("href", "/dashboard");
  }
  expect(errors).toEqual([]);
});

test("GitHub login starts a PKCE authorization request", async ({ page }) => {
  await page.goto("/login");
  const githubButton = page.locator(".github-signin");
  if ((await githubButton.count()) === 0) {
    test.skip(true, "Supabase is not configured in this environment");
  }

  let authorizeUrl: URL | undefined;
  await page.route("**/auth/v1/authorize**", async (route) => {
    authorizeUrl = new URL(route.request().url());
    await route.abort();
  });

  await githubButton.click();
  await expect.poll(() => authorizeUrl?.searchParams.get("provider")).toBe(
    "github",
  );
  expect(authorizeUrl?.searchParams.get("code_challenge_method")).toBe("s256");
  expect(authorizeUrl?.searchParams.get("code_challenge")).toBeTruthy();
  expect(authorizeUrl?.searchParams.get("redirect_to")).toContain(
    "/auth/callback",
  );
});

test("guest submissions are rejected when cloud auth is enabled", async ({
  page,
  request,
}) => {
  await page.goto("/login");
  if ((await page.locator(".github-signin").count()) === 0) {
    test.skip(true, "Supabase is not configured in this environment");
  }

  const response = await request.post("/api/submit", {
    data: {
      exerciseId: "hello-cpp-lab",
      sourceCode:
        '#include <iostream>\nint main(){std::cout << "Hello, C++ Lab!";}',
    },
  });

  expect(response.status()).toBe(401);
  await expect(response.json()).resolves.toMatchObject({
    error: "請先使用 GitHub 登入。",
  });
});
