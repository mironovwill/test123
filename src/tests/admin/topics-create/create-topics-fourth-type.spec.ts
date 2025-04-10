import { appFixture as test } from '@core/fixtures';
import { podcastTopicInfo, videoTopicInfo } from './test-data';
import { epic, feature } from 'allure-js-commons';

const testCases = [
  {
    name: 'Проверка создания топика с типом "Видео" @allure.id=169',
    testData: videoTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Подкаст" @allure.id=171',
    testData: podcastTopicInfo,
  },
];

testCases.forEach(({ name, testData }) => {
  let topicId: string;
  const { topicType, durationH, durationM, authors, company } = testData;

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
        await adminTopicPage.validateTopicCompany(company!);
        await adminTopicPage.validateTopicDuration(durationH!, durationM!);
      });
    },
  );
});
