import { appFixture as test } from '@core/fixtures';
import { calculateTopicDuration } from '@core/helpers';
import { epic, feature, issue } from 'allure-js-commons';
import { TopicTypes, EventTopic } from '@core/types';
import testData from '@test-data';

test.describe(
  `Создание и проверка топика с типом "Событие" с согласованием @allure.id=198`,
  { tag: ['@Smoke', '@Admin', '@Событие'] },
  () => {
    const topicId = String(testData.topics.eventWithValidationTopic.id);

    const eventWithValidationTopicInfo = {
      topicName: testData.topics.eventWithValidationTopic.name,
      description: testData.topics.eventWithValidationTopic.description,
      topicType: TopicTypes.EVENT,
      categories: testData.topics.eventWithValidationTopic.categories.map(
        category => category.name,
      ),
      language: testData.topics.eventWithValidationTopic.language.name,
      level: testData.topics.eventWithValidationTopic.level.name,
      cost: String(testData.topics.eventWithValidationTopic.cost),
      authors: testData.topics.eventWithValidationTopic.authors.map(author => author.name),
      company: testData.topics.eventWithValidationTopic.publisher,
      startTime: testData.topics.eventWithValidationTopic.startTime,
      endTime: testData.topics.eventWithValidationTopic.endTime,
      links: testData.topics.eventWithValidationTopic.links.map(link => link.url),
    } as EventTopic;

    const topicDuration = calculateTopicDuration(
      testData.topics.eventWithValidationTopic.startTime!,
      testData.topics.eventWithValidationTopic.endTime!,
    );

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      issue('10756');
      await adminTopicPage.visitTopic(topicId);
    });

    test(`Создание и проверка топика с типом "Событие" c согласованием @allure.id=198`, async ({
      adminTopicPage,
    }) => {
      await adminTopicPage.validateBasicTopicInfo(eventWithValidationTopicInfo, topicId);
      await adminTopicPage.validateTopicInternalUseText();
      await adminTopicPage.validateTopicAuthors(eventWithValidationTopicInfo.authors!);
      await adminTopicPage.validateTopicLinks(eventWithValidationTopicInfo.links!);
      await adminTopicPage.validateTopicCost(eventWithValidationTopicInfo.cost!);
      await adminTopicPage.validateTopicCompany(eventWithValidationTopicInfo.company!);
      await adminTopicPage.validateTopicDuration(topicDuration);
    });
  },
);
