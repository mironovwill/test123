import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { BookTopic, TopicTypes } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const bookTopicInfo: BookTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.BOOK,
  cost: String(faker.number.int({ min: 1000, max: 10000 })),
  authors: Array.from({ length: 2 }, () => faker.person.fullName()),
  creator: Array.from({ length: 2 }, () => faker.company.name()),
  paper: true,
  year: '2020',
  durationH: '10',
  durationM: '10',
  bookPublisher: faker.company.name(),
  addressBook: faker.location.streetAddress(),
};
