import 'dotenv/config';
import { test as base } from '@playwright/test';
import { UserCollectionTopicsPage, UserLoginPage } from '@core/page-object/pages/user';
import { epic, feature, parameter } from 'allure-js-commons';
import { errorMessages } from '@core/helpers/constants';
import testData from 'src/config/test-data.json';

const testUsers = {
  banned: testData.users.bannedUser,
  admin: testData.users.admin,
  manager: testData.users.manager,
  employee: testData.users.user,
  incorrectEmail: 'random@gmail.com',
};

interface LoginFixtures {
  userLoginPage: UserLoginPage;
  userCollectionTopicsPage: UserCollectionTopicsPage;
}

const test = base.extend<LoginFixtures>({
  userLoginPage: async ({ page }, use) => {
    const userLoginPage = new UserLoginPage(page);
    await userLoginPage.visit('/');
    await use(userLoginPage);
  },
  userCollectionTopicsPage: async ({ page }, use) => {
    const userCollectionTopicsPage = new UserCollectionTopicsPage(page);
    await use(userCollectionTopicsPage);
  },
});

test.use({ storageState: { cookies: [], origins: [] } });

const setCredentials = (login: string) => parameter('Логин', login);

test.describe('Логин в портал пользователя', () => {
  test.beforeEach(async () => {
    await epic('Портал пользователя');
    await feature('Логин');
  });

  test(
    'Логин в портал пользователя заблокированным пользователем @allure.id=184',
    { tag: ['@Regress', '@User', '@Login'] },
    async ({ userLoginPage }) => {
      await setCredentials(testUsers.banned.email);

      await userLoginPage.login(testUsers.banned.email, process.env.TEST_USER_PASSWORD!);
      await userLoginPage.validateError(errorMessages.cloud.user.login.ru.bannedUser);
    },
  );

  test(
    'Логин в портал пользователя под администратором @allure.id=182',
    { tag: ['@Smoke', '@User', '@Login'] },
    async ({ userLoginPage, userCollectionTopicsPage }) => {
      await setCredentials(testUsers.admin.email);

      await userLoginPage.login(testUsers.admin.email, process.env.TEST_USER_PASSWORD!);
      await userCollectionTopicsPage.validateH1Text();
    },
  );

  test(
    'Логин в портал пользователя под пользователем @allure.id=185',
    { tag: ['@Smoke', '@User', '@Login'] },
    async ({ userLoginPage, userCollectionTopicsPage }) => {
      await setCredentials(testUsers.employee.email);

      await userLoginPage.login(testUsers.employee.email, process.env.TEST_USER_PASSWORD!);
      await userCollectionTopicsPage.validateH1Text();
    },
  );

  test(
    'Логин в портал пользователя с некорректными данными @allure.id=181',
    { tag: ['@Regress', '@User', '@Login'] },
    async ({ userLoginPage }) => {
      await setCredentials(testUsers.incorrectEmail);

      await userLoginPage.login(testUsers.incorrectEmail, process.env.TEST_USER_PASSWORD!);
      await userLoginPage.validateError(errorMessages.cloud.user.login.ru.wrongEmailOrPassword);
    },
  );

  test(
    'Логин в портал пользователя под руководителем @allure.id=186',
    { tag: ['@Smoke', '@User', '@Login'] },
    async ({ userLoginPage, userCollectionTopicsPage }) => {
      await setCredentials(testUsers.manager.email);

      await userLoginPage.login(testUsers.manager.email, process.env.TEST_USER_PASSWORD!);
      await userCollectionTopicsPage.validateH1Text();
    },
  );
});
