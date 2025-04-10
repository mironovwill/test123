import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { TestTopic, TopicTypes } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const testTopicInfo: TestTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.TEST,
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  year: String(faker.number.int({ min: 2010, max: 2025 })),
  durationH: '10',
  durationM: '10',
};
