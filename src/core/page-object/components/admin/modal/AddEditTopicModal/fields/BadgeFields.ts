import { Page } from '@playwright/test';
import { Checkbox, Input, Select } from '@core/components';

export class BadgeFields {
  constructor(public page: Page) {}

  private readonly hasBadgeCheckbox = new Checkbox({
    page: this.page,
    locator: this.page.getByTestId('hasBadge'),
    name: 'Награда',
  });

  private readonly badgeInput = new Input({
    page: this.page,
    locator: this.page.locator('//div[@data-qa="badgeId"]/div/span/span/input'),
    name: 'Присвоить награду',
  });

  private readonly badgeResultList = new Select({
    page: this.page,
    locator: this.page.locator('.rc-virtual-list-holder-inner'),
    name: 'Награды',
  });

  /**
   * Выбирает награду из выпадающего списка
   * @param {string} badgeName - Название награды
   * @returns {Promise<void>}
   */
  async selectBadge(badgeName: string) {
    await this.badgeInput.click();
    await this.badgeResultList.selectItemByTitle(badgeName);
  }

  /**
   * Устанавливает чекбокс награды
   * @returns {Promise<void>}
   */
  async checkBadgeCheckbox() {
    await this.hasBadgeCheckbox.check();
  }

  /**
   * Проверяет, что чекбокс награды установлен
   * @returns {Promise<void>}
   */
  async validateHasBadgeCheckbox() {
    await this.hasBadgeCheckbox.shouldBeChecked();
  }
}
