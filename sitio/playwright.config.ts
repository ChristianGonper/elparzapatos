import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  workers: 2,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4322',
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build:review && npm run preview -- --port 4322 --ignore-lock',
    url: 'http://localhost:4322',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
