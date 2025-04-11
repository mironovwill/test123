import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import testData from '@test-data';
import { ApplicationTopic, TopicTypes } from '@core/types';

test.describe(
  'Создание и проверка топика с типом "Приложение"',
  { tag: ['@Smoke', '@Admin', '@Приложение'] },
  () => {
    const topicId = String(testData.topics.applicationTopic.id);

    const applicationTopicInfo = {
      topicName: testData.topics.applicationTopic.name,
      description: testData.topics.applicationTopic.description,
      topicType: TopicTypes.APPLICATION,
      categories: testData.topics.applicationTopic.categories.map(category => category.name),
      language: testData.topics.applicationTopic.language.name,
      level: testData.topics.applicationTopic.level.name,
      cost: String(testData.topics.applicationTopic.cost),
      durationH: String(testData.topics.applicationTopic.duration / 60),
    } as ApplicationTopic;

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      await adminTopicPage.visitTopic(topicId);
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
        await adminTopicPage.validateTopicDuration(applicationTopicInfo.durationH);
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
