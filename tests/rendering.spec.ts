import { test, expect } from "@playwright/test";
import { assertBodyWithScreenshot } from "./utils";

interface RenderingTestCase {
  name: string;
  value: any;
}

const TEST_CASES: RenderingTestCase[] = [
  {
    name: "String",
    value: "example string",
  },
  {
    name: "Number",
    value: 3232323,
  },
  {
    name: "Boolean (true)",
    value: true,
  },
  {
    name: "Boolean (false)",
    value: false,
  },
  {
    name: "Null",
    value: null,
  },
  {
    name: "deeply nested object",
    value: {
      deeply: { nested: { object: { with: { lots: { of: "values" } } } } },
    },
  },

  {
    name: "object with lots of keys on the first level",
    value: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26,
    },
  },

  {
    name: "object with very long key names",
    value: {
      "this is a very long key name that should be truncated": "value",
      "another very long key name that should be truncated": "value",
      "yet another very long key name that should be truncated": "value",
    },
  },
];

test.describe.serial("Rendering", () => {
  for (const { name: testCaseName, value: testCase } of TEST_CASES) {
    test(testCaseName, async ({ page }) => {
      await page.goto("/");

      // create a <pretty-json> element with the testCase as its inner text
      await page.evaluate((testCase) => {
        const prettyJson = document.createElement("pretty-json");
        prettyJson.textContent = JSON.stringify(testCase);
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
