import { Component } from './Component';
import { expect, test } from '@playwright/test';

export class Select extends Component {
  /**
   * Возвращает тип компонента
   * @returns {string} Строка 'select'
   */
  get typeOf(): string {
    return 'select';
  }

  /**
   * Выбирает элемент в селекте по атрибуту title
   * @param {string} title - Значение атрибута title искомого элемента
   * @returns {Promise<void>}
   */
  async selectItemByTitle(title: string): Promise<void> {
    await test.step(`Выбор пункта с заголовком "${title}" в ${this.typeOfUpper} "${this.componentName}"`, async () => {
      await this.locator.getByTitle(title).first().click();
    });
  }

  /**
   * Выбирает элемент в селекте по его текстовому содержимому
   * @param {string} text - Текст искомого элемента
   * @returns {Promise<void>}
   */
  async selectItemByText(text: string): Promise<void> {
    await test.step(`Выбор пункта с текстом "${text}" в ${this.typeOfUpper} "${this.componentName}"`, async () => {
      await this.locator.getByText(text).first().click();
    });
  }

  /**
   * Выбирает элемент в селекте по его роли и имени
   * @param {string} name - Имя элемента
   * @param {'menuitem' | 'option'} role - ARIA-роль элемента
   * @returns {Promise<void>}
   */
  async selectItemByRole(name: string, role: 'menuitem' | 'option'): Promise<void> {
    await test.step(`Выбор пункта с ролью "${role}" и именем "${name}" в ${this.typeOfUpper} "${this.componentName}"`, async () => {
      await this.locator.getByRole(role, { name, exact: true }).first().click();
    });
  }

  /**
   * Проверяет наличие ожидаемых элементов в селекте
   * @param {string[]} expectedItems - Массив ожидаемых текстовых значений элементов
   * @returns {Promise<void>}
   */
  async assertSelectIncludesItems(expectedItems: string[]): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" должен(а) содержать элементы: [${expectedItems.join(', ')}]`, async () => {
      const itemsLocator = this.locator.locator('> *');

      const actualItems = await itemsLocator.allTextContents();
      const trimmedActualItems = actualItems.map(item => item.trim());

      expect(trimmedActualItems.length).toBe(expectedItems.length);
      expect(new Set(trimmedActualItems)).toEqual(new Set(expectedItems));
    });
  }

  /**
   * Проверяет количество элементов в селекте
   * @param {number} expectedCount - Ожидаемое количество элементов
   * @returns {Promise<void>}
   */
  async validateListItemsCount(expectedCount: number): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" должен(а) иметь длину - "${expectedCount}"`, async () => {
      const actualCount = await this.locator.locator('> *').count();

      expect(actualCount, {
        message: this.getErrorMessage(`Ожидалось ${expectedCount}, но найдено ${actualCount}`),
      }).toBe(expectedCount);
    });
  }
}
