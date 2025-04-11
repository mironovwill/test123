import { faker } from '@faker-js/faker/locale/ru';
import { AnswerTypes, Test, TopicBlockPlanTypes } from 'src/core/types';

export const multipleAnswersTestLearning: Test = {
  blockPlanName: faker.food.fruit(),
  blockPlanType: TopicBlockPlanTypes.TEST,
  test: {
    question: faker.food.description(),
    coverImage: '1000x600.png',
    answerType: AnswerTypes.MatchingAnswers,
    matchingAnswers: [
      {
        left: {
          content: faker.food.ingredient(),
        },
        right: {
          content: faker.food.ingredient(),
        },
      },
      {
        left: {
          content: faker.food.ingredient(),
        },
        right: {
          content: faker.food.ingredient(),
        },
      },
      {
        left: {
          content: faker.food.ingredient(),
        },
        right: {
          content: faker.food.ingredient(),
        },
      },
    ],
  },
};
