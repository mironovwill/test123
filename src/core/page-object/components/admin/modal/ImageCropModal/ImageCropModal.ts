import { Page } from '@playwright/test';
import { Button, Checkbox, Img } from '@core/components';

export class ImageCropModal {
  private readonly selectors = {
    imageCropSubmitBtn: this.page.getByTestId('saveImageBtn'),
    imageCropCheckbox: this.page.getByTestId('imagePropCheckbox'),
    imageCropModal: this.page.getByTestId('imageCropModal'),
  };

  constructor(public page: Page) {}

  private readonly imageCropSubmitBtn = new Button({
    page: this.page,
    locator: this.selectors.imageCropSubmitBtn,
    name: 'Сохранить"',
  });

  private readonly imageCropCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.imageCropCheckbox,
    name: 'Пропорции"',
  });

  private readonly imageCropModal = new Img({
    page: this.page,
    locator: this.selectors.imageCropModal,
    name: 'Модалка загрузки изображения',
  });

  /**
   * Проверяет, что чекбокс пропорций изображения отмечен
   * @returns {Promise<void>}
   */
  async validateCropCheckbox() {
    await this.imageCropCheckbox.shouldBeChecked();
  }

  /**
   * Проверяет, что модальное окно обрезки изображения открыто
   * @returns {Promise<void>}
   */
  async validateModalIsOpened() {
    await this.imageCropModal.shouldBeVisible();
  }

  /**
   * Нажимает кнопку сохранения обрезанного изображения
   * @returns {Promise<void>}
   */
  async clickSubmitBtn() {
    await this.imageCropSubmitBtn.click();
  }
}
