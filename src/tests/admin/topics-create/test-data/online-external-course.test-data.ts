import { faker } from '@faker-js/faker/locale/ru';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { ExternalCourseTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const onlineExternalCourseTopicInfo: ExternalCourseTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EXTERNAL_COURSE,
  cost: String(faker.number.int({ min: 1000, max: 10000 })),
  durationH: '10',
  durationM: '10',
  company: faker.company.name(),
  period: 'Повторяющийся курс',
  place: faker.location.streetAddress(),
  authors: Array.from({ length: 1 }, () => faker.person.fullName()),
  topicName: 'Онлайн внешний курс',
  type: 'Онлайн',
};
