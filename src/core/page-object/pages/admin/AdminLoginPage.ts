import { Page } from '@playwright/test';
import { Input, Button, Span } from '@core/components';
import { BasePage } from './BasePage';

export class AdminLoginPage extends BasePage {
  private readonly selectors = {
    emailInput: this.page.getByTestId('loginUsernameInput'),
    passwordInput: this.page.getByTestId('loginPasswordInput'),
    loginBtn: this.page.getByTestId('loginBtn'),
    errorSpan: this.page.getByTestId('adminLoginErrorText'),
  };

  constructor(public page: Page) {
    super(page);
  }

  private readonly emailInput = new Input({
    page: this.page,
    locator: this.selectors.emailInput,
    name: 'Email',
  });

  private readonly passwordInput = new Input({
    page: this.page,
    locator: this.selectors.passwordInput,
    name: 'Пароль',
  });

  private readonly loginBtn = new Button({
    page: this.page,
    locator: this.selectors.loginBtn,
    name: 'Вход',
  });

  private readonly errorSpan = new Span({
    page: this.page,
    locator: this.selectors.errorSpan,
    name: 'Ошибка',
  });

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }

  /**
   * Проверяет текст ошибки на странице.
   * @param errorMessage - Ожидаемый текст ошибки.
   */
  async validateError(errorMessage: string) {
    await this.errorSpan.shouldHaveText(errorMessage);
  }
}
