import { faker } from '@faker-js/faker/locale/ru';

import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { ExternalCourseTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const fullTimeExternalCourseTopicInfo: ExternalCourseTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EXTERNAL_COURSE,
  cost: String(faker.number.int({ min: 1000, max: 10000 })),
  type: 'Очный',
  durationH: '10',
  durationM: '10',
  company: faker.company.name(),
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  topicName: 'Очный внешний курс',
};
