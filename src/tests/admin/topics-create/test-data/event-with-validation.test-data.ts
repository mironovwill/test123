import { faker } from '@faker-js/faker/locale/ru';
import { getTomorrowDay } from '@core/helpers';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { EventTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const eventWithValidationTopicInfo: EventTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EVENT,
  approveCheckbox: true,
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  cost: String(faker.number.int({ min: 1000, max: 10000 })),
  company: faker.company.name(),
  comment: faker.lorem.sentence(),
  participantsCount: String(faker.number.int({ min: 100, max: 1000 })),
  startDate: getTomorrowDay(),
  startTime: '10:00',
  endTime: '20:00',
  place: faker.location.streetAddress(),
  responsiblePersons: [
    `${testData.users.admin.firstName} ${testData.users.admin.lastName}`,
    `${testData.users.manager.firstName} ${testData.users.manager.lastName}`,
  ],
  eventName: faker.lorem.word(),
};
