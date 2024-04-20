import { defineConfig, devices } from "@playwright/test";

const devServerPort = 5335;

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "on-failure",
      },
    ],
    ["list"],
  ],

  use: {
    baseURL: `http://127.0.0.1:${devServerPort}`,
    trace: "on-first-retry",
  },

  snapshotPathTemplate:
    "{testDir}/__screenshots__/{platform}/{testFilePath}/{projectName}/{arg}{ext}",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: `yarn parcel --no-cache tests/test-runner.html --port ${devServerPort}`,
    url: `http://127.0.0.1:${devServerPort}`,
    reuseExistingServer: !process.env.CI,
  },
});
