import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import { applicationTopicInfo } from './test-data/application.test-data';

test.describe(
  'Создание и проверка топика с типом "Приложение"',
  { tag: ['@Smoke', '@Admin', '@Приложение'] },
  () => {
    let topicId: string;

    test.beforeEach(async ({ createTopicByUI }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      topicId = await createTopicByUI(applicationTopicInfo);
    });

    test('Создание и проверка топика с типом "Приложение" @allure.id=173', async ({
      adminTopicPage,
      adminTopicsPage,
    }) => {
      await test.step('Проверка основной информации топика', async () => {
        await adminTopicPage.visitTopic(topicId);
        await adminTopicPage.validateBasicTopicInfo(applicationTopicInfo, topicId);
        await adminTopicPage.validateAdditionalTopicInfo(applicationTopicInfo);
        await adminTopicPage.validateTopicCost(applicationTopicInfo.cost);
        await adminTopicPage.validateTopicDuration(
          applicationTopicInfo.durationH,
          applicationTopicInfo.durationM,
        );
      });

      await test.step('Проверка поиска созданного топика', async () => {
        await adminTopicsPage.visit();
        await adminTopicsPage.searchTopicByName(applicationTopicInfo.topicName);
        await adminTopicsPage.validateFirstTopicCardName(applicationTopicInfo.topicName);
        await adminTopicsPage.validateFirstTopicLink(topicId);
        await adminTopicsPage.clickFirstTopicCard();
        await adminTopicPage.validateTopicUrl(topicId);
        await adminTopicPage.validateH1Text(applicationTopicInfo.topicName);
      });
    });
  },
);
