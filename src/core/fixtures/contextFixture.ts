import { Fixtures, Page, APIRequestContext, PlaywrightTestArgs } from '@playwright/test';
import { mockStaticRecourses } from '@core/helpers';

export interface ContextFixture {
  contextPage: Page;
  contextRequest: APIRequestContext;
}

export const contextFixture: Fixtures<ContextFixture, PlaywrightTestArgs> = {
  contextPage: async ({ page }, use) => {
    await mockStaticRecourses(page);
    await use(page);
  },
  contextRequest: async ({ request }, use) => {
    await use(request);
  },
};
