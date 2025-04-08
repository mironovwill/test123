import { Page, expect, test } from '@playwright/test';
import { Button } from '@core/components';

export class Menu {
  private readonly selectors = {
    accessMenuItem: this.page.locator('[href="/access"]'),
    accessVarDirectoryMenuItem: this.page.locator('[href="/var-directory"]'),
    menuList: this.page.locator('[role="menu"]'),
  };

  constructor(public page: Page) {}

  private readonly accessMenuItem = new Button({
    page: this.page,
    locator: this.selectors.accessMenuItem,
    name: 'Настройки доступа"',
  });

  private readonly accessVarDirectoryMenuItem = new Button({
    page: this.page,
    locator: this.selectors.accessVarDirectoryMenuItem,
    name: 'Настройки системы"',
  });

  async validateAdminHasNoLinksInMenu() {
    await test.step(`Проверить, что у администратора нет ссылок в меню`, async () => {
      await expect(this.selectors.menuList.locator('li')).toHaveCount(19);
      await this.accessMenuItem.shouldBeHidden();
      await this.accessVarDirectoryMenuItem.shouldBeHidden();
    });
  }

  async validateManagerHasNoLinksInMenu() {
    await test.step(`Проверить, что у менеджера нет ссылок в меню`, async () => {
      await expect(this.selectors.menuList.locator('li')).toHaveCount(10);
      await this.accessMenuItem.shouldBeHidden();
      await this.accessVarDirectoryMenuItem.shouldBeHidden();
    });
  }
}
