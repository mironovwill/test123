import 'dotenv/config';
import { devices, Project } from '@playwright/test';

const cloudAdminProjects: Project[] = [
  {
    testMatch: ['global.setup.ts'],
    teardown: 'global-teardown',
    name: 'global-setup',
  },
  {
    name: 'global-teardown',
    testMatch: ['global.teardown.ts'],
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
    dependencies: ['global-setup'],
  },
  {
    name: 'Портал пользователя - Chrome',
    testDir: './src/tests/user',
    use: {
      baseURL: process.env.KAMPUS_USER_BASE_URL,
      storageState: '.auth/user.json',
      ...devices['Desktop Chrome'],
    },
    dependencies: ['global-setup'],
  },
];

export const cloudGlobalProjects: Project[] = [...cloudAdminProjects];
