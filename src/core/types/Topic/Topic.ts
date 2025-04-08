import { TopicCategories, TopicLevels, TopicTypes, TopicsLanguages } from '@core/types/Topic';

export type BaseTopic = {
  topicName: string;
  topicType: TopicTypes;
  categories: TopicCategories[];
  eventCheckbox?: boolean;
  approveCheckbox?: boolean;
  description: string;
  image?: string;
  tags?: string[];
  skills?: string[];
  language: TopicsLanguages;
  level: TopicLevels;
  corpAccessCheckbox?: boolean;
  badgeCheckbox?: boolean;
  hasCertificateCheckbox?: boolean;
  certificateName?: string;
  certificateSeries?: string;
  certificateNumbersMin?: string;
  certificateNumbersMax?: string;
  badgeName?: string;
  links?: string[];
  files?: string[];
};

export type ApplicationTopic = BaseTopic & {
  topicType: TopicTypes.APPLICATION;
  cost?: string;
  durationH?: string;
  durationM?: string;
};

export type ArticleTopic = BaseTopic & {
  topicType: TopicTypes.ARTICLE;
  authors?: string[];
  year?: string;
  durationH?: string;
  durationM?: string;
};

export type BookTopic = BaseTopic & {
  topicType: TopicTypes.BOOK;
  authors?: string[];
  creator?: string[];
  paper?: boolean;
  addressBook?: string;
  cost?: string;
  year?: string;
  durationH?: string;
  durationM?: string;
  bookPublisher?: string;
};

export type CorporateCourseTopic = BaseTopic & {
  topicType: TopicTypes.CORPORATE_COURSE;
  type?: 'Очный' | 'Онлайн';
  authors?: string[];
  cost?: string;
  durationH?: string;
  durationM?: string;
  company?: string;
  place?: string;
  period?: 'Повторяющийся курс' | 'Дата не определена' | 'Редкий курс';
};

export type ECourseTopic = BaseTopic & {
  topicType: TopicTypes.E_COURSE;
  authors?: string[];
  period?: 'Повторяющийся курс' | 'Дата не определена' | 'Редкий курс';
  startDate?: string;
  startTimeH?: string;
  startTimeM?: string;
  durationH?: string;
  durationM?: string;
  company?: string;
  place?: string;
};

export type ExternalCourseTopic = BaseTopic & {
  topicType: TopicTypes.EXTERNAL_COURSE;
  type?: 'Очный' | 'Онлайн';
  authors?: string[];
  period?: 'Повторяющийся курс' | 'Дата не определена' | 'Редкий курс';
  cost?: string;
  durationH?: string;
  durationM?: string;
  company?: string;
  place?: string;
};

export type EventTopic = BaseTopic & {
  topicType: TopicTypes.EVENT;
  authors?: string[];
  cost?: string;
  company?: string;
  comment?: string;
  platform?: 'МТС ЛИНК' | 'Нет';
  participantsCount?: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  place?: string;
  responsiblePersons?: string[];
  entrance?: 'Свободный доступ' | 'Доступ с регистрацией';
  percent?: string;
  webinarType?: 'Вебинар' | 'Митинг' | 'Тренинг';
  eventName?: string;
};

export type InfographicTopic = BaseTopic & {
  topicType: TopicTypes.INFOGRAPHIC;
  authors?: string[];
  year?: string;
  durationH?: string;
  durationM?: string;
};

export type PodcastTopic = BaseTopic & {
  topicType: TopicTypes.PODCASTS;
  authors?: string[];
  company?: string;
  durationH?: string;
  durationM?: string;
};

export type PollTopic = BaseTopic & {
  topicType: TopicTypes.POLL;
  authors?: string[];
  year?: string;
  durationH?: string;
  durationM?: string;
};

export type TestTopic = BaseTopic & {
  topicType: TopicTypes.TEST;
  authors?: string[];
  year?: string;
  durationH?: string;
  durationM?: string;
};

export type VideoTopic = BaseTopic & {
  topicType: TopicTypes.VIDEO;
  authors?: string[];
  company?: string;
  durationH?: string;
  durationM?: string;
};

export type Topic =
  | ArticleTopic
  | ApplicationTopic
  | BookTopic
  | CorporateCourseTopic
  | ECourseTopic
  | EventTopic
  | ExternalCourseTopic
  | InfographicTopic
  | PodcastTopic
  | PollTopic
  | TestTopic
  | VideoTopic;
