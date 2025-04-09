import test, { expect } from '@playwright/test';
import * as path from 'node:path';
import { Component } from './Component';

export class Input extends Component {
  /**
   * Возвращает тип компонента в нижнем регистре
   * @returns {string} Строка 'input'
   */
  get typeOf(): string {
    return 'input';
  }

  /**
   * Заполняет поле ввода указанным значением
   * @param {string} value - Значение для заполнения поля
   * @returns {Promise<void>}
   */
  async fill(value: string): Promise<void> {
    await test.step(`Заполнить ${this.typeOfUpper} "${this.componentName}" значением - "${value}"`, async () => {
      await this.locator.fill(value);
    });
  }

  /**
   * Вводит текст посимвольно с указанной задержкой
   * @param {string} value - Текст для ввода
   * @param {number} delay - Задержка между вводом символов в миллисекундах
   * @returns {Promise<void>}
   */
  async type(value: string, delay: number = 0): Promise<void> {
    await test.step(`Заполнить ${this.typeOf} "${this.componentName}" значением - "${value}"`, async () => {
      await this.locator.pressSequentially(value, { delay });
    });
  }

  /**
   * Ожидает, пока поле ввода станет доступным для взаимодействия
   * @returns {Promise<void>}
   */
  async waitForEnabled(): Promise<void> {
    await test.step(`Ожидание, когда ${this.typeOfUpper} с именем - "${this.componentName}" станет доступным`, async () => {
      await expect(this.locator).toBeEnabled();
    });
  }

  /**
   * Загружает файл в поле ввода типа file
   * @param {string} file - Имя файла из директории test-resources/media
   * @returns {Promise<void>}
   */
  async uploadFile(file: string): Promise<void> {
    await test.step(`В ${this.typeOf} "${this.componentName}" загружен файл - "${file}"`, async () => {
      const filePath = path.resolve(__dirname, `../helpers/media/${file}`);
      await this.locator.setInputFiles(filePath);
    });
  }
}
