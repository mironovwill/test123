import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { AdminLoginPage, AdminTopicsPage } from '@core/page-object/pages/admin';
import { test as setup } from '@playwright/test';
import { AdminApiClient } from '@core/api/clients/admin.client';
import { generateUsers, generateTestData, userGenerator } from '@core/api/generators';

setup('admin global setup', async ({ page }): Promise<void> => {
  // Проверка переменных окружения
  const { KAMPUS_ADMIN_BASE_URL, TEST_USER_SUPERADMIN_EMAIL, TEST_USER_PASSWORD } = process.env;

  if (!KAMPUS_ADMIN_BASE_URL || !TEST_USER_SUPERADMIN_EMAIL || !TEST_USER_PASSWORD) {
    throw new Error(
      'Необходимо установить переменные окружения: KAMPUS_ADMIN_BASE_URL, TEST_USER_SUPERADMIN_EMAIL, TEST_USER_PASSWORD',
    );
  }

  // Авторизация в портал администратора
  const adminLoginPage = new AdminLoginPage(page);
  const adminTopicsPage = new AdminTopicsPage(page);

  await adminLoginPage.visit('/');
  await adminLoginPage.login(TEST_USER_SUPERADMIN_EMAIL, TEST_USER_PASSWORD);
  await adminTopicsPage.validateH1Text();
  await adminTopicsPage.header.clickRedirectToUserPartBtn({ saveState: true });

  // Получение и сохранение токена
  const token = await adminTopicsPage.page.evaluate(() => {
    return localStorage.getItem('authorizationToken');
  });

  if (!token) {
    throw new Error('Не удалось получить токен авторизации');
  }

  process.env.BEARER_TOKEN = token;

  // Сохранение состояния авторизации в портал администратора
  await page.context().storageState({ path: '.auth/admin.json' });

  await prepareTestData();
});

async function saveTestData(data: object, filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
  console.log(`🎉🚀 Ура! Тестовые данные успешно сохранены!`);
}

async function prepareTestData() {
  const adminApiClient = new AdminApiClient();

  // Создание суперадмина
  const superAdminData = userGenerator({ roleId: 1 });
  const createdSuperAdmin = await adminApiClient.createUser(superAdminData);

  const { id: superadminId, login: superadminEmail } = createdSuperAdmin;

  // Сохранение учетных данных суперадмина
  process.env.TEST_USER_SUPERADMIN_EMAIL = superadminEmail;
  process.env.TEST_USER_PASSWORD = superAdminData.password;

  // Получение токена суперадмина
  const { accessToken: superadminToken } = await adminApiClient.login({
    username: superadminEmail,
    password: superAdminData.password,
  });

  process.env.BEARER_TOKEN = superadminToken;

  // Создание структур и пользователей
  const initialStructures = await generateTestData(adminApiClient);
  const testData = {
    structures: initialStructures,
    users: await generateUsers(adminApiClient, {
      department: initialStructures.department.id,
      function: initialStructures.functionInternal.name,
      position: +initialStructures.reward.id,
      managerId: superadminId,
    }),
  };

  // Блокировка тестового пользователя
  await adminApiClient.lockUserLogin(testData.users.bannedUser.id);

  // Сохранение тестовых данных в отдельный файл
  await saveTestData(testData, 'src/config/test-data.json');
}
