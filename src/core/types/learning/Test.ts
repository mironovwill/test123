import { TopicBlockPlanTypes } from '../topic/TopicBlockPlanTypes';

export const enum AnswerTypes {
  OneAnswer = 'Один вариант ответа',
  TwoAnswers = 'Несколько вариантов ответа',
  OpenAnswer = 'Открытый',
  MatchingAnswers = 'Сопоставление',
}

export interface BasicAnswer {
  answer: string;
  correct: boolean;
  imgUuid?: string;
}

export interface BasicTest {
  question: string;
  coverImage?: string;
  answerType: AnswerTypes.OneAnswer | AnswerTypes.TwoAnswers;
  answers: BasicAnswer[];
}

export interface OpenedTest {
  question: string;
  coverImage?: string;
  answerType: AnswerTypes.OpenAnswer;
}

export interface MatchingAnswers {
  left: {
    content: string | null;
    image?: string;
  };
  right: {
    content: string | null;
    image?: string;
  };
}

export interface MatchingTest {
  question: string;
  coverImage?: string;
  imagesMatching?: boolean;
  answerType: AnswerTypes.MatchingAnswers;
  matchingAnswers: MatchingAnswers[];
}

export type TestEntity = BasicTest | MatchingTest | OpenedTest;

export interface Test {
  blockPlanName: string;
  blockPlanType: TopicBlockPlanTypes.TEST;
  timeout?: string;
  mixAnswers?: boolean;
  mixQuestions?: boolean;
  allowAnswersCount?: string;
  poll?: boolean;
  test: TestEntity;
}
