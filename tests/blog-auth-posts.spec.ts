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

test("auth and navigation flows", async ({ page }) => {
  // /login and /signup pages exist
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /로그인|Login/ })).toBeVisible();

  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: /회원가입|Sign up/ })).toBeVisible();

  // posts list -> click first post card -> detail not 404
  await page.goto("/posts");
  const firstCard = page.locator('a[href^="/posts/"]').first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  await expect(page).not.toHaveURL(/404/);

  // 검색창 입력 가능
  const search = page.getByPlaceholder(/검색|Search/).first();
  if (await search.count()) {
    await search.fill("테스트");
  }

  // 404 커스텀 페이지 확인
  await page.goto("/this-page-does-not-exist-xyz");
  await expect(page.getByText(/찾을 수 없습니다|404/)).toBeVisible();
});
