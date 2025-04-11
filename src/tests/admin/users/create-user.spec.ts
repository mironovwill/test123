import { faker } from '@faker-js/faker';
import { epic, feature } from 'allure-js-commons';
import { appFixture as test } from '@core/fixtures';
import { UserData } from '@core/types';
import testData from '@test-data';

const userData: UserData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'national' }),
  password: '123123',
  confirmPassword: '123123',
  roleId: 'Руководитель',
  department: testData.structures.departments[2],
  function: faker.company.name(),
  position: testData.structures.positions[3],
  location: faker.location.city(),
  subCompany: faker.company.name(),
  manager: `${testData.users.manager.lastName} ${testData.users.manager.firstName}`,
};

test.describe(
  'Создание пользователя в разделе "Сотрудники"',
  { tag: ['@Smoke', '@Admin', '@Приложение'] },
  () => {
    let userId: number;

    test.beforeEach(async ({ adminUsersPage }) => {
      await epic('Панель администратора');
      await feature('Создание пользователей');
      await adminUsersPage.visit();
    });

    test.afterAll(async ({ adminApiClient }) => {
      await test.step('Блокировка пользователя', async () => {
        await adminApiClient.lockUserLogin(userId);
      });
    });

    test('Создания и првоерка пользователя пользователя @allure.id=', async ({
      adminUsersPage,
    }) => {
      const userFullname = `${userData.lastName} ${userData.firstName} ${userData.middleName}`;

      await test.step('Создание пользователя', async () => {
        await adminUsersPage.validateH1();
        await adminUsersPage.clickAddUserBtn();
        await adminUsersPage.createUserModal.createUser(userData);
        userId = await adminUsersPage.createUserModal.getUserIdFromResponse(adminUsersPage.page);
      });

      await test.step('Поиск и проверка созданного пользователя', async () => {
        await adminUsersPage.searchByFio(userFullname);
        await adminUsersPage.openUserCardModal();
        await adminUsersPage.userPersonalInfoModal.validateUserModalInfo(userData);
      });
    });
  },
);
