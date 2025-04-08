import { expect, Page } from '@playwright/test';
import { Checkbox, Input, Select, Textarea } from '@core/components';
import { ImageCropModal } from '../../ImageCropModal/ImageCropModal';

export class BasicFields {
  readonly imageCropModal = new ImageCropModal(this.page);

  private readonly selectors = {
    topicImageInput: this.page.locator('#cover-img-file-input'),
    topicUploadedImage: this.page.locator('#uploadedImage > img'),
    topicFileInput: this.page.getByTestId('fileInput'),
    nameInput: this.page.getByTestId('title'),
    eventCheckbox: this.page.getByTestId('withEvents'),
    approveCheckbox: this.page.getByTestId('approved'),
    corpAccessCheckbox: this.page.getByTestId('statusScope'),
    descriptionTextarea: this.page.getByTestId('description'),
    authorInput: this.page.locator('#authorsAutocomplete'),
    tagsInput: this.page.locator('#tagsAutocomplete'),
    skillsInput: this.page.locator('#skillsAutocomplete'),
    costInput: this.page.locator('#costInput'),
    yearInput: this.page.getByTestId('yearInput'),
    levelList: this.page.locator('#levelsSelect'),
    hoursInput: this.page.getByTestId('hoursInput'),
    minutesInput: this.page.getByTestId('minutesInput'),
    linkInput: this.page.locator('#linkInput'),
    companyInput: this.page.locator('[name="publisher"]'),
    languagesList: this.page.getByText('Русский', { exact: true }),
    topicTypeValue: this.page.locator('//div[@data-qa="typeLabelIdSelect"]/div/span/span[2]'),
    topicTypeInput: this.page.locator('//div[@data-qa="typeLabelIdSelect"]/div/span/span/input'),
    categoryInput: this.page.locator('//div[@data-qa="categorySelect"]/div/span/div/div/div/input'),
    resultList: this.page.locator('.rc-virtual-list-holder-inner'),
  };

  constructor(public page: Page) {}

  private readonly resultList = new Select({
    page: this.page,
    locator: this.selectors.resultList,
    name: 'Список элементов',
  });

  private readonly topicImageInput = new Input({
    page: this.page,
    locator: this.selectors.topicImageInput,
    name: 'Обложка',
  });

  private readonly topicUploadedImage = new Input({
    page: this.page,
    locator: this.selectors.topicUploadedImage,
    name: 'Загруженная обложка',
  });

  private readonly topicFileInput = new Input({
    page: this.page,
    locator: this.selectors.topicFileInput,
    name: 'Прикрепить файлы',
  });

  private readonly nameInput = new Input({
    page: this.page,
    locator: this.selectors.nameInput,
    name: 'Название',
  });

  private readonly eventCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.eventCheckbox,
    name: 'События',
  });

  private readonly approveCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.approveCheckbox,
    name: 'Согласование',
  });

  private readonly corpAccessCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.corpAccessCheckbox,
    name: 'Корпоративный доступ',
  });

  private readonly descriptionTextarea = new Textarea({
    page: this.page,
    locator: this.selectors.descriptionTextarea,
    name: 'Описание',
  });

  private readonly authorInput = new Input({
    page: this.page,
    locator: this.selectors.authorInput,
    name: 'Автор/Спикер',
  });

  private readonly tagsInput = new Input({
    page: this.page,
    locator: this.selectors.tagsInput,
    name: 'Теги',
  });

  private readonly skillsInput = new Input({
    page: this.page,
    locator: this.selectors.skillsInput,
    name: 'Навыки',
  });

  private readonly costInput = new Input({
    page: this.page,
    locator: this.selectors.costInput,
    name: 'Стоимость',
  });

  private readonly yearInput = new Input({
    page: this.page,
    locator: this.selectors.yearInput,
    name: 'Год',
  });

  private readonly levelList = new Input({
    page: this.page,
    locator: this.selectors.levelList,
    name: 'Уровень',
  });

  private readonly hoursInput = new Input({
    page: this.page,
    locator: this.selectors.hoursInput,
    name: 'Часы',
  });

  private readonly minutesInput = new Input({
    page: this.page,
    locator: this.selectors.minutesInput,
    name: 'Минуты',
  });

  private readonly linkInput = new Input({
    page: this.page,
    locator: this.selectors.linkInput,
    name: 'Ссылки',
  });

  private readonly companyInput = new Input({
    page: this.page,
    locator: this.selectors.companyInput,
    name: 'Компания',
  });

  private readonly languagesList = new Input({
    page: this.page,
    locator: this.selectors.languagesList,
    name: 'Язык',
  });

  private readonly topicTypeValue = new Input({
    page: this.page,
    locator: this.selectors.topicTypeValue,
    name: 'Значение типа топика',
  });

  private readonly topicTypeInput = new Input({
    page: this.page,
    locator: this.selectors.topicTypeInput,
    name: 'Тип топика',
  });

  private readonly categoryInput = new Input({
    page: this.page,
    locator: this.selectors.categoryInput,
    name: 'Категория',
  });

  /**
   * Выбирает тип топика из выпадающего списка
   * @param {string} topicType - Название типа топика
   * @returns {Promise<void>}
   */
  async selectTopicType(topicType: string) {
    await this.topicTypeInput.click();
    await this.resultList.selectItemByTitle(topicType);
  }

  /**
   * Выбирает уровень из выпадающего списка
   * @param {string} levelName - Название уровня
   * @returns {Promise<void>}
   */
  async selectLevel(levelName: string) {
    await this.levelList.click();
    await this.resultList.selectItemByTitle(levelName);
  }

  /**
   * Выбирает язык из выпадающего списка
   * @param {string} language - Название языка
   * @returns {Promise<void>}
   */
  async selectLanguage(language: string) {
    await this.languagesList.click();
    await this.resultList.selectItemByTitle(language);
  }

  /**
   * Загружает изображение и обрабатывает его в модальном окне
   * @param {string} file - Путь к файлу изображения
   * @returns {Promise<void>}
   */
  async uploadImage(file: string) {
    await this.topicImageInput.uploadFile(file);
    await this.imageCropModal.validateModalIsOpened();
    await this.imageCropModal.clickSubmitBtn();
  }

  /**
   * Загружает файлы
   * @param {string[]} files - Массив путей к файлам
   * @returns {Promise<void>}
   */
  async uploadFiles(files: string[]) {
    for (const file of files) {
      await this.topicFileInput.uploadFile(file);
    }
  }

  /**
   * Устанавливает чекбокс событий
   * @returns {Promise<void>}
   */
  async checkEventCheckbox() {
    await this.eventCheckbox.check();
  }

  /**
   * Устанавливает чекбокс согласования
   * @returns {Promise<void>}
   */
  async checkApproveCheckbox() {
    await this.approveCheckbox.check();
  }

  /**
   * Устанавливает чекбокс корпоративного доступа
   * @returns {Promise<void>}
   */
  async checkCorpAccessCheckbox() {
    await this.corpAccessCheckbox.check();
  }

  /**
   * Заполняет поле названия топика
   * @param {string} value - Название топика
   * @returns {Promise<void>}
   */
  async fillTopicName(value: string) {
    await this.nameInput.fill(value);
  }

  /**
   * Заполняет поле описания
   * @param {string} value - Текст описания
   * @returns {Promise<void>}
   */
  async fillDescription(value: string) {
    await this.descriptionTextarea.fill(value);
  }

  /**
   * Заполняет поле тегов
   * @param {string[]} tags - Массив тегов
   * @returns {Promise<void>}
   */
  async fillTags(tags: string[]) {
    await this.tagsInput.click();
    for (const tag of tags) {
      await this.tagsInput.fill(tag);
      await this.resultList.selectItemByTitle(tag);
    }
  }

  /**
   * Заполняет поле навыков
   * @param {string[]} skills - Массив навыков
   * @returns {Promise<void>}
   */
  async fillSkills(skills: string[]) {
    await this.skillsInput.click();
    for (const skill of skills) {
      await this.skillsInput.fill(skill);
      await this.resultList.selectItemByTitle(skill);
    }
  }

  /**
   * Заполняет поле ссылок
   * @param {string[]} links - Массив ссылок
   * @returns {Promise<void>}
   */
  async fillLinkInput(links: string[]) {
    for (const link of links) {
      await this.linkInput.fill(link);
      await this.page.keyboard.press('Enter');
    }
  }

  /**
   * Заполняет поле стоимости
   * @param {string} cost - Стоимость
   * @returns {Promise<void>}
   */
  async fillCostInput(cost: string) {
    await this.costInput.fill(cost);
  }

  /**
   * Заполняет поле минут
   * @param {string} minutes - Количество минут
   * @returns {Promise<void>}
   */
  async fillMinutesInput(minutes: string) {
    await this.minutesInput.fill(minutes);
  }

  /**
   * Заполняет поле года
   * @param {string} year - Год
   * @returns {Promise<void>}
   */
  async fillYearInput(year: string) {
    await this.yearInput.fill(year);
  }

  /**
   * Заполняет поле часов
   * @param {string} hours - Количество часов
   * @returns {Promise<void>}
   */
  async fillHoursInput(hours: string) {
    await this.hoursInput.fill(hours);
  }

  /**
   * Заполняет поле компании
   * @param {string} company - Название компании
   * @returns {Promise<void>}
   */
  async fillCompanyInput(company: string) {
    await this.companyInput.fill(company);
  }

  /**
   * Заполняет поле категорий
   * @param {string[]} categories - Массив категорий
   * @returns {Promise<void>}
   */
  async fillCategories(categories: string[]) {
    for (const category of categories) {
      await this.categoryInput.click();
      await this.categoryInput.fill(category);
      await this.resultList.selectItemByTitle(category);
    }
  }

  /**
   * Заполняет поле авторов
   * @param {string[]} authors - Массив авторов
   * @returns {Promise<void>}
   */
  async fillAuthorInput(authors: string[]) {
    for (const author of authors) {
      await this.authorInput.fill(author);
      await this.resultList.selectItemByTitle(author);
    }
  }

  /**
   * Проверяет значение типа топика
   * @param {string} value - Ожидаемое значение
   * @returns {Promise<void>}
   */
  async validateTopicTypeValue(value: string) {
    await this.topicTypeValue.shouldHaveText(value);
  }

  /**
   * Проверяет текст названия топика
   * @param {string} value - Ожидаемое значение
   * @returns {Promise<void>}
   */
  async validateTopicNameText(value: string) {
    await this.nameInput.shouldHaveValue(value);
  }

  /**
   * Проверяет наличие и корректность изображения топика
   * @returns {Promise<void>}
   */
  async validateTopicImage() {
    await this.topicUploadedImage.shouldBeVisible();
    await this.topicUploadedImage.shouldHaveAttribute('src');
    await this.topicUploadedImage.shouldHaveAttributeValue('src', 'src');
    const src = await this.topicUploadedImage.returnAttributeValue('src');
    expect(src).not.toBeNull();
  }

  /**
   * Проверяет текст описания топика
   * @param {string} value - Ожидаемое значение
   * @returns {Promise<void>}
   */
  async validateTopicDescriptionText(value: string) {
    await this.descriptionTextarea.shouldHaveText(value);
  }

  /**
   * Проверяет чекбокс корпоративного доступа
   * @returns {Promise<void>}
   */
  async validateCorpAccessCheckbox() {
    await this.corpAccessCheckbox.check();
  }

  /**
   * Проверяет значение стоимости
   * @param {string} cost - Ожидаемое значение
   * @returns {Promise<void>}
   */
  async validateCost(cost: string) {
    await this.costInput.shouldHaveValue(cost);
  }

  /**
   * Проверяет значение минут
   * @param {string} minutes - Ожидаемое значение
   * @returns {Promise<void>}
   */
  async validateMinutesInput(minutes: string) {
    await this.minutesInput.shouldHaveValue(minutes);
  }

  /**
   * Проверяет значение часов
   * @param {string} hours - Ожидаемое значение
   * @returns {Promise<void>}
   */
  async validateHoursInput(hours: string) {
    await this.hoursInput.shouldHaveValue(hours);
  }
}
