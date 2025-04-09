import { Page } from '@playwright/test';
import { Input, Select, Checkbox } from '@core/components';

export class CertificateFields {
  private readonly selectors = {
    certificateSeriesInput: this.page.getByTestId('certificateSeries'),
    certificateNumbersMinInput: this.page.getByTestId('certificateNumbersMin'),
    certificateNumbersMaxInput: this.page.getByTestId('certificateNumbersMax'),
    certificateInput: this.page.locator('[data-qa="certificateId"]').locator('div'),
    hasCertificateCheckbox: this.page.getByTestId('hasCertificate'),
    certificateOptionsContainer: this.page.locator('.rc-virtual-list-holder-inner'),
  };

  constructor(public page: Page) {}

  private readonly certificateSeriesInput = new Input({
    page: this.page,
    locator: this.selectors.certificateSeriesInput,
    name: 'Серия сертификата',
  });

  private readonly certificateNumbersMinInput = new Input({
    page: this.page,
    locator: this.selectors.certificateNumbersMinInput,
    name: 'Начальный номер сертификата',
  });

  private readonly certificateNumbersMaxInput = new Input({
    page: this.page,
    locator: this.selectors.certificateNumbersMaxInput,
    name: 'Конечный номер сертификата',
  });

  private readonly certificateInput = new Input({
    page: this.page,
    locator: this.selectors.certificateInput,
    name: 'Выбрать шаблон',
  });

  private readonly hasCertificateCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.hasCertificateCheckbox,
    name: 'Есть сертификат',
  });

  private readonly certificateOptionsContainer = new Select({
    page: this.page,
    locator: this.selectors.certificateOptionsContainer,
    name: 'Список сертификатов',
  });

  async fillCertificateSeries(certificateSeries: string) {
    await this.certificateSeriesInput.fill(certificateSeries);
  }

  async fillCertificateNumbersMin(certificateNumbersMin: string) {
    await this.certificateNumbersMinInput.fill(certificateNumbersMin);
  }

  async fillCertificateNumbersMax(certificateNumbersMax: string) {
    await this.certificateNumbersMaxInput.fill(certificateNumbersMax);
  }

  async selectCertificate(certificateName: string) {
    await this.certificateInput.click();
    await this.certificateOptionsContainer.selectItemByTitle(certificateName);
  }

  async checkHasCertificateCheckbox() {
    await this.hasCertificateCheckbox.check();
  }

  async validateHasCertificateCheckbox() {
    await this.hasCertificateCheckbox.shouldBeChecked();
  }
}
