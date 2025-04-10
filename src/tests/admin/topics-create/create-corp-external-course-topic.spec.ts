import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import {
  fullTimeExternalCourseTopicInfo,
  fullTimeCorporateCourseTopicInfo,
  onlineExternalCourseTopicInfo,
  onlineCorporateCourseTopicInfo,
} from './test-data';

const testCases = [
  {
    name: 'Проверка создания топика с типом "Онлайн внешний курс" @allure.id=189',
    testData: onlineExternalCourseTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Очный внешний курс" @allure.id=197',
    testData: fullTimeExternalCourseTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Очный корп. курс" @allure.id=188',
    testData: fullTimeCorporateCourseTopicInfo,
  },
  {
    name: 'Проверка создания топика с типом "Онлайн корп. курс" @allure.id=193',
    testData: onlineCorporateCourseTopicInfo,
  },
];

testCases.forEach(({ name, testData }) => {
  const { topicType, topicName, type, authors, company, place } = testData;
  let topicId: string;

  test.describe(
    `Создание и проверка топика с типом "${topicName}"`,
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
        //TODO: стиль

        if (type === 'Онлайн' && place) await adminTopicPage.validateMeetPlace(place);
      });
    },
  );
});
