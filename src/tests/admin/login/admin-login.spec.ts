import 'dotenv/config';
import { test as base } from '@playwright/test';
import { AdminLoginPage, AdminTopicsPage } from '@core/page-object/pages/admin';
import { epic, feature, parameter } from 'allure-js-commons';
import { errorMessages } from '@core/helpers/constants';
import testData from '@test-data';

interface LoginFixtures {
  adminLoginPage: AdminLoginPage;
  adminTopicsPage: AdminTopicsPage;
}

const testUsers = {
  banned: testData.users.bannedUser,
  admin: testData.users.admin,
  manager: testData.users.manager,
  employee: testData.users.user,
};

const testCredentials = {
  bannedUserEmail: testUsers.banned.email,
  adminEmail: testUsers.admin.email,
  managerEmail: testUsers.manager.email,
  employeeEmail: testUsers.employee.email,
  password: process.env.TEST_USER_PASSWORD!,
  incorrectEmail: 'test@gmail.com',
};

const test = base.extend<LoginFixtures>({
  adminLoginPage: async ({ page }, use) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.visit('/');
    await use(adminLoginPage);
  },
  adminTopicsPage: async ({ page }, use) => {
    const adminTopicsPage = new AdminTopicsPage(page);
    await use(adminTopicsPage);
  },
});

const setCredentials = (login: string) => parameter('Логин', login);

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Логин в админ панель', () => {
  test.beforeEach(async () => {
    await epic('Панель администратора');
    await feature('Логин');
  });

  test(
    'Логин в портал администратора администратором @allure.id=160',
    { tag: ['@Smoke', '@Admin', '@Login'] },
    async ({ adminLoginPage, adminTopicsPage }) => {
      setCredentials(testCredentials.adminEmail);

      await adminLoginPage.login(testCredentials.adminEmail, testCredentials.password);
      await adminTopicsPage.validateH1Text();
      await adminTopicsPage.menu.validateAdminHasNoLinksInMenu();
    },
  );

  test(
    'Логин в портал администратора руководителем @allure.id=158',
    { tag: ['@Smoke', '@Admin', '@Login'] },
    async ({ adminLoginPage, adminTopicsPage }) => {
      setCredentials(testCredentials.managerEmail);

      await adminLoginPage.login(testCredentials.managerEmail, testCredentials.password);
      await adminTopicsPage.validateH1Text();
      await adminTopicsPage.menu.validateManagerHasNoLinksInMenu();
    },
  );

  test(
    'Логин в портал администратора заблокированным пользователем @allure.id=162',
    { tag: ['@Regress', '@Admin', '@Login'] },
    async ({ adminLoginPage }) => {
      setCredentials(testCredentials.bannedUserEmail);

      await adminLoginPage.login(testCredentials.bannedUserEmail, testCredentials.password);
      await adminLoginPage.validateError(errorMessages.cloud.admin.login.ru.bannedUser);
    },
  );

  test(
    'Логин в портал администратора пользователем @allure.id=161',
    { tag: ['@Smoke', '@Admin', '@Login'] },
    async ({ adminLoginPage }) => {
      setCredentials(testCredentials.employeeEmail);

      await adminLoginPage.login(testCredentials.employeeEmail, testCredentials.password);
      await adminLoginPage.validateError(errorMessages.cloud.admin.login.ru.unauthorized);
    },
  );

  test(
    'Логин в портал администратора с некорректными данными @allure.id=159',
    { tag: ['@Regress', '@Admin', '@Login'] },
    async ({ adminLoginPage }) => {
      setCredentials(testCredentials.incorrectEmail);

      await adminLoginPage.login(testCredentials.incorrectEmail, testCredentials.password);
      await adminLoginPage.validateError(errorMessages.cloud.admin.login.ru.wrongEmailOrPassword);
    },
  );
});
