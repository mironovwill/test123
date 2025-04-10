import { faker } from '@faker-js/faker/locale/ru';

import { getTomorrowDay } from '@core/helpers';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { EventTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const eventMtsLinkTopicInfo: EventTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EVENT,
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  cost: '2020',
  company: faker.company.name(),
  comment: faker.lorem.sentence(),
  platform: 'МТС ЛИНК',
  participantsCount: String(faker.number.int({ min: 100, max: 1000 })),
  startDate: getTomorrowDay(),
  startTime: '10:00',
  endTime: '20:00',
  entrance: 'Свободный доступ',
  percent: String(faker.number.int({ min: 1, max: 100 })),
  webinarType: 'Вебинар',
  topicName: 'Событие без согласования MTS link',
};
