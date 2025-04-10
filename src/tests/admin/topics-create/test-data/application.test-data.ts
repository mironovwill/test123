import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { ApplicationTopic, TopicTypes } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const applicationTopicInfo: ApplicationTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.APPLICATION,
  cost: String(faker.number.int({ min: 1000, max: 10000 })),
  durationH: '10',
  durationM: '10',
};
