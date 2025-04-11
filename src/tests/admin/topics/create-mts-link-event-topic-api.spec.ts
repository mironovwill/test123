import { appFixture as test } from '@core/fixtures';
import { calculateTopicDuration } from '@core/helpers';
import { epic, feature, issue } from 'allure-js-commons';
import { TopicTypes, EventTopic } from '@core/types';
import { getTomorrowDay } from '@core/helpers';
import testData from '@test-data';

test.describe(
  `Создание и проверка топика с типом "Событие" с MTS Link @allure.id=198`,
  { tag: ['@Smoke', '@Admin', '@Событие'] },
  () => {
    const topicId = String(testData.topics.eventMtsLinkTopic.id);

    const eventMtsLinkTopicInfo = {
      topicName: testData.topics.eventMtsLinkTopic.name,
      description: testData.topics.eventMtsLinkTopic.description,
      topicType: TopicTypes.EVENT,
      categories: testData.topics.eventMtsLinkTopic.categories.map(category => category.name),
      language: testData.topics.eventMtsLinkTopic.language.name,
      level: testData.topics.eventMtsLinkTopic.level.name,
      cost: String(testData.topics.eventMtsLinkTopic.cost),
      authors: testData.topics.eventMtsLinkTopic.authors.map(author => author.name),
      company: testData.topics.eventMtsLinkTopic.publisher,
      startTime: testData.topics.eventMtsLinkTopic.startTime,
      endTime: testData.topics.eventMtsLinkTopic.endTime,
      links: testData.topics.eventMtsLinkTopic.links.map(link => link.name),
    } as EventTopic;

    const topicDuration = calculateTopicDuration(
      testData.topics.eventMtsLinkTopic.startTime!,
      testData.topics.eventMtsLinkTopic.endTime!,
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
      await adminTopicPage.validateBasicTopicInfo(eventMtsLinkTopicInfo, topicId);
      await adminTopicPage.validateAdditionalTopicInfo(eventMtsLinkTopicInfo);
      await adminTopicPage.validateTopicAuthors(eventMtsLinkTopicInfo.authors!);
      await adminTopicPage.validateTopicCost(eventMtsLinkTopicInfo.cost!);
      await adminTopicPage.validateTopicCompany(eventMtsLinkTopicInfo.company!);
      await adminTopicPage.validateTopicEventSchedule(getTomorrowDay({ formattedDate: true }));
      await adminTopicPage.validateTopicDuration(topicDuration);
    });
  },
);
