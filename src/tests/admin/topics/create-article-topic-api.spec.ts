import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import { TopicTypes, ArticleTopic } from '@core/types';
import testData from '@test-data';

test.describe(
  `Проверка создания топика с типом "Статья" @allure.id=169`,
  { tag: ['@Regress', '@Admin', '@Статья'] },
  () => {
    const topicId = String(testData.topics.articleTopic.id);
    const articleTopicInfo = {
      topicName: testData.topics.articleTopic.name,
      description: testData.topics.articleTopic.description,
      topicType: TopicTypes.ARTICLE,
      categories: testData.topics.articleTopic.categories.map(category => category.name),
      level: testData.topics.articleTopic.level.name,
      language: testData.topics.articleTopic.language.name,
      skills: testData.topics.articleTopic.skills.map(skill => skill.name),
      tags: testData.topics.articleTopic.tags.map(tag => tag.name),
      links: testData.topics.articleTopic.links.map(link => link.url),
      authors: testData.topics.articleTopic.authors.map(author => author.name),
      year: testData.topics.articleTopic.issued.slice(0, 4),
      durationH: String(testData.topics.articleTopic.duration / 60),
    } as ArticleTopic;

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      await adminTopicPage.visitTopic(topicId);
    });

    test(`Проверка топика с типом "Статья" @allure.id=169`, async ({ adminTopicPage }) => {
      await adminTopicPage.validateBasicTopicInfo(articleTopicInfo, topicId);
      await adminTopicPage.validateAdditionalTopicInfo(articleTopicInfo);
      await adminTopicPage.validateTopicAuthors(articleTopicInfo.authors!);
      await adminTopicPage.validateTopicYear(articleTopicInfo.year!);
      await adminTopicPage.validateTopicDuration(articleTopicInfo.durationH!);
    });
  },
);
