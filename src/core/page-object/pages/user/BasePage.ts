import { expect, Page, test } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async visit(url: string) {
    await test.step(`Открытие url "${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  async reload() {
    const url = this.page.url();

    await test.step(`Перезагрузка страницы с url "${url}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }

  async validatePageTitle(expectedTitle: string) {
    const actualTitle = await this.page.title();

    await test.step(`Тайтл портала пользователя должен(а) иметь текст - ${expectedTitle}`, async () => {
      expect(actualTitle).toBe(expectedTitle);
    });
  }

  async validatePageUrl(expectedURL: string) {
    const actualURL = this.page.url();

    await test.step(`URL страницы должен содержать - ${expectedURL}`, async () => {
      expect(actualURL).toContain(expectedURL);
    });
  }
}
