import { Page } from '@playwright/test';
import { Button, Typography } from '@core/components';
import { BasePage } from './BasePage';
import { pageContent } from '@core/helpers/constants';

export class AdminSystemSettigsPage extends BasePage {
  private readonly selectors = {
    h1: this.page.getByTestId('adminSystemSettingsH1'),
    settingsRequest: this.page.getByTestId('adminSystemSettingsSettingRequests'),
    generalSettings: this.page.getByTestId('adminSystemSettingsGeneralSetting'),
    certificateSettings: this.page.getByTestId('adminSystemSettingsCertificateSetting'),
    bannerSettings: this.page.getByTestId('adminSystemSettingsBannerSetting'),
    apiSettings: this.page.getByTestId('adminSystemSettingsApiSetting'),
    planSettings: this.page.getByTestId('adminSystemSettingsPlanSetting'),
  };

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.h1,
    name: 'Заголовок',
  });

  readonly generalSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.generalSettings,
    name: 'Кастомные поля',
  });

  readonly certificateSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.certificateSettings,
    name: 'Редактор сертификатов',
  });

  readonly bannerSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.bannerSettings,
    name: 'Редактор баннеров',
  });

  readonly apiSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.apiSettings,
    name: 'Настройка API',
  });

  readonly planSettingsTab = new Button({
    page: this.page,
    locator: this.selectors.planSettings,
    name: 'Планировщики',
  });

  constructor(public page: Page) {
    super(page);
  }

  async visit() {
    await super.visit('/var-directory');
  }

  async validateH1() {
    await this.h1.shouldHaveText(pageContent.cloud.admin.h1.ru.systemSettings);
  }

  async clickGeneralSettingsTab() {
    await this.generalSettingsTab.click();
  }

  async clickCertificateSettingsTab() {
    await this.certificateSettingsTab.click();
  }

  async clickBannerSettingsTab() {
    await this.bannerSettingsTab.click();
  }

  async clickApiSettingsTab() {
    await this.apiSettingsTab.click();
  }

  async clickPlanSettingsTab() {
    await this.planSettingsTab.click();
  }
}
