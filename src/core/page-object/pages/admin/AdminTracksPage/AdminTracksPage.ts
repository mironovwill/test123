import { Page } from '@playwright/test';
import { Typography, Button } from '@core/components';
import { BasePage } from '../BasePage/BasePage';
import { pageContent } from '@core/helpers/constants';

export class AdminTracksPage extends BasePage {
  private readonly selectors = {
    h1: this.page.getByTestId('adminTracksPageH1'),
    createTrackBtn: this.page.getByTestId('adminTraksPageCreateTrackBtn'),
  };

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.h1,
    name: 'Заголовок',
  });

  private readonly createTrackBtn = new Button({
    page: this.page,
    locator: this.selectors.createTrackBtn,
    name: 'Создать трек',
  });

  constructor(public page: Page) {
    super(page);
  }

  async visit() {
    await super.visit('/tracks');
  }

  async validateH1() {
    await this.h1.shouldHaveText(pageContent.cloud.admin.h1.ru.tracks);
  }

  async clickCreateTrackBtn() {
    await this.createTrackBtn.click();
  }
}
