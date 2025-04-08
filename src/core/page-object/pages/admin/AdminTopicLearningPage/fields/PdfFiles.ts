import { Page } from '@playwright/test';
import { Input } from '@core/components';

export class PdfFiles {
  private readonly selectors = {
    topicLearningPdfUploadInput: this.page.locator('//input[@accept="pdf"]'),
  };

  private readonly blockPlanPdfInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningPdfUploadInput,
    name: 'Загрузить PDF',
  });

  constructor(public page: Page) {}

  async uploadPdf(pdfFile: string) {
    await this.blockPlanPdfInput.uploadFile(pdfFile);
  }
}
