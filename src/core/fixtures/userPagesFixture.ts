import { UserCollectionTopicsPage, UserLoginPage } from '@core/page-object/pages/user';
import { Page } from '@playwright/test';

export interface UserPagesFixture {
  userLoginPage: UserLoginPage;
  userCollectionTopicsPage: UserCollectionTopicsPage;
}

export const userPagesFixture = {
  userLoginPage: async ({ page }: { page: Page }, use: (page: UserLoginPage) => Promise<void>) => {
    const userLoginPage = new UserLoginPage(page);
    await use(userLoginPage);
  },
  userCollectionTopicsPage: async (
    { page }: { page: Page },
    use: (page: UserCollectionTopicsPage) => Promise<void>,
  ) => {
    const userCollectionTopicsPage = new UserCollectionTopicsPage(page);
    await use(userCollectionTopicsPage);
  },
};
