import { Page } from '@playwright/test';

export const mockStaticRecourses = async (page: Page): Promise<void> => {
  await page.route('**/*.{ico,jpeg,png,mp3,woff,woff2}', route => route.abort());
};
