import { Page } from '@playwright/test';
import { Button, Modal } from '@core/components';
import { BadgeFields, BasicFields, BookFields, CertificateFields, ECourseFields, EventFields } from './fields';

export class EditAddTopicModal {
  readonly basicFields: BasicFields;
  readonly badgeFields: BadgeFields;
  readonly bookFields: BookFields;
  readonly certificateFields: CertificateFields;
  readonly eCourseFields: ECourseFields;
  readonly eventFields: EventFields;

  constructor(public page: Page) {
    this.basicFields = new BasicFields(page);
    this.badgeFields = new BadgeFields(page);
    this.bookFields = new BookFields(page);
    this.certificateFields = new CertificateFields(page);
    this.eCourseFields = new ECourseFields(page);
    this.eventFields = new EventFields(page);
  }

  private readonly selectors = {
    modal: this.page.getByTestId('addTopicModalForm'),
    submitBtn: this.page.getByTestId('submitButton'),
    deleteImageBtn: this.page.locator('#deleteImage'),
  };

  private readonly deleteImageBtn = new Button({
    page: this.page,
    locator: this.selectors.deleteImageBtn,
    name: 'Удалить обложку',
  });

  private readonly submitBtn = new Button({
    page: this.page,
    locator: this.selectors.submitBtn,
    name: 'Добавить материал',
  });

  private readonly modal = new Modal({
    page: this.page,
    locator: this.selectors.modal,
    name: 'Модальное окно',
  });

  async clickDeleteImageBtn() {
    await this.deleteImageBtn.click();
  }

  async clickSubmitBtn() {
    await this.submitBtn.click();
  }

  async validateModalIsOpened() {
    await this.modal.shouldBeVisible();
  }
}
