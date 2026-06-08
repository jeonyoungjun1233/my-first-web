import { expect, test } from "@playwright/test";

test("blog pages are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "전영준의 네온 블로그" })).toBeVisible();

  await page.goto("/posts");
  await expect(page.getByRole("heading", { name: "게시글 목록" })).toBeVisible();
});

test("new post page requires a signed-in visitor", async ({ page }) => {
  await page.goto("/posts/new");
  await expect(page).toHaveURL(/\/login/);
});
