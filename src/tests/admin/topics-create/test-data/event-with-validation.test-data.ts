import { getTomorrowDay } from '@core/helpers';
import { generateBasicTopicData } from '@core/helpers/test-data/generateBasicTopicData';
import { EventTopic, TopicTypes } from '@core/types';
import testData from '@test-data';

export const eventWithValidationTopicInfo: EventTopic = {
  ...generateBasicTopicData(testData.structures.reward.name, testData.structures.certificate.name),
  topicType: TopicTypes.EVENT,
  approveCheckbox: true,
  authors: ['testasdnakjsdnajskd'],
  cost: '2020',
  company: 'abz',
  comment: 'comment',
  participantsCount: '100',
  startDate: getTomorrowDay(),
  startTime: '10:00',
  endTime: '20:00',
  place: 'some place',
  responsiblePersons: [
    `${testData.users.admin.firstName} ${testData.users.admin.lastName}`,
    `${testData.users.manager.firstName} ${testData.users.manager.lastName}`,
  ],
  eventName: 'Event name',
};
