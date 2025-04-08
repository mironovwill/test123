import { faker } from '@faker-js/faker/locale/ru';
import { AuthorDto } from '../types';

/**
 * Генерирует случайные данные для создания автора.
 * Использует библиотеку Faker для генерации имени автора на русском языке,
 * добавляя уникальный числовой суффикс для обеспечения уникальности.
 * @returns {AuthorDto} - Объект с данными автора, содержащий поле `name`.
 */
export const authorGenerator = (): AuthorDto => {
  return {
    name: `${faker.person.fullName()}${faker.string.numeric(5)}`,
  };
};
