import { Page, test } from '@playwright/test';
import { Button, Input, Span } from '@core/components';
import { BasePage } from '../BasePage/BasePage';

export class UserLoginPage extends BasePage {
  private readonly selectors = {
    emailInput: this.page.getByTestId('loginUsernameInput'),
    passwordInput: this.page.getByTestId('loginPasswordInput'),
    loginButton: this.page.getByTestId('loginBtn'),
    errorSpan: this.page.getByTestId('loginErrorText'),
    registrationAcceptBtn: this.page.getByTestId('userRegistrationBtn'),
    registrationBtn: this.page.locator('#btnRegistration'),
    registrationEmailInput: this.page.locator('#email'),
    registrationPasswordInput: this.page.locator('#newPassword'),
  };

  private readonly emailInput = new Input({
    page: this.page,
    locator: this.selectors.emailInput,
    name: 'Логин',
  });

  private readonly registrationEmailInput = new Input({
    page: this.page,
    locator: this.selectors.registrationEmailInput,
    name: 'Логин для регистрации',
  });

  private readonly registrationPasswordInput = new Input({
    page: this.page,
    locator: this.selectors.registrationPasswordInput,
    name: 'Пароль для регистрации',
  });

  private readonly passwordInput = new Input({
    page: this.page,
    locator: this.selectors.passwordInput,
    name: 'Пароль',
  });

  private readonly loginBtn = new Button({
    page: this.page,
    locator: this.selectors.loginButton,
    name: 'Логин',
  });

  private readonly registrationAcceptBtn = new Button({
    page: this.page,
    locator: this.selectors.registrationAcceptBtn,
    name: 'Зарегистрироваться',
  });

  private readonly registrationBtn = new Button({
    page: this.page,
    locator: this.selectors.registrationBtn,
    name: 'Регистрация',
  });

  private readonly errorSpan = new Span({
    page: this.page,
    locator: this.selectors.errorSpan,
    name: 'Текст ошибки',
  });

  constructor(public page: Page) {
    super(page);
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ METHODS                                                  ║
  //    ╚══════════════════════════════════════════════════════════╝

  async login(email: string, password: string) {
    await test.step('Заполнить поля и ввойти в систему', async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginBtn.click();
    });
  }

  async registration(email: string, password: string) {
    await test.step('Заполнить поля и подтвердить регистрацию', async () => {
      await this.registrationEmailInput.fill(email);
      await this.registrationPasswordInput.fill(password);
      await this.registrationAcceptBtn.click();
    });
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ VALIDATIONS                                              ║
  //    ╚══════════════════════════════════════════════════════════╝

  async validateError(errorMessage: string) {
    await this.errorSpan.shouldHaveText(errorMessage);
  }

  async validateLoginPageUrl() {
    await this.validatePageUrl('/');
  }
}
