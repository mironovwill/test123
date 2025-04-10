import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { CorporateCourseTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const onlineCorporateCourseTopicInfo: CorporateCourseTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.CORPORATE_COURSE,
  cost: '2020',
  durationH: '10',
  durationM: '10',
  company: 'abz',
  period: 'Повторяющийся курс',
  place: 'Где-то',
  authors: ['testasdnakjsdnajskd'],
  topicName: 'Онлайн корпоративный курс',
  type: 'Онлайн',
};
