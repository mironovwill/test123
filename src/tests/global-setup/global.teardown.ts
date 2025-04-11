import 'dotenv/config';
import { AdminApiClient } from '@core/api/clients/admin.client';
import testData from '@test-data';

export default async function globalTeardown() {
  const adminApiClient = new AdminApiClient();

  // Удаление пользователей
  const users = Object.values(testData.users);
  for (const user of users) {
    try {
      await adminApiClient.lockUserLogin(user.id);
      console.log(`👤➡️🔒 Пользователь ${user.email} заблокирован`);
    } catch (error) {
      console.error(`👤❌ Ошибка при удалении пользователя ${user.email}:`, error);
    }
  }

  // Удаление сертификата
  try {
    await adminApiClient.deleteCertificateById(+testData.structures.certificate.id);
    console.log(`📜➡️🗑️ Сертификат успешно удален`);
  } catch (error) {
    console.error(
      `📜❌ Ошибка при удалении сертификата ${testData.structures.certificate.name}:`,
      error,
    );
  }

  // Удаление награды
  try {
    await adminApiClient.deleteRewardById(testData.structures.reward.id);
    console.log(`🏅➡️🗑️ Награда успешно удалена`);
  } catch (error) {
    console.error(`🏅❌ Ошибка при удалении награды ${testData.structures.reward.name}:`, error);
  }

  // Удаление департамента
  try {
    await adminApiClient.deleteDepartmentById(testData.structures.department.id);
    console.log(`🏢➡️🗑️ Департамент успешно удален`);
  } catch (error) {
    console.error(
      `🏢❌ Ошибка при удалении департамента ${testData.structures.department.name}:`,
      error,
    );
  }

  // Удаление функции
  try {
    await adminApiClient.deleteFunctionById(testData.structures.functionInternal.id);
    console.log(`⚙️➡️🗑️ Функция удалена`);
  } catch (error) {
    console.error(`⚙️❌ Ошибка при удалении функции:`, error);
  }

  // Удаление автора
  try {
    await adminApiClient.deleteAuthor(testData.structures.author.id);
    console.log(`👨💻➡️🗑️ Автор удален`);
  } catch (error) {
    console.error(`👨💻❌ Ошибка при удалении автора:`, error);
  }

  try {
    await Promise.all(
      testData.topics.topicsIds.map(async topicId => {
        await adminApiClient.deleteTopicById(topicId);
        console.log(`📚➡️🗑️ Топик с id:${topicId} удален`);
      }),
    );
  } catch (error) {
    console.error(`📚❌ Ошибка при удалении топика:`, error);
  }

  // Удаление файла с тестовыми данными
  // try {
  //   const filePath = 'src/tests/test-data.json';
  //   await fs.unlink(filePath);
  //   console.log(`📁➡️🗑️ Файл удален`);
  // } catch (error) {
  //   console.error(`📁❌ Ошибка при удалении файла:`, error);
  // }
}
