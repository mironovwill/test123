import 'dotenv/config';
import { devices, Project } from '@playwright/test';

export const cloudAdminProjects: Project[] = [
  {
    name: 'admin-setup',
    testMatch: ['admin.global.setup.ts'],
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
