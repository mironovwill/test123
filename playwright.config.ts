import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
import { allureConfig } from 'src/config/allure.config';
import { cloudAdminProjects } from 'src/config/cloud/cloud.config';

const GLOBAL_TIMEOUT = process.env.CI ? 15_000 : 30_000;
const NAVIGATION_TIMEOUT = process.env.CI ? 30_000 : 60_000;
const EXPECT_TIMEOUT = process.env.CI ? 5_000 : 10_000;
const RETRIES = process.env.CI ? 2 : 0;
const WORKERS = process.env.CI ? 1 : undefined;

const reportDir = resolve(__dirname, 'src/report');

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: RETRIES,
  workers: WORKERS,
  outputDir: `${reportDir}/test-results`,
  timeout: GLOBAL_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  reporter: [
    ['list'],
    ['json', { outputFile: `${reportDir}/test-results/test-results.json`, open: 'never' }],
    ['allure-playwright', { ...allureConfig, outputDir: `${reportDir}/allure-results` }],
  ],
  use: {
    testIdAttribute: 'data-qa',
    navigationTimeout: NAVIGATION_TIMEOUT,
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [...cloudAdminProjects],
});
