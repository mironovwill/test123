import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { ECourseTopic, TopicTypes } from '@core/types';
import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const eCourseTopicInfo: ECourseTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.E_COURSE,
  authors: Array.from({ length: 1 }, () => faker.book.author()),
  period: 'Повторяющийся курс',
  durationH: '10',
  durationM: '10',
  startTimeM: '10',
  startTimeH: '10',
  company: faker.company.name(),
  place: faker.location.streetAddress(),
};
