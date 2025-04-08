import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Select, Span } from '@core/components';

export class AdminProfileSettingPage extends BasePage {
  private readonly selectors = {
    h1: this.page.locator('#adminProfileSettingsH1'),
    languageSelect: this.page.getByTestId('adminProfileSettingsLanguageSelect'),
    resultList: this.page.locator('.rc-virtual-list-holder-inner'),
  };

  constructor(public page: Page) {
    super(page);
  }

  private readonly h1 = new Span({
    page: this.page,
    locator: this.selectors.h1,
    name: 'H1',
  });

  private readonly languageSelect = new Select({
    page: this.page,
    locator: this.selectors.languageSelect,
    name: 'Язык',
  });

  private readonly resultList = new Select({
    page: this.page,
    locator: this.selectors.resultList,
    name: 'Список элементов',
  });

  async visit() {
    await super.visit('/profile-setting');
  }

  async validateH1(text: string) {
    await this.h1.shouldHaveText(text);
  }

  async selectLanguage(language: string) {
    await this.languageSelect.shouldBeEnabled();

    await this.languageSelect.click();
    await this.resultList.selectItemByTitle(language);
  }
}
