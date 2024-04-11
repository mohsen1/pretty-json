import { Page, expect } from "@playwright/test";

export async function assertBodyWithScreenshot({
  page,
  name,
}: {
  page: Page;
  name: string;
}) {
  const body = await page.getByTestId("body");
  const boundingBox = await body.boundingBox();
  if (!boundingBox) {
    throw new Error("Bounding box not found");
  }

  /** Bounding box padding */
  const padding = 20;

  // Take a screenshot of only the body element
  const clip = {
    x: boundingBox.x - padding,
    y: boundingBox.y - padding,
    width: boundingBox.width + padding * 2,
    height: boundingBox.height + padding * 2,
  };

  await expect(await page.screenshot({ fullPage: true, clip })).toMatchSnapshot(
    name,
    {
      threshold: 0.25,
    }
  );
}
