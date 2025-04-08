import { expect, Page, test } from '@playwright/test';
import { Button } from '@core/components';

export class BasePage {
  private readonly helpDeskBtn = new Button({
    page: this.page,
    locator: this.page.frameLocator('iframe[name="JSD widget"]').locator('#button-container'),
    name: 'Кнопка "Helpdesk"',
  });

  constructor(public page: Page) {}

  /**
   * Переходит по указанному URL.
   * @param url - URL, по которому нужно перейти.
   */
  async visit(url: string) {
    await test.step(`Открытие url "${url}"`, async () => {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    });
  }

  /**
   * Перезагружает текущую страницу.
   */
  async reload() {
    const url = this.page.url();

    await test.step(`Перезагрузка страницы с url "${url}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }

  /**
   * Проверяет, отображена ли кнопка "Helpdesk" на странице.
   */
  async validateHelpdeskButton() {
    await test.step('Кнопка "Helpdesk" отображена на странице', async () => {
      await this.helpDeskBtn.shouldBeVisible();
    });
  }

  /**
   * Проверяет, соответствует ли заголовок страницы ожидаемому.
   * @param expectedTitle - Ожидаемый заголовок страницы.
   */
  async validatePageTitle(expectedTitle: string) {
    const actualTitle = await this.page.title();

    await test.step(`Тайтл админ панели должен(а) иметь текст - ${expectedTitle}`, async () => {
      expect(actualTitle).toBe(expectedTitle);
    });
  }

  /**
   * Проверяет, соответствует ли URL страницы ожидаемому.
   * @param expectedURL - Ожидаемый URL.
   */
  async validatePageUrl(expectedURL: string) {
    const actualURL = this.page.url();

    await test.step(`URL страницы должен содержать - ${expectedURL}`, async () => {
      expect(actualURL).toContain(expectedURL);
    });
  }
}
