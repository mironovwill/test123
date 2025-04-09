import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
import { allureConfig } from 'src/config/allure.config';
import { cloudGlobalProjects } from 'src/config/cloud/cloud.config';

const GLOBAL_TIMEOUT = process.env.CI ? 60_000 : 60_000;
const NAVIGATION_TIMEOUT = process.env.CI ? 90_000 : 90_000;
const EXPECT_TIMEOUT = process.env.CI ? 40_000 : 40_000;
const RETRIES = process.env.CI ? 2 : 0;

const reportDir = resolve(__dirname, 'src/report');
// const wsEndpoint = `wss://moon.k-ampus.dev/playwright/chromium/playwright-1.51.0?headless=false&enableVideo=true`;

export default defineConfig({
  globalSetup: require.resolve('./src/tests/global-setup/global.setup'),
  globalTeardown: require.resolve('./src/tests/global-setup/global.teardown'),
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: RETRIES,
  workers: 1,
  outputDir: `${reportDir}/test-results`,
  timeout: GLOBAL_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  reporter: [
    ['list'],
    ['json', { outputFile: `${reportDir}/test-results/test-results.json`, open: 'never' }],
    ['allure-playwright', { ...allureConfig, resultsDir: `${reportDir}/allure-results` }],
  ],
  use: {
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-qa',
    navigationTimeout: NAVIGATION_TIMEOUT,
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    // connectOptions: { wsEndpoint },
    viewport: {
      width: 2048,
      height: 1080,
    },
  },
  projects: [...cloudGlobalProjects],
});
