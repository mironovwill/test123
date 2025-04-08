import { Page, test } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { Typography } from '@core/components';
import { pageContent } from '@core/helpers/constants';
import { Header } from '@core/page-object/components/user';

export class UserCollectionTopicsPage extends BasePage {
  private readonly selectors = {
    h1: this.page.getByTestId('userCollectionTopicH1'),
  };

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.h1,
    name: 'База знаний',
  });

  readonly header = new Header(this.page);

  constructor(public page: Page) {
    super(page);
  }

  async validateH1Text() {
    await test.step(`Проверить отображение h1 на странице базы знаний`, async () => {
      await this.h1.shouldBeVisible();
      await this.h1.shouldHaveText(pageContent.cloud.user.h1.ru.collectionTopics);
    });
  }
}
