import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
import { allureConfig } from './src/config/reporters/allure.config';
import { cloudGlobalProjects } from 'src/config/cloud/cloud.config';

const reportDir = resolve(__dirname, 'src/report');
// const wsEndpoint = `wss://moon.k-ampus.dev/playwright/chromium/playwright-1.51.0?headless=false&enableVideo=true`;

export default defineConfig({
  globalSetup: require.resolve('./src/tests/global-setup/global.setup'),
  globalTeardown: require.resolve('./src/tests/global-setup/global.teardown'),
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : 1,
  timeout: 500_000,
  expect: {
    timeout: 120_000,
  },
  outputDir: `${reportDir}/test-results`,
  reporter: [
    ['list'],
    ['json', { outputFile: `${reportDir}/test-results/test-results.json`, open: 'never' }],
    ['allure-playwright', { ...allureConfig, resultsDir: `${reportDir}/allure-results` }],
  ],
  use: {
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-qa',
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
