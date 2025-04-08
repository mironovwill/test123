import { expect, Locator, Page, test } from '@playwright/test';
import { capitalizeFirstLetter } from '@core/utils';

export interface ComponentProps {
  page: Page;
  name?: string;
  locator: Locator;
}

export abstract class Component {
  protected page: Page;
  protected locator: Locator;
  private readonly name?: string;

  constructor({ page, locator, name }: ComponentProps) {
    this.page = page;
    this.locator = locator;
    this.name = name;
  }

  /**
   * Возвращает тип компонента в нижнем регистре
   */
  protected get typeOf(): string {
    return 'component';
  }

  /**
   * Возвращает тип компонента с заглавной буквы
   */
  protected get typeOfUpper(): string {
    return capitalizeFirstLetter(this.typeOf);
  }

  /**
   * Возвращает имя компонента
   * @throws {Error} Если имя компонента не задано
   */
  protected get componentName(): string {
    if (!this.name) {
      throw new Error('Предоставьте свойство "name", чтобы использовать "componentName".');
    }
    return this.name;
  }

  /**
   * Формирует сообщение об ошибке для компонента
   * @param action - Действие, которое вызвало ошибку
   * @returns Отформатированное сообщение об ошибке
   */
  protected getErrorMessage(action: string): string {
    return `${this.typeOfUpper} с именем "${this.componentName}" и локатором ${this.locator} ${action}`;
  }

  /**
   * Проверяет видимость компонента на странице
   */
  async shouldBeVisible(): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" должен(а) быть отображен на странице`, async () => {
      await expect(this.locator, {
        message: this.getErrorMessage('Не отображается'),
      }).toBeVisible();
    });
  }

  /**
   * Проверяет, что компонент не виден на странице
   */
  async shouldBeHidden(): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" не должен(а) быть отображен на странице`, async () => {
      await expect(this.locator, {
        message: this.getErrorMessage('Отображается'),
      }).toBeHidden();
    });
  }

  /**
   * Наводит курсор мыши на компонент
   */
  async hover(): Promise<void> {
    await test.step(`Наведение на ${this.typeOfUpper} с именем "${this.componentName}"`, async () => {
      await this.locator.hover();
    });
  }

  /**
   * Проверяет, что компонент содержит указанный текст
   * @param text - Ожидаемый текст
   */
  async shouldHaveText(text: string): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" должен(а) иметь значение - "${text}"`, async () => {
      await expect(
        this.locator,
        this.getErrorMessage(`Не имеет значение - "${text}"`),
      ).toContainText(text);
    });
  }

  /**
   * Проверяет, что значение компонента соответствует ожидаемому
   * @param value - Ожидаемое значение
   */
  async shouldHaveValue(value: string): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" должен(а) иметь значение - "${value}"`, async () => {
      await expect(
        this.locator,
        this.getErrorMessage(`Не имеет значение - "${value}"`),
      ).toHaveValue(value);
    });
  }

  /**
   * Выполняет клик по компоненту
   */
  async click(): Promise<void> {
    await test.step(`Клик на ${this.typeOfUpper} с именем - "${this.componentName}"`, async () => {
      await this.locator.click();
    });
  }

  /**
   * Выполняет двойной клик по компоненту
   * @param delay - Задержка между кликами в миллисекундах
   */
  async doubleClick(delay = 0): Promise<void> {
    await test.step(`Двойной клик на ${this.typeOfUpper} с именем - "${this.componentName}"`, async () => {
      await this.locator.dblclick({ delay });
    });
  }

  /**
   * Проверяет наличие атрибута у компонента
   * @param attribute - Имя атрибута
   */
  async shouldHaveAttribute(attribute: string): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" должен(а) иметь атрибут - "${attribute}"`, async () => {
      await expect(this.locator).toHaveAttribute(attribute);
    });
  }

  /**
   * Возвращает значение указанного атрибута компонента
   * @param attribute - Имя атрибута
   * @returns Значение атрибута или null, если атрибут не найден
   */
  async returnAttributeValue(attribute: string): Promise<string | null> {
    return await this.locator.getAttribute(attribute);
  }

  /**
   * Проверяет, что атрибут компонента имеет указанное значение
   * @param attribute - Имя атрибута
   * @param value - Ожидаемое значение атрибута
   */
  async shouldHaveAttributeValue(attribute: string, value: string): Promise<void> {
    const description = `${this.typeOfUpper} "${this.componentName}" имеет атрибут - "${attribute}" и значение - "${value}"`;

    await test.step(description, async () => {
      await expect(this.locator).toHaveAttribute(attribute, value);
    });
  }

  /**
   * Проверяет, что компонент заблокирован
   */
  async shouldBeDisabled() {
    await test.step(`${this.typeOfUpper} "${this.componentName}" заблокирован`, async () => {
      await expect(this.locator, {
        message: this.getErrorMessage(`Разблокирован`),
      }).toBeDisabled();
    });
  }

  /**
   * Проверяет, что компонент разблокирован
   */
  async shouldBeEnabled() {
    await test.step(`${this.typeOfUpper} "${this.componentName}" разблокирован`, async () => {
      await expect(this.locator, {
        message: this.getErrorMessage(`Заблокирован`),
      }).toBeEnabled();
    });
  }
}
