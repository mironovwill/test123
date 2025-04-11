import { AnswerTypes, Test, TopicBlockPlanTypes } from 'src/core/types';

export const twoAnswersTestLearning: Test = {
  blockPlanName: 'Какие животные относятся к млекопитающим?',
  blockPlanType: TopicBlockPlanTypes.TEST,
  test: {
    question: 'how to make money?',
    coverImage: '1000x600.png',
    answerType: AnswerTypes.TwoAnswers,
    answers: [
      {
        answer: 'Кит',
        correct: true,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Черепаха',
        correct: false,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Лев',
        correct: true,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Лев',
        correct: true,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Дельфин',
        correct: true,
        imgUuid: '1000x600.png',
      },
    ],
  },
};
