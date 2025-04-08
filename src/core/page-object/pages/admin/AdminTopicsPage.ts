import test, { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { pageContent, successMessages } from '@core/helpers/constants';
import { Menu, Header, EditAddTopicModal } from '@core/page-object/components/admin';

export class AdminTopicsPage extends BasePage {
  private readonly h1 = this.page.getByTestId('topicsH1');
  private readonly addTopicBtn = this.page.getByTestId('addTopicBtn').locator('span');
  private readonly firstTopicCardName = this.page.locator('#topicCardName > div > div').nth(0);
  private readonly filterClearBtn = this.page.getByTestId('filterClearBtn');
  private readonly filterSubmitBtn = this.page.getByTestId('filterSubmitBtn');
  private readonly topicNameSearchInput = this.page.locator('#name');
  private readonly notification = this.page.locator('.message');
  private readonly firstTopicCard = this.page.locator('#topicCard').nth(0);
  private readonly firstTopicLink = this.page.locator('#topicCard > div > a').nth(0);

  readonly menu = new Menu(this.page);
  readonly header = new Header(this.page);
  readonly editAddTopicModal = new EditAddTopicModal(this.page);

  constructor(public page: Page) {
    super(page);
  }

  /**
   * Проверяет отображение h1 на странице топиков.
   */
  async validateH1Text() {
    await test.step('Проверить отображение h1 на странице топиков', async () => {
      await expect(this.h1).toBeVisible();
      await expect(this.h1).toHaveText(pageContent.cloud.admin.h1.ru.topics);
    });
  }

  /**
   * Проверяет отображение уведомления об успешном создании топика.
   */
  async validateSuccessNotification() {
    await test.step('Проверить отображение уведомления об успешном создании топика', async () => {
      await expect(this.notification).toBeVisible();
      await expect(this.notification).toHaveText(successMessages.cloud.admin.notifications.ru.topicsCreate);
    });
  }

  /**
   * Проверяет ссылку на первый карточку топика.
   * @param id Идентификатор топика.
   */
  async validateFirstTopicLink(id: string) {
    await test.step('Проверить ссылку на первый карточку топика', async () => {
      const href = await this.firstTopicLink.getAttribute('href');
      expect(href).toContain(`/topic/${id}`);
    });
  }

  /**
   * Проверяет отображение уведомления об успешном удалении топика.
   */
  async validateTopicDeleteSuccessNotification() {
    await test.step('Проверить отображение уведомления об успешном удалении топика', async () => {
      await expect(this.notification).toBeVisible();
      await expect(this.notification).toHaveText(successMessages.cloud.admin.notifications.ru.topicDelete);
    });
  }

  /**
   * Проверяет имя первой карточки топика.
   * @param topicName Имя топика.
   */
  async validateFirstTopicCardName(topicName: string) {
    await test.step('Проверить имя первой карточки топика', async () => {
      await expect.soft(this.firstTopicCardName).toHaveText(topicName);
    });
  }

  /**
   * Нажимает на кнопку добавления топика.
   */
  async clickAddTopicBtn() {
    await test.step('Нажать на кнопку добавления топика', async () => {
      await this.addTopicBtn.click();
    });
  }

  /**
   * Нажимает на кнопку очистки фильтра.
   */
  async clickFilterClearBtn() {
    await test.step('Нажать на кнопку очистки фильтра', async () => {
      await this.filterClearBtn.click();
    });
  }

  /**
   * Нажимает на первую карточку топика.
   */
  async clickFirstTopicCard() {
    await test.step('Нажать на первую карточку топика', async () => {
      await this.firstTopicCardName.click();
    });
  }

  /**
   * Нажимает на подтверждение поиска по фильтру.
   */
  private async clickFilterSubmitBtn() {
    await test.step('Нажать на кнопку подтверждения фильтра', async () => {
      await this.filterSubmitBtn.click();
    });
  }

  /**
   * Нажимает на первую карточку топика в списке.
   */
  async clickToFirstTopicCardInList() {
    await test.step('Нажать на первую карточку топика в списке', async () => {
      await this.firstTopicCard.click();
    });
  }

  /**
   * Заполняет поле поиска по имени топика.
   * @param topicName Имя топика для поиска.
   */
  private async fillTopicNameSearchInput(topicName: string) {
    await test.step('Заполнить поле поиска по имени топика', async () => {
      await this.topicNameSearchInput.fill(topicName);
    });
  }

  /**
   * Переходит на страницу топиков.
   */
  override async visit() {
    await test.step('Перейти на страницу топиков', async () => {
      await super.visit('/topics');
    });
  }

  /**
   * Ищет топик по имени.
   * @param topicName Имя топика для поиска.
   */
  async searchTopicByName(topicName: string) {
    await test.step('Искать топик по имени', async () => {
      await this.fillTopicNameSearchInput(topicName);
      await this.clickFilterSubmitBtn();
    });
  }

  /**
   * Получает идентификатор топика из ответа.
   * @param page Страница, на которой выполняется запрос.
   * @returns Идентификатор топика.
   */
  async getTopicIdFromResponse(page: Page) {
    await test.step('Получить идентификатор топика из ответа', async () => {
      const response = await page.waitForResponse(response => response.url().includes('/api/v1/topic'));

      const responseBody = await response.json();
      return responseBody.id;
    });
  }
}
