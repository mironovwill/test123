import { Page, test } from '@playwright/test';
import { Input, Select } from '@core/components';

export class FilesFields {
  private readonly selectors = {
    topicLearningFilesDescriptionInput: this.page.getByTestId('adminTopicLearningFilesDescription'),
    topicLearningFilesList: this.page.locator(
      '//div[@id="adminTopicsLearningUploads"]/../../../div[2]',
    ),
    topicLearningFileUploadInput: this.page.locator('//input[@type="file"]'),
  };

  private readonly filesList = new Select({
    page: this.page,
    locator: this.selectors.topicLearningFilesList,
    name: 'Список файлов',
  });

  private readonly filesDescriptionInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningFilesDescriptionInput,
    name: 'Описание блока "Файл"',
  });

  readonly blockPlanFileInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningFileUploadInput,
    name: 'Загрузить файл',
  });

  constructor(public page: Page) {}

  async fillFileBlock(description: string, files: string[]) {
    await test.step('Заполнить описание и загрузить файлы в тип блока "Файл"', async () => {
      await this.filesDescriptionInput.fill(description);
      await this.uploadFilesToFileBlock(files);
    });
  }

  private async uploadFilesToFileBlock(files: string[]) {
    for (const file of files) {
      await this.blockPlanFileInput.uploadFile(file);
    }
  }

  private async validateFilesDescription(value: string) {
    await this.filesDescriptionInput.shouldHaveText(value);
  }

  private async validateFilesCount(count: number) {
    await this.filesList.validateListItemsCount(count);
  }

  async validateFilesBlockPlan(description: string, count: number) {
    await this.validateFilesDescription(description);
    await this.validateFilesCount(count);
  }
}
