import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import { articleTopicInfo, infographicTopicInfo, pollTopicInfo, testTopicInfo } from './test-data';

const testCases = [
  {
    name: 'Проверка создания топика с типом "Статья" @allure.id=169',
    testData: articleTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Тест" @allure.id=170',
    testData: testTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Инфографика" @allure.id=171',
    testData: infographicTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Опрос" @allure.id=172',
    testData: pollTopicInfo,
  },
];

testCases.forEach(({ name, testData }) => {
  let topicId: string;
  const { topicType, authors, year, durationH, durationM } = testData;

  test.describe(
    `Создание и проверка топика с типом "${topicType}"`,
    { tag: ['@Regress', '@Admin', `@${topicType}`] },
    () => {
      test.beforeEach(async ({ createTopicByUI }) => {
        await epic('Панель администратора');
        await feature('Создание и проверка топиков');
        topicId = await createTopicByUI(testData);
      });

      test(`${name}`, async ({ adminTopicPage }) => {
        await adminTopicPage.visitTopic(topicId);
        await adminTopicPage.validateBasicTopicInfo(testData, topicId);
        await adminTopicPage.validateAdditionalTopicInfo(testData);
        await adminTopicPage.validateTopicAuthors(authors!);
        await adminTopicPage.validateTopicYear(year!);
        await adminTopicPage.validateTopicDuration(durationH!, durationM!);
      });
    },
  );
});
