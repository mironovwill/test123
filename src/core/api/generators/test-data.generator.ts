import { AdminApiClient } from '@core/api/clients/admin.client';
import {
  certificateGenerator,
  rewardGenerator,
  departmentGenerator,
  functionGenerator,
  authorGenerator,
} from '@core/api/generators';

/**
 * Генерирует и создает начальные структуры данных (функции, отделы, награды, сертификаты, авторы).
 * @param adminApiClient - Клиент для работы с административным API.
 * @returns Объект с созданными структурами:
 * - `functionInternal`: Созданная функция.
 * - `department`: Созданный отдел.
 * - `reward`: Созданная награда.
 * - `certificate`: Созданный сертификат.
 * - `author`: Созданный автор.
 */

export const generateTestData = async (adminApiClient: AdminApiClient) => {
  const [template] = await adminApiClient.getCertificateTemplates();
  const templateId = template.id;

  const [
    functionInternal,
    department,
    reward,
    certificate,
    author,
    topicCategories,
    authors,
    levels,
    languages,
    bookAddress,
    tags,
    skills,
  ] = await Promise.all([
    adminApiClient.createFunction(functionGenerator()),
    adminApiClient.createDepartment(departmentGenerator()),
    adminApiClient.createReward(rewardGenerator()),
    adminApiClient.createCertificate(certificateGenerator(+templateId)),
    adminApiClient.createAuthor(authorGenerator()),
    adminApiClient.getTopicCategories(),
    adminApiClient.getAuthors(),
    adminApiClient.getTopicLevels(),
    adminApiClient.getLanguages(),
    adminApiClient.getBooksAddress(),
    adminApiClient.getTags(),
    adminApiClient.getSkills(),
  ]);

  return {
    functionInternal,
    department,
    reward,
    certificate,
    author,
    topicCategories,
    authors,
    levels,
    languages,
    bookAddress,
    tags,
    skills,
  };
};
