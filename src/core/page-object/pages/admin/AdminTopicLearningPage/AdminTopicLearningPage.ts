import { Page, test } from '@playwright/test';
import { Button, Input, Select, Typography } from '@core/components';
import { BasePage } from '../BasePage/BasePage';
import { getFileExtension } from '@core/helpers';
import {
  ArticleFields,
  ChecklistFields,
  FilesFields,
  PdfFiles,
  ScormFields,
  TestFields,
  VideoFields,
} from './fields';
import { Chapters } from './chapters/Chapters';
import { TopicBlockPlanTypes } from '@core/types';

export class AdminTopicLearningPage extends BasePage {
  private readonly selectors = {
    topicLearningAddLearning: this.page.getByTestId('adminTopicsLearningAddLearning'),
    topicLearningAddModalNameInput: this.page.getByTestId('adminTopicsLearningAddModalNameInput'),
    topicLearningAddModalBlockTypeSelect: this.page.getByTestId(
      'adminTopicsLearningAddModalBlockTypeSelect',
    ),
    topicLearningAddModalBlockTypeList: this.page.locator(
      '//span[@data-qa="addBlockSelect-list"]/div[2]/div/div/div',
    ),
    topicLearningAddModalSubmit: this.page.getByTestId('adminTopicsLearningAddModalSubmit'),
    topicLearningFileValue: this.page.getByTestId('adminLearningFileName'),
  };

  readonly articleFields = new ArticleFields(this.page);
  readonly videoFields = new VideoFields(this.page);
  readonly checklistFields = new ChecklistFields(this.page);
  readonly scormFields = new ScormFields(this.page);
  readonly pdfFields = new PdfFiles(this.page);
  readonly filesFields = new FilesFields(this.page);
  readonly testFields = new TestFields(this.page);
  readonly chapters = new Chapters(this.page);

  private readonly fileValue = new Typography({
    page: this.page,
    locator: this.selectors.topicLearningFileValue,
    name: 'Название загруженного файла',
  });

  private readonly addLearningBtn = new Button({
    page: this.page,
    locator: this.selectors.topicLearningAddLearning,
    name: '+ Добавить блок',
  });

  private readonly addBlockModalBlockNameInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningAddModalNameInput,
    name: 'Введите название блока',
  });

  private readonly addBlockModalBlockTypeSelect = new Input({
    page: this.page,
    locator: this.selectors.topicLearningAddModalBlockTypeSelect,
    name: 'Тип блока',
  });

  private readonly addBlockModalBlockTypeList = new Select({
    page: this.page,
    locator: this.selectors.topicLearningAddModalBlockTypeList,
    name: 'Список типов',
  });

  private readonly addBlockModalSubmitBtn = new Button({
    page: this.page,
    locator: this.selectors.topicLearningAddModalSubmit,
    name: 'Добавить',
  });

  constructor(public page: Page) {
    super(page);
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ CLICK                                                    ║
  //    ╚══════════════════════════════════════════════════════════╝

  async clickToBlockPlanByName(name: string) {
    await test.step(`Раскрыть блок план с названием - "${name}"`, async () => {
      await this.page.getByText(name, { exact: true }).locator('../..').last().click();
    });
  }

  async clickToSavePlanByName(name: string) {
    await test.step(`Сохранить блок план с названием - "${name}"`, async () => {
      await this.page
        .getByText(name, { exact: true })
        .locator('../../../..')
        .locator('[data-qa="saveBlockBtn"]')
        .last()
        .click();
    });
  }

  private async clickAddLearningBtn() {
    await this.addLearningBtn.click();
  }

  private async clickSubmitBlockBtn() {
    await this.addBlockModalSubmitBtn.click();
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ SELECT                                                   ║
  //    ╚══════════════════════════════════════════════════════════╝

  private async selectBlockType(blockPlanType: TopicBlockPlanTypes) {
    await this.addBlockModalBlockTypeSelect.click();
    await this.addBlockModalBlockTypeList.selectItemByTitle(blockPlanType);
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ FILLS                                                    ║
  //    ╚══════════════════════════════════════════════════════════╝

  private async fillBlockNameInput(blockPlanName: string) {
    await this.addBlockModalBlockNameInput.fill(blockPlanName);
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ METHODS                                                  ║
  //    ╚══════════════════════════════════════════════════════════╝

  async createBlockPlan(blockPlanName: string, blockPlanType: TopicBlockPlanTypes) {
    await test.step(`Создать блок план с названием - "${blockPlanName}" и типом - "${blockPlanType}"`, async () => {
      await this.clickAddLearningBtn();
      await this.fillBlockNameInput(blockPlanName);
      await this.selectBlockType(blockPlanType);
      await this.clickSubmitBlockBtn();
      await this.clickToBlockPlanByName(blockPlanName);
    });
  }

  async uploadFiles(file: string) {
    const fileExtension = getFileExtension(file);

    switch (fileExtension) {
      case 'pdf':
        await this.pdfFields.uploadPdf(file);
        break;
      case 'zip':
        await this.scormFields.uploadZip(file);
        break;
      case 'mp4':
        await this.videoFields.uploadMp4(file);
        break;
      default:
        throw Error('Недопустимый формат файла!');
    }
  }

  async getBlockPlanIdFromResponse(page: Page) {
    const response = await page
      .waitForResponse(response => response.url().includes('/api/v1/blocks'))
      .catch(e => {
        throw e;
      });

    const responseBody = await response.json();
    return responseBody.id;
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ VALIDATIONS                                              ║
  //    ╚══════════════════════════════════════════════════════════╝

  async validateFileName(blockPlanName: string, fileName: string, coverImage?: string) {
    await test.step('Проверка отображения названия файла после загрузки', async () => {
      await this.clickToBlockPlanByName(blockPlanName);
      await this.fileValue.shouldHaveText(fileName);
      if (coverImage) await this.videoFields.validateVideoCoverImage();
    });
  }
}
