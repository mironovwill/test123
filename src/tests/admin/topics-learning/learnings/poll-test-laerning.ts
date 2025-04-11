import { AnswerTypes, Test, TopicBlockPlanTypes } from 'src/core/types';

export const pollTestLearning: Test = {
  blockPlanName: 'Как называется процесс преобразования воды в пар?',
  poll: true,
  blockPlanType: TopicBlockPlanTypes.TEST,
  test: {
    question: 'how to make money?',
    coverImage: '1000x600.png',
    answerType: AnswerTypes.OneAnswer,
    answers: [
      {
        answer: 'Конденсация',
        correct: false,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Замерзание',
        correct: false,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Испарение',
        correct: true,
        imgUuid: '1000x600.png',
      },
      {
        answer: 'Осаждение',
        correct: false,
        imgUuid: '1000x600.png',
      },
    ],
  },
};
