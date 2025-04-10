import { faker } from '@faker-js/faker/locale/ru';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { TopicTypes, VideoTopic } from '@core/types';
import testData from '@test-data';

export const videoTopicInfo: VideoTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.VIDEO,
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  company: faker.company.name(),
  durationH: '10',
  durationM: '10',
};
