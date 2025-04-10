import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { ExternalCourseTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const onlineExternalCourseTopicInfo: ExternalCourseTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EXTERNAL_COURSE,
  cost: '2020',
  durationH: '10',
  durationM: '10',
  company: 'abz',
  period: 'Повторяющийся курс',
  place: 'Где-то',
  authors: ['testasdnakjsdnajskd'],
  topicName: 'Онлайн внешний курс',
  type: 'Онлайн',
};
