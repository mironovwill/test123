import { getTomorrowDay } from '@core/helpers';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { EventTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const eventMtsLinkTopicInfo: EventTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EVENT,
  authors: ['testasdnakjsdnajskd'],
  cost: '2020',
  company: 'abz',
  comment: 'comment',
  platform: 'МТС ЛИНК',
  participantsCount: '100',
  startDate: getTomorrowDay(),
  startTime: '10:00',
  endTime: '20:00',
  entrance: 'Свободный доступ',
  percent: '50',
  webinarType: 'Вебинар',
  topicName: 'Событие без согласования MTS link',
};
