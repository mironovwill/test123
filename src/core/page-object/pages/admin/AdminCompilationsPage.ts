import { Page } from '@playwright/test';
import { Button, Typography } from '@core/components';
import { BasePage } from './BasePage';
import { pageContent } from '@core/helpers/constants';

export class AdminCompilationsPage extends BasePage {
  private readonly selectors = {
    H1: this.page.getByTestId('adminCompilationsH1'),
    ADD_COMPILATION_BTN: this.page.getByTestId('addCompilationBtn'),
    SEARCH_COMPIALTION_INPUT: this.page.getByTestId('compilationSearchInput'),
  };

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.H1,
    name: 'Заголовок',
  });

  private readonly addCompilationBtn = new Button({
    page: this.page,
    locator: this.selectors.ADD_COMPILATION_BTN,
    name: 'Создать подборку',
  });

  constructor(public page: Page) {
    super(page);
  }

  async visit() {
    await super.visit('/compilations');
  }

  async validateH1() {
    await this.h1.shouldHaveText(pageContent.cloud.admin.h1.ru.compilations);
  }

  async clickAddCompilationBtn() {
    await this.addCompilationBtn.click();
  }
}
