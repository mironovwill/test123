import 'dotenv';
import { faker } from '@faker-js/faker/locale/ru';
import { UserDto } from '../types';

type UserParam = {
  roleId?: number;
  position?: number;
  department?: number;
  companyId?: number;
  managerId?: number | undefined;
};

/**
 * Генерирует случайные данные для создания пользователя.
 * Использует библиотеку Faker для генерации имени, фамилии, email и других данных на русском языке.
 * @param options - Параметры для настройки пользователя:
 * - `roleId`: ID роли пользователя (по умолчанию 4).
 * - `position`: ID должности (по умолчанию 1).
 * - `department`: ID отдела (по умолчанию 1).
 * - `companyId`: ID компании (по умолчанию 1000).
 * - `managerId`: ID менеджера (по умолчанию undefined).
 * @returns {UserDto}.
 */
export const userGenerator = ({
  roleId = 4,
  position = 1,
  department = 1,
  companyId = 1000,
  managerId = undefined,
}: UserParam = {}): UserDto => {
  const email = faker.internet.email().toLowerCase();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: faker.person.middleName(),
    email,
    phone: `+7${faker.string.numeric(10)}`,
    password: process.env.TEST_USER_PASSWORD!,
    roleId,
    department,
    function: faker.person.jobType(),
    position,
    location: faker.location.city(),
    subCompany: faker.company.name(),
    managerId,
    companyId,
    createSk: true,
    login: email,
  };
};
