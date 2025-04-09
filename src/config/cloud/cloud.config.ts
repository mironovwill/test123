import 'dotenv/config';
import { devices, Project } from '@playwright/test';

const cloudAdminProjects: Project[] = [
  {
    name: 'Портал администратора - Chrome',
    testDir: './src/tests/admin',
    use: {
      storageState: '.auth/admin.json',
      permissions: ['clipboard-read', 'clipboard-write'],
      baseURL: process.env.KAMPUS_ADMIN_BASE_URL,
      ...devices['Desktop Chrome'],
    },
  },
];

const cloudUserProjects: Project[] = [
  {
    name: 'Портал пользователя - Chrome',
    testDir: './src/tests/user',
    use: {
      baseURL: process.env.KAMPUS_USER_BASE_URL,
      storageState: '.auth/user.json',
      ...devices['Desktop Chrome'],
    },
  },
];

export const cloudGlobalProjects: Project[] = [...cloudAdminProjects, ...cloudUserProjects];
