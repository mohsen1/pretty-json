import { test } from "@playwright/test";
import { assertBodyWithScreenshot } from "./utils";
import { TEST_CASES } from "../examples";

test.describe.serial("Rendering", () => {
  for (const { name: testCaseName, value: testCase } of TEST_CASES) {
    test(testCaseName, async ({ page }) => {
      await page.goto("/");

      // create a <pretty-json> element with the testCase as its inner text
      await page.evaluate((testCase) => {
        const prettyJson = document.createElement("pretty-json");
        prettyJson.textContent = JSON.stringify(testCase);
        if (testCase.attributes) {
          for (const [key, value] of testCase.attributes) {
            prettyJson.setAttribute(key, value);
          }
        }
        document.body.appendChild(prettyJson);
      }, testCase);

      await assertBodyWithScreenshot({
        page,
        name: `test-case-${testCaseName}.png`,
      });

      await page.evaluate(() => {
        // clean up the <pretty-json> element
        document.body.innerHTML = "";
      });
    });
  }
});
