import { appFixture as test } from '@core/fixtures';
import { eventMtsLinkTopicInfo, eventTopicInfo } from './test-data';
import { getTomorrowDay, calculateTopicDuration } from '@core/helpers';
import { epic, feature, issue } from 'allure-js-commons';

const testCases = [
  {
    name: 'Проверка создания топика с типом "Событие без согласования MTS link" @allure.id=199',
    testData: eventMtsLinkTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Событие без согласования" @allure.id=198',
    testData: eventTopicInfo,
  },
];

testCases.forEach(({ name, testData }) => {
  let topicId: string;
  const { topicType, topicName, startTime, endTime, authors, cost, company } = testData;
  const topicDuration = calculateTopicDuration(startTime!, endTime!);

  test.describe(
    `Создание и проверка топика с типом "${topicName}"`,
    { tag: ['@Smoke', '@Admin', `@${topicType}`] },
    () => {
      test.beforeEach(async ({ createTopicByUI }) => {
        await epic('Панель администратора');
        await feature('Создание и проверка топиков');
        issue('10756');
        topicId = await createTopicByUI(testData);
      });

      test(`${name}`, async ({ adminTopicPage }) => {
        await adminTopicPage.visitTopic(topicId);
        await adminTopicPage.validateBasicTopicInfo(testData, topicId);
        await adminTopicPage.validateAdditionalTopicInfo(testData);
        await adminTopicPage.validateTopicAuthors(authors!);
        await adminTopicPage.validateTopicCost(cost!);
        await adminTopicPage.validateTopicCompany(company!);
        await adminTopicPage.validateTopicEventSchedule(getTomorrowDay(true));
        await adminTopicPage.validateTopicDuration(topicDuration);
      });
    },
  );
});
