import { faker } from '@faker-js/faker/locale/ru';
import { RewardDto } from '../types';

/**
 * Генерирует случайные данные для создания награды.
 * Использует библиотеку Faker для генерации названия и описания награды на русском языке,
 * добавляя уникальный числовой суффикс для обеспечения уникальности.
 * @param action - Действие, за которое выдается награда (по умолчанию 'TOPIC_FINISH').
 * @param imageUuid - Уникальный идентификатор изображения награды (по умолчанию 'image').
 * @returns Объект с данными награды.
 */
export const rewardGenerator = (action: string = 'TOPIC_FINISH', imageUuid: string = 'image'): RewardDto => {
  return {
    name: `${faker.commerce.product()}${faker.string.numeric(20)}`,
    action,
    description: faker.commerce.productDescription(),
    imageUuid,
  };
};
