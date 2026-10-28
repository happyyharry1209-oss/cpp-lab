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

test("practice workspace reveals a hint and grades real C++", async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto("/practice");
  await page.getByRole("button", { name: "顯示下一個提示" }).click();
  await expect(page.getByText("輸出可以使用 cout。")).toBeVisible();

  const editor = page.locator(".cm-content");
  await editor.click();
  await page.keyboard.press("Control+A");
  await editor.fill(helloWorldSolution);

  await page.getByRole("button", { name: "提交批改" }).click();
  await expect(
    page.getByText("測試通過", { exact: true }),
  ).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/通過 \d+ \/ \d+ 組測資/)).toBeVisible();
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
