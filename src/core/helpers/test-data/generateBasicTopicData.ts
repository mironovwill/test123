import { TopicsLanguages, TopicCategories, TopicLevels } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';

export const generateBasicTopicData = (badgeName: string, certificateName: string) => {
  const generateLink = () => faker.internet.url();
  const generateWords = () => faker.lorem.word({ length: { min: 5, max: 10 } });
  const topicName = faker.book.title();

  return {
    topicName,
    description: faker.lorem.paragraph(),
    categories: [TopicCategories.WORK_ORGANIZATION],
    level: TopicLevels.BASIC,
    language: TopicsLanguages.RUSSIAN,
    image: '1000x600.png',
    tags: Array.from({ length: 2 }, generateWords),
    skills: Array.from({ length: 2 }, generateWords),
    corpAccessCheckbox: true,
    hasCertificateCheckbox: true,
    certificateName,
    certificateSeries: String(faker.number.int({ min: 1 })),
    certificateNumbersMin: String(faker.number.int({ min: 1, max: 100 })),
    certificateNumbersMax: String(faker.number.int({ min: 100, max: 1000 })),
    badgeCheckbox: true,
    badgeName,
    files: ['1000x600.png'],
    links: Array.from({ length: 2 }, generateLink),
  };
};
