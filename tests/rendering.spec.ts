import { test } from "@playwright/test";
import { assertBodyWithScreenshot } from "./utils";
import { TEST_CASES } from "../examples";

test.describe.serial("Rendering", () => {
  for (const testCase of TEST_CASES) {
    test(testCase.name, async ({ page }) => {
      await page.goto("/");

      // create a <pretty-json> element with the testCase as its inner text
      await page.evaluate((testCase) => {
        const prettyJson = document.createElement("pretty-json");
        prettyJson.textContent = JSON.stringify(testCase.value);
        if (testCase.attributes) {
          for (const [key, value] of testCase.attributes) {
            prettyJson.setAttribute(key, value);
          }
        }
        document.body.appendChild(prettyJson);
      }, testCase);

      await assertBodyWithScreenshot({
        page,
        name: `test-case-${testCase.name}.png`,
      });

      await page.evaluate(() => {
        // clean up the <pretty-json> element
        document.body.innerHTML = "";
      });
    });
  }
});
