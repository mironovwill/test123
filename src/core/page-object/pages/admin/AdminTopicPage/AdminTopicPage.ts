import { expect, Page } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { Topic } from '@core/types';
import { pageContent } from '@core/helpers/constants';
import { Button, Modal, Typography, Select, Img } from '@core/components';
import { AddEditTopicModal } from '@core/page-object/components/admin';

export class AdminTopicPage extends BasePage {
  private readonly selectors = {
    h1: this.page.getByTestId('topicTitle'),
    topicId: this.page.getByTestId('adminMaterialDetailId'),
    tagsList: this.page.getByTestId('adminMaterialDetailTags'),
    skillsList: this.page.getByTestId('adminMaterialDetailSkills'),
    level: this.page.getByTestId('materialDetailLevel'),
    badge: this.page.getByTestId('materialDetailBadge'),
    viewTopicBtn: this.page.getByTestId('materialDetailLink'),
    creator: this.page.getByTestId('materialDetailAuthor'),
    editor: this.page.getByTestId('materialDetailEditor'),
    views: this.page.getByTestId('materialDetailViews'),
    addToPlanCount: this.page.getByTestId('adminTopicBlockPlanCount'),
    visibilityCount: this.page.getByTestId('visibilityCount'),
    editBtn: this.page.getByTestId('editMaterialBtn'),
    description: this.page.getByTestId('adminMaterialDetailDescription'),
    image: this.page.getByTestId('adminMaterialDetailImage'),
    typeBadge: this.page.getByTestId('adminMaterialDetailTypeBadge'),
    categoryList: this.page.getByTestId('materialDetailCategoryLabel').locator('div').nth(1),
    cost: this.page.locator('#adminMaterialDetailCost').locator('div').nth(1),
    tabsLearningTab: this.page.locator('#adminTopicLearningTab'),
    internalUseText: this.page.locator('#internalUseText'),
    authorsList: this.page.getByTestId('materialAuthorsList'),
    yearOfPublicationText: this.page.getByTestId('materialYearOfPublication'),
    durationText: this.page.getByTestId('materialTopicDuration'),
    filesList: this.page.locator('#materialFilesList div div ul'),
    linksList: this.page.getByTestId('materialLinksList'),
    bookLocationBtn: this.page.getByTestId('adminTopicBookLocation'),
    additionalField: this.page.getByTestId('topicAdminAdditionalField'),
    companyField: this.page.getByTestId('topicAdminAdditionalField').nth(0),
    meetPlaceField: this.page.getByTestId('topicAdminAdditionalField').last(),
    bookInPaperText: this.page.getByTestId('topicInPaperField'),
    bookListModal: this.page.getByTestId('topicBookAddressList'),
    eventSchedule: this.page.getByTestId('topicEventSchedule'),
  };

  constructor(public page: Page) {
    super(page);
  }

  private readonly h1 = new Typography({
    page: this.page,
    locator: this.selectors.h1,
    name: 'Название топика',
  });

  private readonly topicEventSchedule = new Button({
    page: this.page,
    locator: this.selectors.eventSchedule,
    name: 'Расписание',
  });

  private readonly topicFilesList = new Select({
    page: this.page,
    locator: this.selectors.filesList,
    name: 'Список файлов',
  });

  private readonly topicMeetPlace = new Typography({
    page: this.page,
    locator: this.selectors.meetPlaceField,
    name: 'Место проведения',
  });

  private readonly topicBookListModal = new Modal({
    page: this.page,
    locator: this.selectors.bookListModal,
    name: 'Книги в использовании',
  });

  private readonly topicBookLocationBtn = new Button({
    page: this.page,
    locator: this.selectors.bookLocationBtn,
    name: 'Посмотреть',
  });

  private readonly topicPublisher = new Typography({
    page: this.page,
    locator: this.selectors.additionalField,
    name: 'Издатель',
  });

  private readonly topicCompany = new Typography({
    page: this.page,
    locator: this.selectors.companyField,
    name: 'Компания',
  });

  private readonly topicBookInPaper = new Typography({
    page: this.page,
    locator: this.selectors.bookInPaperText,
    name: 'В бумажном виде',
  });

  private readonly topicId = new Typography({
    page: this.page,
    locator: this.selectors.topicId,
    name: 'ID топика',
  });

  private readonly topicTypeBadge = new Typography({
    page: this.page,
    locator: this.selectors.typeBadge,
    name: 'Тип топика',
  });

  private readonly topicCategoryList = new Select({
    page: this.page,
    locator: this.selectors.categoryList,
    name: 'Категория',
  });

  private readonly topicLinksList = new Select({
    page: this.page,
    locator: this.selectors.linksList,
    name: 'Ссылки',
  });

  private readonly topicLevel = new Typography({
    page: this.page,
    locator: this.selectors.level,
    name: 'Уровень',
  });

  private readonly topicBadge = new Typography({
    page: this.page,
    locator: this.selectors.badge,
    name: 'Награда',
  });

  private readonly topicCost = new Typography({
    page: this.page,
    locator: this.selectors.cost,
    name: 'Стоимость',
  });

  private readonly topicCreator = new Typography({
    page: this.page,
    locator: this.selectors.creator,
    name: 'Создал',
  });

  private readonly topicEditor = new Typography({
    page: this.page,
    locator: this.selectors.editor,
    name: 'Изменил',
  });

  private readonly topicViews = new Typography({
    page: this.page,
    locator: this.selectors.views,
    name: 'Просмотров',
  });

  private readonly topicAddToPlanCount = new Typography({
    page: this.page,
    locator: this.selectors.addToPlanCount,
    name: 'Количество добавленных юзеров в план',
  });

  private readonly topicVisibilityCount = new Typography({
    page: this.page,
    locator: this.selectors.visibilityCount,
    name: 'Количество юзеров, которые могут видеть материал',
  });

  private readonly topicDescription = new Typography({
    page: this.page,
    locator: this.selectors.description,
    name: 'Описание',
  });

  private readonly topicViewTopicBtn = new Button({
    page: this.page,
    locator: this.selectors.viewTopicBtn,
    name: 'Посмотреть собранный материал',
  });

  private readonly topicEditBtn = new Button({
    page: this.page,
    locator: this.selectors.editBtn,
    name: 'Редактирование топика',
  });

  private readonly topicTabsLearningTab = new Button({
    page: this.page,
    locator: this.selectors.tabsLearningTab,
    name: 'Изучение',
  });

  private readonly topicTagsList = new Select({
    page: this.page,
    locator: this.selectors.tagsList,
    name: 'Список тегов',
  });

  private readonly topicSkillsList = new Select({
    page: this.page,
    locator: this.selectors.skillsList,
    name: 'Список скиллов',
  });

  private readonly topicInternalUseText = new Typography({
    page: this.page,
    locator: this.selectors.internalUseText,
    name: 'Блок пользования',
  });

  private readonly topicAuthorsList = new Select({
    page: this.page,
    locator: this.selectors.authorsList,
    name: 'Автор/спикер',
  });

  private readonly topicYearText = new Typography({
    page: this.page,
    locator: this.selectors.yearOfPublicationText,
    name: 'Год издания',
  });

  private readonly topicDurationText = new Typography({
    page: this.page,
    locator: this.selectors.durationText,
    name: 'Длительность',
  });

  private readonly topicImage = new Img({
    page: this.page,
    locator: this.selectors.image,
    name: 'Обложка топика',
  });

  readonly addEditTopicModal = new AddEditTopicModal(this.page);

  async visitTopic(topicId: string) {
    await super.visit(`/topic/${topicId}`);
  }

  async validateAdditionalTopicInfo({ skills, tags, links, badgeName, files }: Topic) {
    if (skills) await this.validateTopicSkills(skills);
    if (tags) await this.validateTopicTags(tags);

    if (badgeName) {
      await this.validateTopicInternalUseText();
      await this.validateTopicBadge(badgeName);
    }

    if (links) await this.validateTopicLinks(links);
    if (files) await this.validateFilesList(files);
  }

  async validateBasicTopicInfo(
    { topicName, description, topicType, categories, level }: Topic,
    topicId: string,
    viewsCount = '1',
    addToPlanCount = '0',
    visibilityCount = '0',
  ) {
    await this.validateH1Text(topicName);
    await this.validateImageSrc();
    await this.validateTopicDescription(description);
    await this.validateTopicId(topicId);
    await this.validateTopicTypeBadge(topicType);
    await this.validateTopicCategory(categories);
    await this.validateTopicLevel(level);
    await this.validateTopicViews(viewsCount);
    await this.validateTopicAddToPlanCount(addToPlanCount);
    await this.validateTopicVisibilityCount(visibilityCount);
    await this.clickTopicViewTopicBtn(topicId);
  }

  async validateH1Text(topicTitle: string) {
    await this.h1.shouldBeVisible();
    await this.h1.shouldHaveText(topicTitle);
  }

  async validateTopicTypeBadge(topicType: string) {
    await this.topicTypeBadge.shouldHaveText(topicType);
  }

  async validateTopicLevel(level: string) {
    await this.topicLevel.shouldHaveText(level);
  }

  async validateTopicUrl(id: string) {
    await super.validatePageUrl(`/topic/${id}`);
  }

  async validateTopicBadge(badgeName: string) {
    await this.topicBadge.shouldHaveText(badgeName);
  }

  async validateTopicId(topicId: string) {
    await this.topicId.shouldHaveText('ID' + topicId);
  }

  async validateTopicCategory(categories: string[]) {
    await this.topicCategoryList.assertSelectIncludesItems(categories);
  }

  async validateTopicCost(cost = '0') {
    const formattedNumber = parseInt(cost, 10).toLocaleString('en-US');
    await this.topicCost.shouldHaveText(`${formattedNumber} ₽`);
  }

  async validateTopicCreator(creator: string) {
    await this.topicCreator.shouldHaveText(creator);
  }

  async validateTopicEditor(editor: string) {
    await this.topicEditor.shouldHaveText(editor);
  }

  async validateTopicViews(viewsCount: string) {
    await this.topicViews.shouldHaveText(viewsCount);
  }

  async validateTopicAddToPlanCount(count: string) {
    await this.topicAddToPlanCount.shouldHaveText(count);
  }

  async validateTopicVisibilityCount(count: string) {
    await this.topicVisibilityCount.shouldHaveText(count);
  }

  async validateTopicDescription(description: string) {
    await this.topicDescription.shouldHaveText(description);
  }

  async validateImageSrc() {
    await this.topicImage.shouldHaveAttribute('src');
  }

  async validateTopicTags(tags: string[]) {
    await this.topicTagsList.assertSelectIncludesItems(tags);
  }

  async validateTopicAuthors(authors: string[]) {
    await this.topicAuthorsList.assertSelectIncludesItems(authors);
  }

  async validateTopicPublisher(bookPublisher: string) {
    await this.topicPublisher.shouldHaveText(bookPublisher);
  }

  async validateTopicDuration(h?: string, m?: string) {
    if (h && m) {
      await this.topicDurationText.shouldHaveText(`${h} часов ${m} мин.`);
      return;
    }
    if (h) {
      await this.topicDurationText.shouldHaveText(`${h} часов`);
      return;
    }
    if (m) {
      await this.topicDurationText.shouldHaveText(`${m} мин.`);
    }
  }

  async validateTopicYear(year: string) {
    await this.topicYearText.shouldHaveText(year);
  }

  async validateTopicSkills(skills: string[]) {
    await this.topicSkillsList.assertSelectIncludesItems(skills);
  }

  async validateTopicLinks(links: string[]) {
    await this.topicLinksList.assertSelectIncludesItems(links);
  }

  async validateBookInPaper(state: boolean) {
    await this.topicBookInPaper.shouldHaveText(state ? 'Есть' : 'Нет');
  }

  async validateBookLocation() {
    await this.topicBookLocationBtn.click();
    await this.topicBookListModal.shouldBeVisible();
  }

  async validateFilesList(files: string[]) {
    await this.topicFilesList.assertSelectIncludesItems(files);
  }

  async validateTopicInternalUseText() {
    await this.topicInternalUseText.shouldHaveText(
      pageContent.cloud.admin.topic.ru.topicInternalUse,
    );
  }

  async validateMeetPlace(meetPlace: string) {
    await this.topicMeetPlace.shouldHaveText(meetPlace);
  }

  async validateTopicCompany(company: string) {
    await this.topicCompany.shouldHaveText(company);
  }

  async validateTopicEventSchedule(schedule: string) {
    await this.topicEventSchedule.shouldHaveText(schedule);
  }

  async clickTopicViewTopicBtn(topicId: string) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.topicViewTopicBtn.click(),
    ]);
    const newPageUrl = newPage.url();
    expect(newPageUrl).toEqual(`${process.env.KAMPUS_USER_BASE_URL}/collection-topics/${topicId}`);
    await newPage.close();
  }

  async clickTopicEditBtn() {
    await this.topicEditBtn.click();
  }

  async visitTopicLearningTab(topicId: string) {
    await this.visitTopic(topicId);
    await this.topicTabsLearningTab.click();
  }
}
