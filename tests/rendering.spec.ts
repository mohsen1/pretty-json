import { test, expect } from "@playwright/test";

test("First example", async ({ page }) => {
  await page.goto("/");

  const firstExample = page.getByTestId("first-example");

  await firstExample.scrollIntoViewIfNeeded();

  await expect(page).toHaveScreenshot({});

  firstExample.getByText("nested").click();
  await firstExample.scrollIntoViewIfNeeded();

  await expect(page).toHaveScreenshot({});

  firstExample.getByText("nested").click();
  await expect(page).toHaveScreenshot({});
});

test("Complex example", async ({ page }) => {
  await page.goto("/");

  const keys = ["deeply", "nested", "object", "with", "lots", "of"];
  for (const text of keys) {
    const complexExample = page.getByTestId("complex-example");
    await complexExample.scrollIntoViewIfNeeded();
    await complexExample.getByText(text).click();
    await complexExample.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot({});
  }

  const complexExample = page.getByTestId("complex-example");
  await complexExample.scrollIntoViewIfNeeded();
  await complexExample.getByText("complex").click();
  await expect(page).toHaveScreenshot({});

  for (const text of keys.reverse()) {
    const complexExample = page.getByTestId("complex-example");
    await complexExample.scrollIntoViewIfNeeded();
    await complexExample.getByText(text).click();
    await complexExample.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot({});
  }
});
