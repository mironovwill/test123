import { Page } from '@playwright/test';

export const mockStaticRecourses = async (page: Page): Promise<void> => {
  await page.route('**/*', async route => {
    const url = route.request().url();
    console.log(`Intercepted request to: ${url}`);
    if (url.match(/\.(ico|jpeg|png|mp3|woff|woff2|svg|jpg|webp)$/)) {
      await route.abort();
    } else {
      await route.continue();
    }
  });
};
