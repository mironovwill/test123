import { Page, expect, test } from '@playwright/test';
import { Button } from '@core/components';
import { links } from '@core/helpers/constants';

export class Header {
  private readonly selectors = {
    redirectToUserPartBtn: this.page.locator('#redirectToUserPartBtn'),
    instructionsBtn: this.page.locator('#instructionsBtn'),
  };

  constructor(public page: Page) {}

  private readonly redirectToUserPartBtn = new Button({
    page: this.page,
    locator: this.selectors.redirectToUserPartBtn,
    name: 'Перейти в пользовательскую часть',
  });

  private readonly instructionsBtn = new Button({
    page: this.page,
    locator: this.selectors.instructionsBtn,
    name: 'Инструкции',
  });

  /**
   * Проверяет видимость и атрибут кнопки "Инструкции"
   * @returns {Promise<void>}
   */
  async validateInstructionsBtn() {
    await test.step(`Кнопка "Инструкции" должна иметь href - "${links.cloud.admin.jiraCustomerPortal}"`, async () => {
      await this.instructionsBtn.shouldBeVisible();
      await this.instructionsBtn.shouldHaveAttribute('href');
      const href = await this.instructionsBtn.returnAttributeValue('href');
      expect.soft(href).toContain(links.cloud.admin.jiraCustomerPortal);
    });
  }

  /**
   * Нажимает на кнопку "Пользовательская часть"
   * @returns {Promise<void>}
   */
  async clickRedirectToUserPartBtn({ saveState = false }: { saveState?: boolean } = {}) {
    await test.step(`При нажатии на кнопку "Пользовательская часть" юзер перенаправлен в юзер часть`, async () => {
      const [newPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.redirectToUserPartBtn.click(),
      ]);
      const newPageUrl = newPage.url();
      expect.soft(newPageUrl).toContain(process.env.KAMPUS_USER_BASE_URL);

      if (saveState) {
        await newPage.getByTestId('userCollectionTopicH1').waitFor({ state: 'visible' });
        await newPage.context().storageState({ path: '.auth/user.json' });
      }

      await newPage.close();
    });
  }
}
