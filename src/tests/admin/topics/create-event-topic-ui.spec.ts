import { appFixture as test } from '@core/fixtures';
import { getTomorrowDay, calculateTopicDuration } from '@core/helpers';
import { epic, feature, issue } from 'allure-js-commons';
import { faker } from '@faker-js/faker/locale/ru';
import { TopicTypes, EventTopic } from '@core/types';
import testData from '@test-data';

const generateEventTopicInfo = () => {
  const generateLink = () => faker.internet.url();
  const generateWords = () => faker.lorem.word({ length: { min: 5, max: 10 } });
  const generateNumber = (min: number, max: number) => String(faker.number.int({ min, max }));

  const baseInfo = {
    topicType: TopicTypes.EVENT,
    description: faker.lorem.sentence(),
    language: testData.structures.languages[0].name,
    level: testData.structures.levels[0].name,
    categories: [testData.structures.topicCategories[0].name],
    image: '1000x600.png',
    tags: Array.from({ length: 2 }, generateWords),
    skills: Array.from({ length: 2 }, generateWords),
    corpAccessCheckbox: true,
    hasCertificateCheckbox: true,
    certificateName: testData.structures.certificate.name,
    certificateSeries: generateNumber(1, 1000),
    certificateNumbersMin: generateNumber(1, 100),
    certificateNumbersMax: generateNumber(100, 1000),
    badgeCheckbox: true,
    badgeName: testData.structures.reward.name,
    files: ['1000x600.png'],
    links: Array.from({ length: 2 }, generateLink),
  };

  return {
    ...baseInfo,
    authors: [faker.person.fullName()],
    company: faker.company.name(),
    comment: faker.lorem.sentence(),
    participantsCount: generateNumber(100, 1000),
    startDate: getTomorrowDay(),
    startTime: '10:00',
    endTime: '20:00',
  };
};

const testCases = [
  {
    name: 'Проверка создания топика с типом "Событие без согласования MTS link" @allure.id=199',
    testData: {
      ...generateEventTopicInfo(),
      cost: '2020',
      platform: 'МТС ЛИНК',
      entrance: 'Свободный доступ',
      percent: String(faker.number.int({ min: 1, max: 100 })),
      webinarType: 'Вебинар',
      topicName: 'Событие без согласования MTS link',
    },
  },
  {
    name: 'Проверка создания топика с типом "Событие без согласования" @allure.id=198',
    testData: {
      ...generateEventTopicInfo(),
      cost: String(faker.number.int({ min: 1000, max: 10000 })),
      platform: 'Нет',
      place: faker.location.streetAddress(),
      topicName: 'Событие без согласования',
    },
  },
];

testCases.forEach(({ name, testData }) => {
  let topicId: string;
  const { topicType, topicName, startTime, endTime, authors, cost, company } = testData;
  const topicDuration = calculateTopicDuration(startTime!, endTime!);
  let eventTopicInfo: EventTopic;

  test.describe(
    `Создание и проверка топика с типом "${topicName}"`,
    { tag: ['@Smoke', '@Admin', `@${topicType}`] },
    () => {
      test.beforeEach(async ({ createTopicByUI }) => {
        await epic('Панель администратора');
        await feature('Создание и проверка топиков');
        issue('10756');
        eventTopicInfo = testData as EventTopic;
        topicId = await createTopicByUI(eventTopicInfo);
      });

      test(`${name}`, async ({ adminTopicPage }) => {
        await adminTopicPage.visitTopic(topicId);
        await adminTopicPage.validateBasicTopicInfo(eventTopicInfo, topicId);
        await adminTopicPage.validateAdditionalTopicInfo(eventTopicInfo);
        await adminTopicPage.validateTopicAuthors(authors!);
        await adminTopicPage.validateTopicCost(cost!);
        await adminTopicPage.validateTopicCompany(company!);
        await adminTopicPage.validateTopicEventSchedule(getTomorrowDay({ formattedDate: true }));
        await adminTopicPage.validateTopicDuration(topicDuration);
      });
    },
  );
});
