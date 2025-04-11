import { faker } from '@faker-js/faker/locale/ru';
import { AnswerTypes, Test, TopicBlockPlanTypes } from 'src/core/types';

export const multipleTestLearning: Test = {
  blockPlanName: faker.food.fruit(),
  blockPlanType: TopicBlockPlanTypes.TEST,
  test: {
    question: faker.food.description(),
    coverImage: '1000x600.png',
    answerType: AnswerTypes.MatchingAnswers,
    imagesMatching: true,
    matchingAnswers: [
      {
        left: {
          content: null,
          image: '1000x600.png',
        },
        right: {
          content: null,
          image: '1000x600.png',
        },
      },
      {
        left: {
          content: null,
          image: '1000x600.png',
        },
        right: {
          content: null,
          image: '1000x600.png',
        },
      },
      {
        left: {
          content: null,
          image: '1000x600.png',
        },
        right: {
          content: null,
          image: '1000x600.png',
        },
      },
    ],
  },
};
