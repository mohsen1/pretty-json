import { test, expect } from "@playwright/test";

test("First example", async ({ page }) => {
  await page.goto("/");

  const firstExample = page.getByTestId("first-example");

  await firstExample.scrollIntoViewIfNeeded();

  // Take a screenshot and save it with the filename "first-example.png"
  await expect(await page.screenshot()).toMatchSnapshot("first-example.png", {
    threshold: 0.1,
  });

  firstExample.getByText("nested").click();
  await firstExample.scrollIntoViewIfNeeded();

  // Take a screenshot and save it with the filename "first-example-nested.png"
  await expect(await page.screenshot()).toMatchSnapshot(
    "first-example-nested.png",
    {
      threshold: 0.1,
    },
  );
});

test("Complex example", async ({ page }) => {
  await page.goto("/");

  const keys = ["deeply", "nested", "object", "with", "lots", "of"];
  for (const text of keys) {
    const complexExample = page.getByTestId("complex-example");
    await complexExample.scrollIntoViewIfNeeded();
    await complexExample.getByText(text).click();
    await complexExample.scrollIntoViewIfNeeded();

    // Take a screenshot and save it with the filename "complex-example-${text}.png"
    await expect(await page.screenshot()).toMatchSnapshot(
      `complex-example-${text}.png`,
      {
        threshold: 0.1,
      },
    );
  }

  const complexExample = page.getByTestId("complex-example");
  await complexExample.scrollIntoViewIfNeeded();
  await complexExample.getByText("complex").click();

  // Take a screenshot and save it with the filename "complex-example-complex.png"
  await expect(await page.screenshot()).toMatchSnapshot(
    "complex-example-complex.png",
    {
      threshold: 0.1,
    },
  );

  for (const text of keys.reverse()) {
    const complexExample = page.getByTestId("complex-example");
    await complexExample.scrollIntoViewIfNeeded();
    await complexExample.getByText(text).click();
    await complexExample.scrollIntoViewIfNeeded();

    // Take a screenshot and save it with the filename "complex-example-${text}.png"
    await expect(await page.screenshot()).toMatchSnapshot(
      `complex-example-${text}.png`,
      {
        threshold: 0.1,
      },
    );
  }
});
