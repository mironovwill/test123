import 'dotenv/config';
import { devices, Project } from '@playwright/test';

const cloudAdminProjects: Project[] = [
  {
    name: 'admin-setup',
    testMatch: ['global.setup.ts'],
    teardown: 'admin-teardown',
    use: {
      baseURL: process.env.KAMPUS_ADMIN_BASE_URL,
    },
  },
  {
    name: 'admin-teardown',
    testMatch: ['global.teardown.ts'],
    use: {
      baseURL: process.env.KAMPUS_ADMIN_BASE_URL,
    },
  },
  {
    name: 'Портал администратора - Chrome',
    testDir: './src/tests/admin',
    use: {
      storageState: '.auth/admin.json',
      permissions: ['clipboard-read', 'clipboard-write'],
      baseURL: process.env.KAMPUS_ADMIN_BASE_URL,
      ...devices['Desktop Chrome'],
    },
    dependencies: ['admin-setup'],
  },
];

const cloudUserProjects: Project[] = [
  {
    name: 'user-setup',
    testMatch: ['global.setup.ts'],
    teardown: 'user-teardown',
    use: {
      baseURL: process.env.KAMPUS_ADMIN_BASE_URL,
    },
  },
  {
    name: 'user-teardown',
    testMatch: ['global.teardown.ts'],
    use: {
      baseURL: process.env.KAMPUS_ADMIN_BASE_URL,
    },
  },
  {
    name: 'Портал пользователя - Chrome',
    testDir: './src/tests/user',
    use: {
      baseURL: process.env.KAMPUS_USER_BASE_URL,
      storageState: '.auth/user.json',
      ...devices['Desktop Chrome'],
    },
    dependencies: ['user-setup'],
  },
];

export const cloudGlobalProjects: Project[] = [...cloudAdminProjects, ...cloudUserProjects];
