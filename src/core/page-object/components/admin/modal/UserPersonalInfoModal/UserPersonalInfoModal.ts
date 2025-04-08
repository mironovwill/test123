import { Page } from '@playwright/test';
import { Typography } from '@core/components';
import { UserData } from '../CreateUserModal/CreateUserModal';

export class UserPersonalInfoModal {
  private readonly selectors = {
    userPersonalInfoModal: this.page.getByTestId('userPersonalInfoModal'),
    userPersonalInfoModalFullName: this.page.getByTestId('userPersonalInfoModalFullName'),
    userPersonalInfoModalDepartment: this.page.getByTestId('userPersonalInfoModalDepartment'),
    userPersonalInfoModalPosition: this.page.getByTestId('userPersonalInfoModalPosition'),
    userPersonalInfoModalPhone: this.page.getByTestId('userPersonalInfoModalPhone'),
    userPersonalInfoModalEmail: this.page.getByTestId('userPersonalInfoModalEmail'),
    userPersonalInfoModalMainCompany: this.page.getByTestId('userPersonalInfoModalMainCompany'),
    userPersonalInfoModalCompany: this.page.getByTestId('userPersonalInfoModalCompany'),
    userPersonalInfoModalManager: this.page.getByTestId('userPersonalInfoModalManager'),
    userPersonalInfoModalFunction: this.page.locator('//div[@data-qa="userPersonalInfoModalFunction"]/div[2]/div'),
  };

  private readonly userPersonalInfoModal = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModal,
    name: 'Модалка с персональной информацией',
  });

  private readonly userPersonalInfoModalFullName = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalFullName,
    name: 'Полное имя',
  });

  private readonly userPersonalInfoModalDepartment = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalDepartment,
    name: 'Отдел',
  });

  private readonly userPersonalInfoModalPosition = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalPosition,
    name: 'Должность',
  });

  private readonly userPersonalInfoModalPhone = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalPhone,
    name: 'Номер телефона',
  });

  private readonly userPersonalInfoModalEmail = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalEmail,
    name: 'Почта',
  });

  private readonly userPersonalInfoModalCompany = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalCompany,
    name: 'Компания',
  });

  private readonly userPersonalInfoModalManager = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalManager,
    name: 'Руководитель',
  });

  private readonly userPersonalInfoModalFunction = new Typography({
    page: this.page,
    locator: this.selectors.userPersonalInfoModalFunction,
    name: 'Функция',
  });

  constructor(public page: Page) {}

  private async validateFullName(fullName: string) {
    await this.userPersonalInfoModalFullName.shouldHaveText(fullName);
  }

  private async validateDepartment(department: string) {
    await this.userPersonalInfoModalDepartment.shouldHaveText(department);
  }

  private async validatePosition(position: string) {
    await this.userPersonalInfoModalPosition.shouldHaveText(position);
  }

  private async validatePhone(phone: string) {
    const cleanedNumber = phone.replace(/\D/g, '');

    await this.userPersonalInfoModalPhone.shouldHaveText(`+${cleanedNumber}`);
  }

  private async validateEmail(email: string) {
    await this.userPersonalInfoModalEmail.shouldHaveText(email.toLowerCase());
  }

  private async validateCompany(company: string) {
    await this.userPersonalInfoModalCompany.shouldHaveText(company);
  }

  private async validateManager(manager: string) {
    await this.userPersonalInfoModalManager.shouldHaveText(manager);
  }

  private async validateFunction(func: string) {
    await this.userPersonalInfoModalFunction.shouldHaveText(func);
  }

  async validateUserModalInfo(userData: UserData) {
    const fullName = `${userData.lastName} ${userData.firstName} ${userData.middleName}`;

    await this.userPersonalInfoModal.shouldBeVisible();
    await this.validateFullName(fullName);
    await this.validatePhone(userData.phone);
    await this.validateEmail(userData.email);

    if (userData.department) {
      await this.validateDepartment(userData.department);
    }
    if (userData.position) {
      await this.validatePosition(userData.position);
    }
    if (userData.subCompany) {
      await this.validateCompany(userData.subCompany);
    }
    if (userData.manager) {
      await this.validateManager(userData.manager);
    }
    if (userData.function) {
      await this.validateFunction(userData.function);
    }
  }
}
