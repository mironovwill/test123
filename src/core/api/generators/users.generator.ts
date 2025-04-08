import { AdminApiClient } from '@core/api/clients/admin.client';
import { userGenerator } from '@core/api/generators';

/**
 * Генерирует и создает начальных пользователей с разными ролями.
 * @param adminApiClient - Клиент для работы с административным API.
 * @param testData - Объект с данными, необходимыми для создания пользователей:
 * - `department`: ID отдела.
 * - `function`: Название должности.
 * - `position`: Позиция.
 * - `managerId`: ID менеджера.
 * @returns Объект с созданными пользователями:
 * - `admin`: Пользователь с ролью администратора.
 * - `manager`: Пользователь с ролью менеджера.
 * - `user`: Пользователь с ролью обычного пользователя.
 * - `bannedUser`: Пользователь с ролью администратора (заблокированный).
 */
export const generateUsers = async (
  adminApiClient: AdminApiClient,
  testData: { department: number; function: string; position: number; managerId: number },
) => {
  const baseUserParams = {
    department: testData.department,
    function: testData.function,
    position: testData.position,
    managerId: testData.managerId,
  };

  const users = {
    admin: userGenerator({ ...baseUserParams, roleId: 2 }),
    manager: userGenerator({ ...baseUserParams, roleId: 3 }),
    user: userGenerator({ ...baseUserParams, roleId: 4 }),
    bannedUser: userGenerator({ ...baseUserParams, roleId: 2 }),
  };

  const [admin, manager, user, bannedUser] = await Promise.all([
    adminApiClient.createUser(users.admin),
    adminApiClient.createUser(users.manager),
    adminApiClient.createUser(users.user),
    adminApiClient.createUser(users.bannedUser),
  ]);

  return {
    admin,
    manager,
    user,
    bannedUser,
  };
};
