import { Component } from './Component';
import { expect, test } from '@playwright/test';

export class Checkbox extends Component {
  /**
   * Возвращает тип компонента
   * @returns {string} Строка 'checkbox'
   */
  get typeOf(): string {
    return 'checkbox';
  }

  /**
   * Устанавливает чекбокс в отмеченное состояние
   * @returns {Promise<void>}
   */
  async check() {
    await test.step(`${this.typeOfUpper} "${this.componentName}" выбран`, async () => {
      await this.locator.check();
    });
  }

  /**
   * Проверяет, что чекбокс находится в отмеченном состоянии
   * @returns {Promise<void>}
   */
  async shouldBeChecked() {
    await test.step(`${this.typeOfUpper} "${this.componentName}" включен`, async () => {
      expect(this.locator, {
        message: super.getErrorMessage(`Выключен`),
      }).toBeTruthy();
    });
  }

  /**
   * Проверяет, что чекбокс находится в неотмеченном состоянии
   * @returns {Promise<void>}
   */
  async shouldBeUnchecked() {
    await test.step(`${this.typeOfUpper} "${this.componentName}" выключен`, async () => {
      expect(this.locator, {
        message: super.getErrorMessage(`Включен`),
      }).toBeFalsy();
    });
  }
}
