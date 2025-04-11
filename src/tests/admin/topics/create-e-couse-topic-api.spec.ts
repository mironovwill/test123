import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import testData from '@test-data';
import { ECourseTopic, TopicTypes } from '@core/types';

test.describe(
  `Создание и проверка топика с типом "Электронный курс"`,
  { tag: ['@Regress', '@Admin', '@Электронный курс'] },
  () => {
    const topicId = String(testData.topics.eCourseTopic.id);

    const eCourseTopicInfo = {
      topicName: testData.topics.eCourseTopic.name,
      description: testData.topics.eCourseTopic.description,
      topicType: TopicTypes.E_COURSE,
      categories: testData.topics.eCourseTopic.categories.map(category => category.name),
      level: testData.topics.eCourseTopic.level.name,
      language: testData.topics.eCourseTopic.language.name,
      skills: testData.topics.eCourseTopic.skills.map(skill => skill.name),
      tags: testData.topics.eCourseTopic.tags.map(tag => tag.name),
      links: testData.topics.eCourseTopic.links.map(link => link.url),
      company: testData.topics.eCourseTopic.publisher,
      place: testData.topics.eCourseTopic.meetPlace,
      authors: testData.topics.eCourseTopic.authors.map(author => author.name),
    } as ECourseTopic;

    test.beforeEach(async ({ adminTopicPage }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      await adminTopicPage.visitTopic(topicId);
    });

    test(`Проверка топика с типом "Электронный курс" @allure.id=191"`, async ({
      adminTopicPage,
    }) => {
      await adminTopicPage.validateBasicTopicInfo(eCourseTopicInfo, topicId);
      await adminTopicPage.validateAdditionalTopicInfo(eCourseTopicInfo);
      await adminTopicPage.validateTopicAuthors(eCourseTopicInfo.authors!);
      //TODO: Стиль, время начала, длительность
      await adminTopicPage.validateTopicCompany(eCourseTopicInfo.company!);
      await adminTopicPage.validateMeetPlace(eCourseTopicInfo.place!);
    });
  },
);
