import { expect, Page, test } from '@playwright/test';
import { Button } from '@core/components';

export class Header {
  private readonly selectors = {
    headerUserBlockMenu: this.page.getByTestId('userBlock'),
    headerUserDropdownExitBtn: this.page.locator(
      '//li[@id="headerUserDropdownMenuExitBtn"][@class="ant-dropdown-menu-item"]',
    ),
    headerUserDropdownAdminBtn: this.page.locator('//li[@id="headerLoginToAdminBtn"][@class="ant-dropdown-menu-item"]'),
  };

  private readonly headerBlockMenu = new Button({
    page: this.page,
    locator: this.selectors.headerUserBlockMenu,
    name: 'Блок пользователя',
  });

  private readonly headerUserDropdownExitBtn = new Button({
    page: this.page,
    locator: this.selectors.headerUserDropdownExitBtn,
    name: 'Выйти',
  });

  private readonly headerUserDropdownAdminBtn = new Button({
    page: this.page,
    locator: this.selectors.headerUserDropdownAdminBtn,
    name: 'Панель управления',
  });

  constructor(public page: Page) {}

  async goToAdminDashboard() {
    await test.step('Перейти в портал администратора', async () => {
      await this.headerBlockMenu.click();

      const [newPage] = await Promise.all([this.page.waitForEvent('popup'), this.headerUserDropdownAdminBtn.click()]);

      await newPage.waitForURL(`${process.env.KAMPUS_ADMIN_BASE_URL}`, { waitUntil: 'domcontentloaded' });
      expect(newPage.url()).toEqual(`${process.env.KAMPUS_ADMIN_BASE_URL}/`);
      await newPage.close();
    });
  }

  async exitFromAccount() {
    await test.step('Выйти с аккаунта', async () => {
      await this.headerBlockMenu.click();
      await this.headerUserDropdownExitBtn.click();
    });
  }
}
