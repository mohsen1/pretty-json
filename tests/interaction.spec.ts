import { test, expect } from "@playwright/test";
import { assertBodyWithScreenshot } from "./utils";

test.describe("Interaction", () => {
  test("Deep object", async ({ page }) => {
    await page.goto("/");

    // create a <pretty-json> element with a complex object as its inner text
    await page.evaluate(() => {
      const complex = {
        hello: "world",
        value: 42,
        enabled: true,
        extra: null,
        complex: { key: "value", obj: { key: "value" }, array: [1, 2, 3] },
        array: [1, 2, 3],
        deeply: {
          nested: {
            object: {
              with: {
                lots: { of: { keys: "values" } },
              },
            },
          },
        },
      };
      const prettyJson = document.createElement("pretty-json");
      prettyJson.setAttribute("data-testid", "complex-example");
      prettyJson.textContent = JSON.stringify(complex);
      document.body.appendChild(prettyJson);
    });

    // open up the complex object deeply
    const keys = ["deeply", "nested", "object", "with", "lots", "of"];
    for (const text of keys) {
      const complexExample = page.getByTestId("complex-example");
      await complexExample.scrollIntoViewIfNeeded();
      await complexExample.getByText(text).click();
      await complexExample.scrollIntoViewIfNeeded();

      // ensure each level is expanded correctly
      await assertBodyWithScreenshot({
        page,
        name: `complex-example-${text}.png`,
      });
    }

    const complexExample = page.getByTestId("complex-example");
    await complexExample.scrollIntoViewIfNeeded();
    await complexExample.getByText("complex").click();

    await assertBodyWithScreenshot({
      page,
      name: "complex-example.png",
    });

    // close the complex object deeply
    for (const text of keys.reverse()) {
      const complexExample = page.getByTestId("complex-example");
      await complexExample.scrollIntoViewIfNeeded();
      await complexExample.getByText(text).click();
      await complexExample.scrollIntoViewIfNeeded();

      // ensure each level is collapsed correctly
      await assertBodyWithScreenshot({
        page,
        name: `complex-example-${text}-collapsed.png`,
      });
    }
  });

  test("Object with various values on the top level", async ({ page }) => {
    await page.goto("/");

    // create a <pretty-json> element with an object with various values as its inner text
    await page.evaluate(() => {
      const various = {
        a: 1,
        b: "string",
        c: true,
        d: null,
        object: { key: "value" },
        array: [1, 2, 3],
      };
      const prettyJson = document.createElement("pretty-json");
      prettyJson.setAttribute("data-testid", "various-example");
      prettyJson.textContent = JSON.stringify(various);
      document.body.appendChild(prettyJson);
    });

    const variousExample = page.getByTestId("various-example");
    await variousExample.scrollIntoViewIfNeeded();

    // open up the object with various values
    await variousExample.getByText("object").click();
    await variousExample.scrollIntoViewIfNeeded();

    // Ensure the final state is correct
    await assertBodyWithScreenshot({
      page,
      name: "various-example.png",
    });

    // open the array inside the object
    await variousExample.getByText("array").click();
    await variousExample.scrollIntoViewIfNeeded();
    // Ensure the final state is correct
    await assertBodyWithScreenshot({
      page,
      name: "various-example-array.png",
    });
  });
  test("Very long string", async ({ page }) => {
    await page.goto("/");

    // create a <pretty-json> element with a very long string as its inner text
    await page.evaluate(() => {
      const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      const longString = lorem.repeat(300);
      const prettyJson = document.createElement("pretty-json");
      prettyJson.setAttribute("data-testid", "long-string-example");
      prettyJson.textContent = JSON.stringify(longString);
      document.body.appendChild(prettyJson);
    });

    const longStringExample = page.getByTestId("long-string-example");
    await longStringExample.scrollIntoViewIfNeeded();

    // Ensure collapsed state is correct
    await assertBodyWithScreenshot({
      page,
      name: "long-string-example-collapsed.png",
    });

    // open up the long string
    await longStringExample.getByRole("button").click();
    await longStringExample.scrollIntoViewIfNeeded();

    // Ensure the final state is correct
    await assertBodyWithScreenshot({
      page,
      name: "long-string-example-expanded.png",
    });

    // open up the long string again
    await longStringExample.getByRole("button").click();
    await longStringExample.scrollIntoViewIfNeeded();

    // Ensure the final state is correct
    await assertBodyWithScreenshot({
      page,
      name: "long-string-example-expanded-more.png",
    });
  });
});
