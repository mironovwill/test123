import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import testData from '@test-data';
import { BookTopic, TopicTypes } from '@core/types';

test.describe(
  'Создание и проверка топика с типом "Книга"',
  { tag: ['@Regress', '@Admin', '@Книга'] },
  () => {
    const topicId = String(testData.topics.bookTopic.id);
    const bookTopicInfo = {
      topicName: testData.topics.bookTopic.name,
      description: testData.topics.bookTopic.description,
      topicType: TopicTypes.BOOK,
      categories: testData.topics.bookTopic.categories.map(category => category.name),
      level: testData.topics.bookTopic.level.name,
      language: testData.topics.bookTopic.language.name,
      skills: testData.topics.bookTopic.skills.map(skill => skill.name),
      tags: testData.topics.bookTopic.tags.map(tag => tag.name),
      links: testData.topics.bookTopic.links.map(link => link.url),
      authors: testData.topics.bookTopic.authors.map(author => author.name),
      bookPublisher: testData.topics.bookTopic.publisher,
      paper: testData.topics.bookTopic.qiwiLibrary,
      cost: String(testData.topics.bookTopic.cost),
      year: String(testData.topics.bookTopic.issued.slice(0, 4)),
      durationH: String(testData.topics.bookTopic.duration / 60),
    } as BookTopic;

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      await adminTopicPage.visitTopic(topicId);
    });

    test('Проверка топика с типом "Книга" @allure.id=174', async ({ adminTopicPage }) => {
      await test.step('Проверка основной информации топика', async () => {
        await adminTopicPage.validateBasicTopicInfo(bookTopicInfo, topicId);
        await adminTopicPage.validateAdditionalTopicInfo(bookTopicInfo);
        await adminTopicPage.validateTopicAuthors(bookTopicInfo.authors!);
        await adminTopicPage.validateTopicPublisher(bookTopicInfo.bookPublisher!);
        await adminTopicPage.validateBookInPaper(bookTopicInfo.paper!);
        await adminTopicPage.validateTopicCost(bookTopicInfo.cost!);
        await adminTopicPage.validateTopicYear(bookTopicInfo.year!);
        await adminTopicPage.validateTopicDuration(bookTopicInfo.durationH);
      });
    });
  },
);
