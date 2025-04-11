import { Page } from '@playwright/test';
import { Modal, Input, Select, Button } from '@core/components';
import { UserData } from '@core/types';

export class CreateUserModal {
  private readonly selectors = {
    userModalWindow: this.page.locator('//div[@data-qa="createUserModal"]/div/div'),
    userModalFirstNameInput: this.page.getByTestId('createUserModalFirstNameInput'),
    userModalLastNameInput: this.page.getByTestId('createUserModalLastNameInput'),
    userModalMiddleNameInput: this.page.getByTestId('createUserModalMiddleNameInput'),
    userModalEmailInput: this.page.getByTestId('createUserModalEmailInput'),
    userModalPasswordInput: this.page.getByTestId('createUserModalPasswordInput'),
    userModalConfirmPasswordInput: this.page.getByTestId('createUserModalConfirmPasswordInput'),
    userModalRoleSelectInput: this.page.locator('#createUserModalRoleSelect'),
    userModalRoleSelectResults: this.page.locator(
      '//div[@id="createUserModalRoleSelect_list"]/../div[2]/div/div',
    ),
    userModalDepartmentSelectInput: this.page.locator('#createUserModalDepartmentSelect'),
    userModalDepartmentSelectResults: this.page.locator(
      '//div[@id="createUserModalDepartmentSelect_list"]/../div[2]/div/div',
    ),
    userModalFunctionInput: this.page.getByTestId('createUserModalFunctionInput'),
    userModalPositionSelectInput: this.page.locator('#createUserModalPositionSelect'),
    userModalPositionSelectResults: this.page.locator(
      '//div[@id="createUserModalPositionSelect_list"]/../div[2]/div/div',
    ),
    userModalLocationInput: this.page.getByTestId('createUserModalLocationInput'),
    userModalCompanyInput: this.page.getByTestId('createUserModalSubCompanyInput'),
    userModalManagerSelectInput: this.page.locator('#createUserModalManagerSelect'),
    userModalManagerSelectResults: this.page.locator(
      '//div[@id="createUserModalManagerSelect_list"]/../div[2]/div/div',
    ),
    userModalCreateUserSubmitBtn: this.page.getByTestId('createUserSubmitBtn'),
    userModalPhoneInput: this.page.getByTestId('createUserModalPhoneInput'),
  };

  private readonly submitBtn = new Button({
    page: this.page,
    locator: this.selectors.userModalCreateUserSubmitBtn,
    name: 'Создать',
  });

  private readonly modalWindow = new Modal({
    page: this.page,
    locator: this.selectors.userModalWindow,
    name: 'Окно создания пользователя',
  });

  private readonly firstNameInput = new Input({
    page: this.page,
    locator: this.selectors.userModalFirstNameInput,
    name: 'Имя',
  });

  private readonly lastNameInput = new Input({
    page: this.page,
    locator: this.selectors.userModalLastNameInput,
    name: 'Фамилия',
  });

  private readonly middleNameInput = new Input({
    page: this.page,
    locator: this.selectors.userModalMiddleNameInput,
    name: 'Отчество',
  });

  private readonly emailInput = new Input({
    page: this.page,
    locator: this.selectors.userModalEmailInput,
    name: 'Электронная почта',
  });

  private readonly phoneInput = new Input({
    page: this.page,
    locator: this.selectors.userModalPhoneInput,
    name: 'Номер телефона',
  });

  private readonly passwordInput = new Input({
    page: this.page,
    locator: this.selectors.userModalPasswordInput,
    name: 'Пароль',
  });

  private readonly confirmPasswordInput = new Input({
    page: this.page,
    locator: this.selectors.userModalConfirmPasswordInput,
    name: 'Подтверждение пароля',
  });

  private readonly roleSelectInput = new Input({
    page: this.page,
    locator: this.selectors.userModalRoleSelectInput,
    name: 'Роль',
  });

  private readonly roleSelectResultsList = new Select({
    page: this.page,
    locator: this.selectors.userModalRoleSelectResults,
    name: 'Список ролей',
  });

  private readonly departmentSelectInput = new Input({
    page: this.page,
    locator: this.selectors.userModalDepartmentSelectInput,
    name: 'Отдел',
  });

  private readonly departmentSelectResultsList = new Select({
    page: this.page,
    locator: this.selectors.userModalDepartmentSelectResults,
    name: 'Список отделов',
  });

  private readonly functionInput = new Input({
    page: this.page,
    locator: this.selectors.userModalFunctionInput,
    name: 'Функция',
  });

  private readonly positionSelectInput = new Input({
    page: this.page,
    locator: this.selectors.userModalPositionSelectInput,
    name: 'Должность',
  });

  private readonly positionSelectResultsList = new Select({
    page: this.page,
    locator: this.selectors.userModalPositionSelectResults,
    name: 'Список должнойстей',
  });

  private readonly locationInput = new Input({
    page: this.page,
    locator: this.selectors.userModalLocationInput,
    name: 'Местоположение',
  });

  private readonly companyInput = new Input({
    page: this.page,
    locator: this.selectors.userModalCompanyInput,
    name: 'Компания',
  });

  private readonly managerSelectInput = new Input({
    page: this.page,
    locator: this.selectors.userModalManagerSelectInput,
    name: 'Менеджер',
  });

  private readonly managerSelectResultsList = new Select({
    page: this.page,
    locator: this.selectors.userModalManagerSelectResults,
    name: 'Список менеджеров',
  });

  constructor(public page: Page) {}

  async validateUserCreateModalVisible() {
    await this.modalWindow.shouldBeVisible();
  }

  async fillFioInputs({ firstName, lastName, middleName }: UserData) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    if (middleName) {
      await this.middleNameInput.fill(middleName);
    }
  }

  async fillEmailInput(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPasswordInputs({ password, confirmPassword }: UserData) {
    await this.passwordInput.fill(password);

    if (confirmPassword) {
      await this.confirmPasswordInput.fill(confirmPassword);
    }
  }

  async selectRole(role: string) {
    await this.roleSelectInput.fill(role);
    await this.roleSelectResultsList.selectItemByTitle(role);
  }

  async fillLocationInput(location: string) {
    await this.locationInput.fill(location);
  }

  async fillCompanyInput(company: string) {
    await this.companyInput.fill(company);
  }

  async selectPosition(position: string) {
    await this.positionSelectInput.fill(position);
    await this.positionSelectResultsList.selectItemByTitle(position);
  }

  async fillPhoneInput(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async selectManager(manager: string) {
    await this.managerSelectInput.fill(manager);
    await this.managerSelectResultsList.selectItemByTitle(manager);
  }

  async selectDepartment(department: string) {
    await this.departmentSelectInput.fill(department);
    await this.departmentSelectResultsList.selectItemByTitle(department);
  }

  async getUserIdFromResponse(page: Page) {
    const response = await page
      .waitForResponse(response => response.url().includes('/register/any'))
      .catch(e => {
        throw e;
      });

    const responseBody = await response.json();
    return responseBody.id;
  }

  async createUser(userData: UserData) {
    await this.validateUserCreateModalVisible();
    await this.fillFioInputs(userData);
    await this.fillEmailInput(userData.email);
    await this.fillPhoneInput(userData.phone);
    await this.fillPasswordInputs(userData);
    await this.selectRole(userData.roleId);

    const optionalFields = [
      { value: userData.department, action: () => this.selectDepartment(userData.department!) },
      { value: userData.function, action: () => this.functionInput.fill(userData.function!) },
      { value: userData.position, action: () => this.selectPosition(userData.position!) },
      { value: userData.location, action: () => this.fillLocationInput(userData.location!) },
      { value: userData.subCompany, action: () => this.fillCompanyInput(userData.subCompany!) },
      { value: userData.manager, action: () => this.selectManager(userData.manager!) },
    ];

    for (const field of optionalFields) {
      if (field.value) {
        await field.action();
      }
    }

    await this.submitBtn.click();
  }
}
