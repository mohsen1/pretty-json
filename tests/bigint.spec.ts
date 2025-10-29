import { test, expect } from "@playwright/test";

test.describe.serial("BigInt Support", () => {
  test("renders large integers correctly", async ({ page }) => {
    await page.goto("/");

    // Create a <pretty-json> element with a large integer
    await page.evaluate(() => {
      const prettyJson = document.createElement("pretty-json");
      // Using a string to avoid precision loss in the test itself
      prettyJson.textContent = '{"bigInt": 3028151228586612802, "normal": 42}';
      document.body.appendChild(prettyJson);
    });

    // Wait for the element to render
    await page.waitForSelector("pretty-json");

    // Get the rendered text content
    const text = await page.evaluate(() => {
      const prettyJson = document.querySelector("pretty-json");
      return prettyJson?.shadowRoot?.textContent || "";
    });

    // Verify the large integer is preserved exactly as written
    expect(text).toContain("3028151228586612802");
    // Ensure it didn't get rounded to 3028151228586612700
    expect(text).not.toContain("3028151228586612700");
  });

  test("handles multiple large integers", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const prettyJson = document.createElement("pretty-json");
      // 9007199254740992 is MAX_SAFE_INTEGER + 1, testing the boundary
      prettyJson.textContent =
        '{"bigInt1": 9007199254740992, "bigInt2": 3028151228586612802, "normal": 100}';
      document.body.appendChild(prettyJson);
    });

    await page.waitForSelector("pretty-json");

    const text = await page.evaluate(() => {
      const prettyJson = document.querySelector("pretty-json");
      return prettyJson?.shadowRoot?.textContent || "";
    });

    expect(text).toContain("9007199254740992");
    expect(text).toContain("3028151228586612802");
    expect(text).toContain("100");
  });

  test("handles large integers in arrays", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const prettyJson = document.createElement("pretty-json");
      prettyJson.textContent = "[3028151228586612802, 42, 9007199254740992]";
      document.body.appendChild(prettyJson);
    });

    await page.waitForSelector("pretty-json");

    const text = await page.evaluate(() => {
      const prettyJson = document.querySelector("pretty-json");
      return prettyJson?.shadowRoot?.textContent || "";
    });

    expect(text).toContain("3028151228586612802");
    expect(text).toContain("42");
    expect(text).toContain("9007199254740992");
  });

  test("handles nested large integers", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const prettyJson = document.createElement("pretty-json");
      prettyJson.textContent = '{"nested": {"bigInt": 3028151228586612802}}';
      document.body.appendChild(prettyJson);
    });

    await page.waitForSelector("pretty-json");

    const text = await page.evaluate(() => {
      const prettyJson = document.querySelector("pretty-json");
      return prettyJson?.shadowRoot?.textContent || "";
    });

    expect(text).toContain("3028151228586612802");
  });

  test("keeps safe integers as numbers", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const prettyJson = document.createElement("pretty-json");
      prettyJson.textContent =
        '{"safeInt": 42, "largeButSafe": 9007199254740991}';
      document.body.appendChild(prettyJson);
    });

    await page.waitForSelector("pretty-json");

    const text = await page.evaluate(() => {
      const prettyJson = document.querySelector("pretty-json");
      return prettyJson?.shadowRoot?.textContent || "";
    });

    expect(text).toContain("42");
    expect(text).toContain("9007199254740991");
  });

  test("applies bigint CSS class to large integers", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      const prettyJson = document.createElement("pretty-json");
      prettyJson.textContent = '{"bigInt": 3028151228586612802}';
      document.body.appendChild(prettyJson);
    });

    await page.waitForSelector("pretty-json");

    const hasBigintClass = await page.evaluate(() => {
      const prettyJson = document.querySelector("pretty-json");
      const bigintElement = prettyJson?.shadowRoot?.querySelector(".bigint");
      return bigintElement !== null;
    });

    expect(hasBigintClass).toBe(true);
  });
});
