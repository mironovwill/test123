import { appFixture as test } from '@core/fixtures';
import { pdfLearning, scormLearning, videoLearning } from './learnings';
import { epic, feature } from 'allure-js-commons';
import testData from '@test-data';

const testCases = [
  {
    name: 'Проверка создания и валидации изучения с типом - "Видео" @allure.id=206',
    testCaseData: videoLearning,
  },
  {
    name: 'Проверка создания и валидации изучения с типом - "SCORM" @allure.id=205',
    testCaseData: scormLearning,
  },
  {
    name: 'Проверка создания и валидации изучения с типом - "Презентация" @allure.id=207',
    testCaseData: pdfLearning,
  },
];

testCases.forEach(({ name, testCaseData }) => {
  const { blockPlanName, blockPlanType, file } = testCaseData;
  const topicId = String(testData.topics.bookTopic.id);

  test.describe(
    'Создание и проверка файловых изучений в портале администратора',
    { tag: ['@Smoke', '@Admin', '@Изучения', `@${blockPlanType}`] },
    () => {
      test.beforeEach(async ({ createBlockPlanByUI }) => {
        await epic('Панель администратора');
        await feature('Создание и проверка изучений в портале администратора');
        await createBlockPlanByUI(blockPlanName, blockPlanType, topicId);
      });

      test(`${name}`, async ({ adminTopicPage, adminTopicLearningPage }) => {
        await adminTopicLearningPage.uploadFiles(file);
        await adminTopicLearningPage.clickToSavePlanByName(blockPlanName);
        await adminTopicPage.visitTopicLearningTab(topicId);
        await adminTopicLearningPage.clickToBlockPlanByName(blockPlanName);
        await adminTopicLearningPage.validateFileName(blockPlanName, file);
      });
    },
  );
});
