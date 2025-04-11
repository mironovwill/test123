import { appFixture as test } from '@core/fixtures';
import { ApplicationTopic, TopicTypes } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';
import { epic, feature } from 'allure-js-commons';
import testData from '@test-data';

const generateApplicationTopicInfo = () => {
  const generateLink = () => faker.internet.url();
  const generateWords = () => faker.lorem.word({ length: { min: 5, max: 10 } });

  return {
    topicType: TopicTypes.APPLICATION,
    description: faker.lorem.sentence(),
    language: testData.structures.languages[0].name,
    level: testData.structures.levels[0].name,
    categories: [testData.structures.topicCategories[0].name],
    cost: String(faker.number.int({ min: 1000, max: 10000 })),
    durationH: '10',
    durationM: '10',
    topicName: faker.book.title(),
    image: '1000x600.png',
    tags: Array.from({ length: 2 }, generateWords),
    skills: Array.from({ length: 2 }, generateWords),
    corpAccessCheckbox: true,
    hasCertificateCheckbox: true,
    certificateName: testData.structures.certificate.name,
    certificateSeries: String(faker.number.int({ min: 1 })),
    certificateNumbersMin: String(faker.number.int({ min: 1, max: 100 })),
    certificateNumbersMax: String(faker.number.int({ min: 100, max: 1000 })),
    badgeCheckbox: true,
    badgeName: testData.structures.reward.name,
    files: ['1000x600.png'],
    links: Array.from({ length: 2 }, generateLink),
  };
};

test.describe(
  'Создание и проверка топика с типом "Приложение"',
  { tag: ['@Smoke', '@Admin', '@Приложение'] },
  () => {
    let topicId: string;
    let applicationTopicInfo: ApplicationTopic;

    test.beforeEach(async ({ createTopicByUI }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      applicationTopicInfo = generateApplicationTopicInfo() as ApplicationTopic;
      topicId = await createTopicByUI(applicationTopicInfo);
    });

    test('Создание и проверка топика с типом "Приложение"', async ({ adminTopicPage }) => {
      await test.step('Проверка основной информации топика', async () => {
        await adminTopicPage.visitTopic(topicId);
        await adminTopicPage.validateBasicTopicInfo(applicationTopicInfo, topicId, '1');
        await adminTopicPage.validateAdditionalTopicInfo(applicationTopicInfo);
        await adminTopicPage.validateTopicCost(applicationTopicInfo.cost);
        await adminTopicPage.validateTopicDuration(
          applicationTopicInfo.durationH,
          applicationTopicInfo.durationM,
        );
      });
    });
  },
);
