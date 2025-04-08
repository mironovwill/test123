import { faker } from '@faker-js/faker/locale/ru';
import { FunctionDto } from '../types';

/**
 * Генерирует случайные данные для создания функции.
 * Использует библиотеку Faker для генерации имени функции на русском языке,
 * добавляя уникальный числовой суффикс для обеспечения уникальности.
 * @returns {FunctionDto} - Объект с данными функции, содержащий поле `name`.
 */

export const functionGenerator = (): FunctionDto => {
  return {
    name: `${faker.person.jobArea()}${faker.string.numeric(100)}`,
  };
};
