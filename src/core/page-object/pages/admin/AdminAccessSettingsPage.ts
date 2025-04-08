import { Page } from '@playwright/test';
import { Button, Typography } from '@core/components';
import { BasePage } from './BasePage';
import { pageContent } from '@core/helpers/constants';

export class AdminAccessSettingsPage extends BasePage {
  private readonly selectors = {
    H1: this.page.getByTestId('adminAccessSettingsH1'),
    userSettings: this.page.getByTestId('adminAccessSettingsUserManagement'),
    roleSettings: this.page.getByTestId('adminAccessSettingsRoleSettings'),
  };

  constructor(public page: Page) {
    super(page);
  }

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.H1,
    name: 'Заголовок',
  });

  readonly userSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.userSettings,
    name: 'Управление пользователями',
  });

  readonly roleSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.roleSettings,
    name: 'Настройка ролей',
  });

  async visit() {
    await super.visit('/access');
  }

  async validateH1() {
    await this.h1.shouldHaveText(pageContent.cloud.admin.h1.ru.accessSettings);
  }
}
