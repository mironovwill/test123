import { Page } from '@playwright/test';
import { Checkbox, Input, Select } from '@core/components';

export class BookFields {
  private readonly selectors = {
    addressBookInput: this.page.locator('#addressBookInput'),
    inPaperCheckbox: this.page.locator('[name="qiwiLibrary"]'),
    resultList: this.page.locator('.rc-virtual-list-holder-inner'),
  };

  constructor(public page: Page) {}

  private readonly addressBookInput = new Input({
    page: this.page,
    locator: this.selectors.addressBookInput,
    name: 'Адресная книга',
  });

  private readonly inPaperCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.inPaperCheckbox,
    name: 'В бумажном виде',
  });

  private readonly resultList = new Select({
    page: this.page,
    locator: this.selectors.resultList,
    name: 'Список адресов',
  });

  async fillAddressBookInput(address: string) {
    await this.addressBookInput.fill(address);
    await this.resultList.selectItemByTitle(address);
  }

  async checkInPaperCheckbox() {
    await this.inPaperCheckbox.check();
  }
}
