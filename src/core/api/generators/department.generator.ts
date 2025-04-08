import { faker } from '@faker-js/faker/locale/ru';
import { DepartmentDto } from '../types';

/**
 * Генерирует случайные данные для создания отедела.
 * Использует библиотеку Faker для генерации названия отдела на русском языке,
 * добавляя уникальный числовой суффикс для обеспечения уникальности.
 * @returns {DepartmentDto} - Объект с данными отдела, содержащий поле `name`.
 */
export const departmentGenerator = (): DepartmentDto => {
  return {
    name: `${faker.person.jobTitle()}${faker.string.numeric(100)}`,
  };
};
