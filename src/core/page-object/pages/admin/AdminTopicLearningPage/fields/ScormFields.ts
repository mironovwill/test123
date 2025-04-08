import { Page } from '@playwright/test';
import { Checkbox, Input } from '@core/components';

export class ScormFields {
  private readonly selectors = {
    topicLearningScormUploadInput: this.page.locator('//input[@accept="zip"]'),
    topicLearningScormRequiredCheckbox: this.page.locator('//input[@name="required"]'),
  };

  private readonly blockPlanScormInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningScormUploadInput,
    name: 'Загрузить SCORM',
  });

  private readonly blockPlanScormRequiredCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.topicLearningScormRequiredCheckbox,
    name: 'Обязательное прохождение',
  });

  constructor(public page: Page) {}

  async uploadZip(scormFile: string) {
    await this.blockPlanScormInput.uploadFile(scormFile);
  }
}
