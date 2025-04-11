import { epic, feature } from 'allure-js-commons';
import { appFixture as test } from '@core/fixtures';
import { articleLearning, checklistLearning, fileLearning } from './learnings';
import testData from '@test-data';

test.describe(
  'Создание и проверка изучений в портале администратора',
  { tag: ['@Smoke', '@Admin', '@Изучения'] },
  () => {
    const topicId = String(testData.topics.bookTopic.id);

    test('Проверка создания и валидации изучения с типом - "Статья" @allure.id=208', async ({
      createBlockPlanByUI,
      adminTopicPage,
      adminTopicLearningPage,
    }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка изучений в портале администратора');

      const { blockPlanName, blockPlanType } = articleLearning;
      await createBlockPlanByUI(blockPlanName, blockPlanType, topicId);

      await adminTopicLearningPage.articleFields.fillArticleInput(articleLearning.articleValue);
      await adminTopicLearningPage.clickToSavePlanByName(articleLearning.blockPlanName);
      await adminTopicPage.visitTopicLearningTab(topicId);
      await adminTopicLearningPage.clickToBlockPlanByName(articleLearning.blockPlanName);
      await adminTopicLearningPage.articleFields.validateArticleValue(articleLearning.articleValue);
    });

    test('Проверка создания и валидации изучения с типом - "Файл" @allure.id=210', async ({
      createBlockPlanByUI,
      adminTopicPage,
      adminTopicLearningPage,
    }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка изучений в портале администратора');

      const { blockPlanName, blockPlanType } = fileLearning;
      await createBlockPlanByUI(blockPlanName, blockPlanType, topicId);

      await adminTopicLearningPage.filesFields.fillFileBlock(
        fileLearning.description,
        fileLearning.files,
      );
      await adminTopicLearningPage.clickToSavePlanByName(fileLearning.blockPlanName);
      await adminTopicPage.visitTopicLearningTab(topicId);
      await adminTopicLearningPage.clickToBlockPlanByName(fileLearning.blockPlanName);
      await adminTopicLearningPage.filesFields.validateFilesBlockPlan(
        fileLearning.description,
        fileLearning.files.length,
      );
    });

    test('Проверка создания и валидации изучения с типом - "Чек-лист" @allure.id=209', async ({
      createBlockPlanByUI,
      adminTopicPage,
      adminTopicLearningPage,
    }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка изучений в портале администратора');

      const { blockPlanName, blockPlanType } = checklistLearning;
      await createBlockPlanByUI(blockPlanName, blockPlanType, topicId);

      await adminTopicLearningPage.checklistFields.fillChecklist(
        checklistLearning.description,
        checklistLearning.firstItemValue,
        checklistLearning.secondItemValue,
      );
      await adminTopicLearningPage.clickToSavePlanByName(checklistLearning.blockPlanName);
      await adminTopicPage.visitTopicLearningTab(topicId);
      await adminTopicLearningPage.clickToBlockPlanByName(checklistLearning.blockPlanName);
      await adminTopicLearningPage.checklistFields.validateChecklist(
        checklistLearning.description,
        checklistLearning.firstItemValue,
        checklistLearning.secondItemValue,
      );
    });
  },
);
