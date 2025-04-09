import { Page, test } from '@playwright/test';
import { AdminApiClient } from '@core/api/clients/admin.client';
import {
  AdminProfileSettingPage,
  AdminTopicsPage,
  AdminTopicPage,
} from '@core/page-object/pages/admin';
import { CacheRoute } from 'playwright-network-cache';

export interface AdminPagesFixture {
  adminApiClient: AdminApiClient;
  adminTopicsPage: AdminTopicsPage;
  adminProfileSettingPage: AdminProfileSettingPage;
  adminTopicPage: AdminTopicPage;
  exceptionLogger: void;
  cacheRoute: CacheRoute;
  disableAnimations: void;
}

export const adminPagesFixture = {
  adminApiClient: async ({}, use: (client: AdminApiClient) => Promise<void>): Promise<void> => {
    const adminApiClient = new AdminApiClient();
    await use(adminApiClient);
  },
  adminTopicPage: async (
    { page }: { page: Page },
    use: (page: AdminTopicPage) => Promise<void>,
  ) => {
    const adminTopicPage = new AdminTopicPage(page);
    await use(adminTopicPage);
  },
  adminProfileSettingPage: async (
    { page }: { page: Page },
    use: (page: AdminProfileSettingPage) => Promise<void>,
  ) => {
    const adminProfileSettingPage = new AdminProfileSettingPage(page);
    await use(adminProfileSettingPage);
  },
  adminTopicsPage: async (
    { page }: { page: Page },
    use: (page: AdminTopicsPage) => Promise<void>,
  ) => {
    const adminTopicsPage = new AdminTopicsPage(page);
    await use(adminTopicsPage);
  },
  exceptionLogger: [
    async ({ page }: { page: Page }, use: () => Promise<void>) => {
      const errors: Error[] = [];
      const listener = (error: Error) => {
        if (error.name !== 'CanceledError') {
          errors.push(error);
        }
      };
      page.on('pageerror', listener);

      await use();

      if (errors.length > 0) {
        const errorBody = errors
          .map((error, index) => {
            const header = `🚨 Ошибка #${index + 1} (${new Date().toLocaleTimeString()})`;
            const message = `📝 Сообщение: ${error.message || 'Нет описания'}`;
            const stackTrace = error.stack
              ? `🔍 Stack Trace:\n${error.stack}`
              : 'ℹ️ Stack Trace не доступен';

            return `${header}\n${message}\n${stackTrace}\n${'-'.repeat(60)}`;
          })
          .join('\n\n');

        await test.info().attach('frontend-exceptions', {
          body: errorBody,
          contentType: 'text/plain',
        });

        const errorTypes = [...new Set(errors.map(e => e.name || 'UnknownError'))];
        throw new Error(
          `Найдено ${errors.length} ошибок в консоли! 🚨\n` +
            `Типы ошибок: ${errorTypes.join(', ')}\n` +
            `Подробности в прикрепленном файле "frontend-exceptions"`,
        );
      }
      page.off('pageerror', listener);
    },
    { auto: true },
  ],
  cacheRoute: [
    async ({ page }: { page: Page }, use: (cacheRoute: CacheRoute) => Promise<void>) => {
      const cacheRoute = new CacheRoute(page);
      await cacheRoute.GET('/static/js/async/*');
      await cacheRoute.GET('/api/v1/topic/*');
      await cacheRoute.GET('/api/v1/user/*');
      await cacheRoute.GET('/api/v1/domain/*');
      await use(cacheRoute);
    },
    { auto: true },
  ],
  disableAnimations: [
    async ({ page }: { page: Page }, use: () => Promise<void>) => {
      await page.addStyleTag({
        content: '* { transition: none !important; animation: none !important; }',
      });
      await use();
    },
    { auto: true },
  ],
};
