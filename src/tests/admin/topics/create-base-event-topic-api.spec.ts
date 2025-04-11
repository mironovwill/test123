import { appFixture as test } from '@core/fixtures';
import { calculateTopicDuration, getTomorrowDay } from '@core/helpers';
import { epic, feature } from 'allure-js-commons';
import { TopicTypes, EventTopic } from '@core/types';
import testData from '@test-data';

test.describe(
  `Создание и проверка топика с типом "Событие" без согласования @allure.id=198`,
  { tag: ['@Smoke', '@Admin', '@Событие'] },
  () => {
    const topicId = String(testData.topics.baseEventTopic.id);

    const baseEventTopic = {
      topicName: testData.topics.baseEventTopic.name,
      description: testData.topics.baseEventTopic.description,
      topicType: TopicTypes.EVENT,
      categories: testData.topics.baseEventTopic.categories.map(category => category.name),
      language: testData.topics.baseEventTopic.language.name,
      level: testData.topics.baseEventTopic.level.name,
      cost: String(testData.topics.baseEventTopic.cost),
      authors: testData.topics.baseEventTopic.authors.map(author => author.name),
      company: testData.topics.baseEventTopic.publisher,
      startTime: testData.topics.baseEventTopic.startTime,
      endTime: testData.topics.baseEventTopic.endTime,
      links: testData.topics.baseEventTopic.links.map(link => link.url),
    } as EventTopic;

    const topicDuration = calculateTopicDuration(
      testData.topics.baseEventTopic.startTime!,
      testData.topics.baseEventTopic.endTime!,
    );

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      await adminTopicPage.visitTopic(topicId);
    });

    test(`Создание и проверка топика с типом "Событие" без согласования @allure.id=198`, async ({
      adminTopicPage,
    }) => {
      await adminTopicPage.validateBasicTopicInfo(baseEventTopic, topicId);
      await adminTopicPage.validateAdditionalTopicInfo(baseEventTopic);
      await adminTopicPage.validateTopicAuthors(baseEventTopic.authors!);
      await adminTopicPage.validateTopicCost(baseEventTopic.cost);
      await adminTopicPage.validateTopicCompany(baseEventTopic.company!);
      await adminTopicPage.validateTopicEventSchedule(getTomorrowDay({ formattedDate: true }));
      await adminTopicPage.validateTopicDuration(topicDuration);
    });
  },
);
