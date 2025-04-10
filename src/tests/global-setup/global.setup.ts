import 'dotenv/config';
import { chromium } from '@playwright/test';
import { bootstrapTestData } from '@core/helpers';

export async function globalSetup() {
  console.log(`Подготовка окружения для тестов... 🧪`);

  const errorMessage =
    '⛔️ Необходимо установить переменные окружения: KAMPUS_ADMIN_BASE_URL, TEST_USER_SUPERADMIN_EMAIL, TEST_USER_PASSWORD, KAMPUS_USER_BASE_URL ⛔️';

  const {
    KAMPUS_ADMIN_BASE_URL,
    TEST_USER_SUPERADMIN_EMAIL,
    TEST_USER_PASSWORD,
    KAMPUS_USER_BASE_URL,
  } = process.env;

  if (
    !KAMPUS_ADMIN_BASE_URL ||
    !TEST_USER_SUPERADMIN_EMAIL ||
    !TEST_USER_PASSWORD ||
    !KAMPUS_USER_BASE_URL
  ) {
    throw new Error(errorMessage);
  }

  const browser = await chromium.launch();
  const adminPage = await browser.newPage();

  const selectors = {
    emailInput: '[data-qa="loginUsernameInput"]',
    passwordInput: '[data-qa="loginPasswordInput"]',
    loginBtn: '[data-qa="loginBtn"]',
    adminTopicsH1: '[data-qa="topicsH1"]',
    userCollectionTopicH1: '[data-qa="userCollectionTopicH1"]',
  };

  await adminPage.goto(KAMPUS_ADMIN_BASE_URL, { waitUntil: 'domcontentloaded' });
  await adminPage.locator(selectors.emailInput).fill(TEST_USER_SUPERADMIN_EMAIL);
  await adminPage.locator(selectors.passwordInput).fill(TEST_USER_PASSWORD);
  await adminPage.locator(selectors.loginBtn).click();
  await adminPage.locator(selectors.adminTopicsH1).waitFor({ state: 'visible' });
  await adminPage.context().storageState({ path: '.auth/admin.json' });

  const token = await adminPage.evaluate(() => {
    return localStorage.getItem('authorizationToken');
  });

  if (!token) {
    throw new Error('⛔️ Не удалось получить токен авторизации! ⛔️');
  }

  process.env.BEARER_TOKEN = token;

  const userPage = await browser.newPage();

  await userPage.goto(KAMPUS_USER_BASE_URL, { waitUntil: 'domcontentloaded' });
  await userPage.locator(selectors.emailInput).fill(TEST_USER_SUPERADMIN_EMAIL);
  await userPage.locator(selectors.passwordInput).fill(TEST_USER_PASSWORD);
  await userPage.locator(selectors.loginBtn).click();
  await userPage.locator(selectors.userCollectionTopicH1).waitFor({ state: 'visible' });
  await userPage.context().storageState({ path: '.auth/user.json' });

  await browser.close();

  await bootstrapTestData();
}

export default globalSetup;
