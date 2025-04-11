import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import {
  mixQuestionsTestLearning,
  timeoutTestLearning,
  mixAnswersTestLearning,
  allowAnswersTestLearning,
  openTestTestLearning,
  pollTestLearning,
  twoAnswersTestLearning,
} from './learnings';

import testData from '@test-data';

const testCases = [
  {
    name: 'Проверка создания и валидации теста с таймаутом',
    testCaseData: timeoutTestLearning,
  },
  {
    name: 'Проверка создания и валидации теста с перемешиванием ответов',
    testCaseData: mixAnswersTestLearning,
  },
  {
    name: 'Проверка создания и валидации теста с перемешиванием вопросов',
    testCaseData: mixQuestionsTestLearning,
  },
  {
    name: 'Проверка создания и валидации теста с ограничением количества прохождений',
    testCaseData: allowAnswersTestLearning,
  },
  {
    name: 'Проверка создания и валидации теста с опросом',
    testCaseData: pollTestLearning,
  },
  {
    name: 'Проверка создания и валидации теста с открытым ответом',
    testCaseData: openTestTestLearning,
  },
  {
    name: 'Проверка создания и валидации теста с несколькими правильными ответами',
    testCaseData: twoAnswersTestLearning,
  },
];

testCases.forEach(({ name, testCaseData }) => {
  test.describe(
    'Проверка изучения с типом "Тест"',
    { tag: ['@Smoke', '@Admin', '@Изучения', '@Тест'] },
    () => {
      const { blockPlanName, blockPlanType } = testCaseData;
      const topicId = String(testData.topics.bookTopic.id);

      test.beforeEach(async ({ createBlockPlanByUI }) => {
        await epic('Панель администратора');
        await feature('Создание и проверка изучений в портале администратора');
        await createBlockPlanByUI(blockPlanName, blockPlanType, topicId);
      });

      test(`${name}`, async ({ adminTopicPage, adminTopicLearningPage }) => {
        await test.step('Создание теста', async () => {
          await adminTopicPage.visitTopicLearningTab(topicId);
          await adminTopicLearningPage.clickToBlockPlanByName(blockPlanName);
          await adminTopicLearningPage.testFields.fillTestOptions(testCaseData);
          await adminTopicLearningPage.testFields.createTest(testCaseData.test);
          await adminTopicLearningPage.clickToSavePlanByName(blockPlanName);
        });

        await test.step('Проверка сохранения настроек теста', async () => {
          await adminTopicPage.visitTopicLearningTab(topicId);
          await adminTopicLearningPage.clickToBlockPlanByName(blockPlanName);
          await adminTopicLearningPage.testFields.validateTestOptions(testCaseData);
          await adminTopicLearningPage.testFields.validateTestBlock(testCaseData.test);
        });
      });
    },
  );
});
