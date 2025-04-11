import { generateTestData, userGenerator, generateUsers } from '@core/api/generators';
import { AdminApiClient } from '@core/api/clients/admin.client';
import { writeTestData } from '@core/helpers';
import { generateTopicsTestData } from '@core/api/generators/topics-test-data.generator';

const PATCH = 'src/config/test-data.json';

export async function bootstrapTestData() {
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
  const initialTopics = await generateTopicsTestData(adminApiClient);

  const testData = {
    structures: initialStructures,
    users: await generateUsers(adminApiClient, {
      department: initialStructures.department.id,
      function: initialStructures.functionInternal.name,
      position: +initialStructures.reward.id,
      managerId: superadminId,
    }),
    topics: {
      ...initialTopics,
    },
  };

  // Блокировка тестового пользователя
  await adminApiClient.lockUserLogin(testData.users.bannedUser.id);

  // Сохранение тестовых данных в отдельный файл
  await writeTestData(testData, PATCH);
}
