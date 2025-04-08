import { expect, Page } from '@playwright/test';
import { Typography, Button, Input } from '@core/components';
import { BasePage } from './BasePage';
import { pageContent } from '@core/helpers/constants';
import { UserPersonalInfoModal, CreateUserModal } from '@core/page-object/components/admin';

export class AdminUsersPage extends BasePage {
  private readonly selectors = {
    h1: this.page.getByTestId('usersH1'),
    createUserBtn: this.page.getByTestId('createUserBtn'),
    searchByFioInput: this.page.locator('//input[@dataqa="adminUsersFullNameSearchInput"]'),
    searchUserName: this.page.getByTestId('adminUsersUserItemName'),
  };

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.h1,
    name: 'Заголовок',
  });

  private readonly createUserBtn = new Button({
    page: this.page,
    locator: this.selectors.createUserBtn,
    name: 'Создать пользователя',
  });

  private readonly fioSearchInput = new Input({
    page: this.page,
    locator: this.selectors.searchByFioInput,
    name: 'ФИО',
  });

  private readonly searchUserName = new Typography({
    page: this.page,
    locator: this.selectors.searchUserName,
    name: 'Имя пользователя',
  });

  readonly createUserModal = new CreateUserModal(this.page);
  readonly userPersonalInfoModal = new UserPersonalInfoModal(this.page);

  constructor(public page: Page) {
    super(page);
  }

  async visit() {
    await super.visit('/users');
  }

  async validateH1() {
    await this.h1.shouldHaveText(pageContent.cloud.admin.h1.ru.users);
  }

  async searchByFio(value: string) {
    await this.fioSearchInput.type(value, 200);
    await this.page.keyboard.press('Enter');
    await this.validateFirstUserName(value);
  }

  async validateFirstUserName(name: string) {
    const firstUserName = this.searchUserName.locator.first();
    await expect(firstUserName).toHaveText(name);
  }

  async openUserCardModal() {
    await this.searchUserName.locator.first().click();
  }

  async clickAddUserBtn() {
    await this.createUserBtn.click();
  }
}
