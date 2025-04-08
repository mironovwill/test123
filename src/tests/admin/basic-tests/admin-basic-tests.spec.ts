import { epic, feature } from 'allure-js-commons';
import { appFixture as test } from '@core/fixtures';
import { TopicsLanguages } from '@core/types';
import { pageContent } from '@core/helpers/constants';

test.describe('Базовые тесты админ панели', () => {
  test.beforeEach(async ({ adminTopicsPage }) => {
    await epic('Панель администратора');
    await feature('Общие тесты панели администратра');

    await adminTopicsPage.visit();
    await adminTopicsPage.validateH1Text();
  });

  test(
    'Отображение и работа кнопки "Инструкции" @allure.id=164',
    { tag: ['@Regress', '@Admin'] },
    async ({ adminTopicsPage }) => {
      await adminTopicsPage.header.validateInstructionsBtn();
    },
  );

  test(
    'Переход в юзер часть через кнопку "Пользовательская часть" @allure.id=167',
    { tag: ['@Smoke', '@Admin'] },
    async ({ adminTopicsPage }) => {
      await adminTopicsPage.header.clickRedirectToUserPartBtn();
    },
  );

  test(
    'Проверка title в админ панели @allure.id=165',
    { tag: ['@Smoke', '@Admin'] },
    async ({ adminTopicsPage }) => {
      const url = adminTopicsPage.page.url();
      const pageTitle =
        url.includes('tandpouble') || url.includes('stage') ? 'LXP Kampus' : 'KAMPUS - DEV';

      await adminTopicsPage.validatePageTitle(pageTitle);
    },
  );

  test(
    'Проверка отображения helpdesk кнопки в админ панели @allure.id=166',
    { tag: ['@Smoke', '@Admin'] },
    async ({ adminTopicsPage }) => {
      await adminTopicsPage.validateHelpdeskButton();
    },
  );

  test(
    'Проверка смены языка в портале пользователя',
    { tag: ['@Smoke', '@Admin'] },
    async ({ adminProfileSettingPage }) => {
      await adminProfileSettingPage.visit();
      await adminProfileSettingPage.validateH1(pageContent.cloud.admin.h1.ru.profileSettings);
      await adminProfileSettingPage.selectLanguage(TopicsLanguages.ENGLISH);
      await adminProfileSettingPage.validateH1(pageContent.cloud.admin.h1.eng.profileSettings);
      await adminProfileSettingPage.selectLanguage(TopicsLanguages.RUSSIAN);
      await adminProfileSettingPage.validateH1(pageContent.cloud.admin.h1.ru.profileSettings);
    },
  );
});
