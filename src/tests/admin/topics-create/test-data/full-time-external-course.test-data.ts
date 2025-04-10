import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { ExternalCourseTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const fullTimeExternalCourseTopicInfo: ExternalCourseTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EXTERNAL_COURSE,
  cost: '2020',
  type: 'Очный',
  durationH: '10',
  durationM: '10',
  company: 'abz',
  authors: ['test1231asdasd'],
  topicName: 'Очный внешний курс',
};
