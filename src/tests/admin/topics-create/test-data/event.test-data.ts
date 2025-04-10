import { getTomorrowDay } from '@core/helpers';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { EventTopic, TopicTypes } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const eventTopicInfo: EventTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EVENT,
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  cost: String(faker.number.int({ min: 1000, max: 10000 })),
  company: faker.company.name(),
  comment: faker.lorem.sentence(),
  platform: 'Нет',
  participantsCount: String(faker.number.int({ min: 100, max: 1000 })),
  startDate: getTomorrowDay(),
  startTime: '10:00',
  endTime: '20:00',
  place: faker.location.streetAddress(),
  topicName: 'Событие без согласования',
};
