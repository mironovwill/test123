import { faker } from '@faker-js/faker/locale/ru';
import { CertificateDto } from '../types';

/**
 * Генерирует случайные данные для создания сертификата.
 * Использует библиотеку Faker для генерации названия сертификата на русском языке,
 * добавляя уникальный числовой суффикс для обеспечения уникальности.
 * @param {number} templateId - ID шаблона сертификата.
 * @param {Object} [options] - Дополнительные параметры сертификата.
 * @param {string} [options.type='Сертификат'] - Тип сертификата.
 * @param {string} [options.confirmText='Настоящий сертификат подтверждает, что'] - Текст подтверждения.
 * @param {string} [options.completeText='успешно прошел(а) программу обучения'] - Текст завершения.
 * @param {string} [options.base64Logo1='blob:https://admin.kampus.local/123'] - Ссылка на логотип в формате base64.
 * @returns {CertificateDto} - Объект с данными сертификата.
 */
export const certificateGenerator = (
  templateId: number,
  options: {
    type?: string;
    confirmText?: string;
    completeText?: string;
    base64Logo1?: string;
  } = {},
): CertificateDto => {
  const {
    type = 'Сертификат',
    confirmText = 'Настоящий сертификат подтверждает, что',
    completeText = 'успешно прошел(а) программу обучения',
    base64Logo1 = 'blob:https://admin.kampus.local/123',
  } = options;

  return {
    name: `${faker.commerce.product()}${faker.string.numeric(5)}`,
    templateId,
    type,
    confirmText,
    completeText,
    base64Logo1,
  };
};
