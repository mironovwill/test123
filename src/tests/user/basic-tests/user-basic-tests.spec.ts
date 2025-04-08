import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';

test.describe('Базовые тесты портала пользователя', () => {
  test.beforeEach(async ({ userCollectionTopicsPage }) => {
    await epic('Портал пользователя');
    await feature('Общие тесты портала пользователя');

    await userCollectionTopicsPage.visit('/');
    await userCollectionTopicsPage.validateH1Text();
  });

  test(
    'Проверка перехода в портал администратора из меню @allure.id=204',
    { tag: ['@Smoke', '@User'] },
    async ({ userCollectionTopicsPage }) => {
      await userCollectionTopicsPage.header.goToAdminDashboard();
    },
  );

  test(
    'Проверка title в портале пользователя @allure.id=202',
    { tag: ['@Smoke', '@User'] },
    async ({ userCollectionTopicsPage }) => {
      const url = userCollectionTopicsPage.page.url();
      const pageTitle = url.includes('tandpouble') || url.includes('stage') ? 'LXP Kampus' : 'KAMPUS - DEV';

      await userCollectionTopicsPage.validatePageTitle(pageTitle);
    },
  );

  test(
    'Проверка выхода из портала пользователя @allure.id=203',
    { tag: ['@Smoke', '@User'] },
    async ({ userCollectionTopicsPage, userLoginPage }) => {
      await userCollectionTopicsPage.header.exitFromAccount();
      await userLoginPage.validateLoginPageUrl();
    },
  );
});
