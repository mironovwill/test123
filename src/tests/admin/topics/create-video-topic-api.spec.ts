import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import testData from '@test-data';
import { TopicTypes, VideoTopic } from '@core/types';

test.describe(
  `Создание и проверка топика с типом "Видео"`,
  { tag: ['@Regress', '@Admin', '@Видео'] },
  () => {
    const topicId = String(testData.topics.videoTopic.id);
    const videoTopicInfo = {
      topicName: testData.topics.videoTopic.name,
      description: testData.topics.videoTopic.description,
      topicType: TopicTypes.VIDEO,
      categories: testData.topics.videoTopic.categories.map(category => category.name),
      level: testData.topics.videoTopic.level.name,
      language: testData.topics.videoTopic.language.name,
      skills: testData.topics.videoTopic.skills.map(skill => skill.name),
      tags: testData.topics.videoTopic.tags.map(tag => tag.name),
      links: testData.topics.videoTopic.links.map(link => link.url),
      authors: testData.topics.videoTopic.authors.map(author => author.name),
      company: testData.topics.videoTopic.publisher,
      durationH: String(testData.topics.videoTopic.duration / 60),
    } as VideoTopic;

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      await adminTopicPage.visitTopic(topicId);
    });

    test(`Проверка топика с типом "Видео" @allure.id=174`, async ({ adminTopicPage }) => {
      await adminTopicPage.validateBasicTopicInfo(videoTopicInfo, topicId);
      await adminTopicPage.validateAdditionalTopicInfo(videoTopicInfo);
      await adminTopicPage.validateTopicAuthors(videoTopicInfo.authors!);
      await adminTopicPage.validateTopicCompany(videoTopicInfo.company!);
      await adminTopicPage.validateTopicDuration(videoTopicInfo.durationH!);
    });
  },
);
