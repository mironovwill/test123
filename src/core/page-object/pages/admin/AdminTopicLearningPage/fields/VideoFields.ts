import { Page } from '@playwright/test';
import { Button, Img, Input } from '@core/components';

export class VideoFields {
  private readonly selectors = {
    topicLearningVideoInput: this.page.locator('//input[@accept="mp4"]'),
    topicLearningVideoCoverInput: this.page.getByTestId('adminTopicsLearningVideoCoverInput'),
    topicLearningVideoCoverImage: this.page.locator('//input[@data-qa="blockImage"]/../div/div/span/img'),
    topicLearningVideoCoverSaveBtn: this.page.getByTestId('adminTopicsLearningVideoCoverSaveBtn'),
  };

  private readonly videoCoverImage = new Img({
    page: this.page,
    locator: this.selectors.topicLearningVideoCoverImage,
    name: 'Обложка',
  });

  private readonly saveVideoCoverBtn = new Button({
    page: this.page,
    locator: this.selectors.topicLearningVideoCoverSaveBtn,
    name: 'Сохранить',
  });

  private readonly blockPlanVideoInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningVideoInput,
    name: 'Видео',
  });

  private readonly blockPlanCoverVideoInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningVideoCoverInput,
    name: 'Обложка для видео',
  });

  constructor(public page: Page) {}

  private async clickSaveVideoCoverBtn() {
    await this.saveVideoCoverBtn.click();
  }

  async uploadMp4(videoFiles: string) {
    await this.blockPlanVideoInput.uploadFile(videoFiles);
  }

  async validateVideoCoverImage() {
    await this.videoCoverImage.shouldBeVisible();
  }
}
