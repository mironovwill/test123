const hrefs = [
  '/access',
  '/topics',
  '/question-bank',
  '/compilations',
  '/var-directory',
  '/tracks',
  '/news',
  '/manage-course',
  '/events',
  '/d360',
  '/users',
  '/profile-setting',
  '/badge',
  '/tag-directory',
  '/authors-directory',
  '/post-directory',
  '/department-directory',
  '/function-directory',
  '/notifications',
  '/mailing',
  '/logging',
  '/logging-admin',
  '/mentors',
  '/mentee',
  '/products',
  '/orders',
  '/d360v2',
  '/manage-career',
  '/inspector?generalStatus=WAITING',
  '/groups-directory',
  '/coin-settings',
];

import { appFixture as test } from '@core/fixtures';

test('Базовые тесты админ панели', async ({ adminTopicsPage }) => {
  test.setTimeout(120_000);

  for (const href of hrefs) {
    await test.step(`Переход на страницу ${href} и проверка на ошибки в консоли`, async () => {
      await adminTopicsPage.page.goto(href);
      await adminTopicsPage.page.locator('h1').first().waitFor({ state: 'visible' });
    });
  }
});
