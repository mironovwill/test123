import test, { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { pageContent, successMessages } from '@core/helpers/constants';
import { Menu, Header, AddEditTopicModal } from '@core/page-object/components/admin';
import { Input, Typography, Button, Link, Notification } from '@core/components';

export class AdminTopicsPage extends BasePage {
  private readonly selectors = {
    h1: this.page.getByTestId('topicsH1'),
    addTopicBtn: this.page.getByTestId('addTopicBtn').locator('span'),
    firstTopicCardName: this.page.locator('#topicCardName > div > div').nth(0),
    filterClearBtn: this.page.getByTestId('filterClearBtn'),
    filterSubmitBtn: this.page.getByTestId('filterSubmitBtn'),
    topicNameSearchInput: this.page.locator('#name'),
    notification: this.page.locator('.message'),
    firstTopicCard: this.page.locator('#topicCard').nth(0),
    firstTopicLink: this.page.locator('#topicCard > div > a').nth(0),
  };

  constructor(public page: Page) {
    super(page);
  }

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.h1,
    name: 'H1',
  });

  private readonly firstTopicCardName = new Typography({
    page: this.page,
    locator: this.selectors.firstTopicCardName,
    name: 'Название топика',
  });

  private readonly firstTopicCardLink = new Link({
    page: this.page,
    locator: this.selectors.firstTopicLink,
    name: 'Ссылка на карточку топика',
  });

  private readonly addTopicBtn = new Button({
    page: this.page,
    locator: this.selectors.addTopicBtn,
    name: 'Добавить материал',
  });

  private readonly filterClearBtn = new Button({
    page: this.page,
    locator: this.selectors.filterClearBtn,
    name: 'Сбросить',
  });

  private readonly filterSubmitBtn = new Button({
    page: this.page,
    locator: this.selectors.filterSubmitBtn,
    name: 'Применить',
  });

  private readonly topicNameSearchInput = new Input({
    page: this.page,
    locator: this.selectors.topicNameSearchInput,
    name: 'Поиск по названию топика',
  });

  private readonly notification = new Notification({
    page: this.page,
    locator: this.selectors.notification,
    name: 'Нотификация',
  });

  private readonly firstTopicCard = new Link({
    page: this.page,
    locator: this.selectors.firstTopicCard,
    name: 'Материал',
  });

  readonly menu = new Menu(this.page);
  readonly header = new Header(this.page);
  readonly addEditTopicModal = new AddEditTopicModal(this.page);

  /**
   * Проверяет отображение h1 на странице топиков.
   */
  async validateH1Text() {
    await this.h1.shouldHaveText(pageContent.cloud.admin.h1.ru.topics);
  }

  /**
   * Проверяет отображение уведомления об успешном создании топика.
   */
  async validateSuccessNotification() {
    await this.notification.shouldBeVisible();
    await this.notification.shouldHaveText(successMessages.cloud.admin.notifications.ru.topicsCreate);
  }

  /**
   * Проверяет ссылку на первый карточку топика.
   * @param id Идентификатор топика.
   */
  async validateFirstTopicLink(id: string) {
    const href = await this.firstTopicCardLink.returnAttributeValue('href');
    expect(href).toContain(`/topic/${id}`);
  }

  /**
   * Проверяет отображение уведомления об успешном удалении топика.
   */
  async validateTopicDeleteSuccessNotification() {
    await this.notification.shouldBeVisible();
    await this.notification.shouldHaveText(successMessages.cloud.admin.notifications.ru.topicDelete);
  }

  /**
   * Проверяет имя первой карточки топика.
   * @param topicName Имя топика.
   */
  async validateFirstTopicCardName(topicName: string) {
    await this.firstTopicCardName.shouldHaveText(topicName);
  }

  /**
   * Нажимает на кнопку добавления топика.
   */
  async clickAddTopicBtn() {
    await this.addTopicBtn.click();
  }

  /**
   * Нажимает на кнопку очистки фильтра.
   */
  async clickFilterClearBtn() {
    await this.filterClearBtn.click();
  }

  /**
   * Нажимает на первую карточку топика.
   */
  async clickFirstTopicCard() {
    await this.firstTopicCardName.click();
  }

  /**
   * Нажимает на подтверждение поиска по фильтру.
   */
  async clickFilterSubmitBtn() {
    await this.filterSubmitBtn.click();
  }

  /**
   * Нажимает на первую карточку топика в списке.
   */
  async clickToFirstTopicCardInList() {
    await this.firstTopicCard.click();
  }

  /**
   * Заполняет поле поиска по имени топика.
   * @param topicName Имя топика для поиска.
   */
  async fillTopicNameSearchInput(topicName: string) {
    await this.topicNameSearchInput.fill(topicName);
  }

  /**
   * Переходит на страницу топиков.
   */
  override async visit() {
    await super.visit('/topics');
  }

  /**
   * Ищет топик по имени.
   * @param topicName Имя топика для поиска.
   */
  async searchTopicByName(topicName: string) {
    await this.fillTopicNameSearchInput(topicName);
    await this.clickFilterSubmitBtn();
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
