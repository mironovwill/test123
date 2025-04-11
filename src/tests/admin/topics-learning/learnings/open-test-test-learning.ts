import { AnswerTypes, Test, TopicBlockPlanTypes } from 'src/core/types';

export const openTestTestLearning: Test = {
  blockPlanName: 'Открытый вопрос',
  blockPlanType: TopicBlockPlanTypes.TEST,
  test: {
    question: 'Какую книгу вы недавно прочитали и что вам в ней понравилось?',
    coverImage: '1000x600.png',
    answerType: AnswerTypes.OpenAnswer,
  },
};
