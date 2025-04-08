import { Page } from '@playwright/test';
import { Button, Modal } from '@core/components';
import { BadgeFields, BasicFields, BookFields, CertificateFields, ECourseFields, EventFields } from './fields';
import {
  ApplicationTopic,
  ArticleTopic,
  BookTopic,
  CorporateCourseTopic,
  ECourseTopic,
  EventTopic,
  ExternalCourseTopic,
  InfographicTopic,
  PodcastTopic,
  PollTopic,
  TestTopic,
  Topic,
  TopicTypes,
  VideoTopic,
} from '@core/types';

export class AddEditTopicModal {
  readonly basicFields: BasicFields;
  readonly badgeFields: BadgeFields;
  readonly bookFields: BookFields;
  readonly certificateFields: CertificateFields;
  readonly eCourseFields: ECourseFields;
  readonly eventFields: EventFields;

  constructor(public page: Page) {
    this.basicFields = new BasicFields(page);
    this.badgeFields = new BadgeFields(page);
    this.bookFields = new BookFields(page);
    this.certificateFields = new CertificateFields(page);
    this.eCourseFields = new ECourseFields(page);
    this.eventFields = new EventFields(page);
  }

  private readonly selectors = {
    modal: this.page.getByTestId('addTopicModalForm'),
    submitBtn: this.page.getByTestId('submitButton'),
    deleteImageBtn: this.page.locator('#deleteImage'),
  };

  private readonly deleteImageBtn = new Button({
    page: this.page,
    locator: this.selectors.deleteImageBtn,
    name: 'Удалить обложку',
  });

  private readonly submitBtn = new Button({
    page: this.page,
    locator: this.selectors.submitBtn,
    name: 'Добавить материал',
  });

  private readonly modal = new Modal({
    page: this.page,
    locator: this.selectors.modal,
    name: 'Модальное окно',
  });

  private async clickDeleteImageBtn() {
    await this.deleteImageBtn.click();
  }

  private async clickSubmitBtn() {
    await this.submitBtn.click();
  }

  async validateModalIsOpened() {
    await this.modal.shouldBeVisible();
  }

  async createTopic(topic: Topic) {
    await this.fillBasicFields(topic);
    await this.fillAdditionalFields(topic);

    switch (topic.topicType) {
      case TopicTypes.BOOK:
        await this.fillBookDetails(topic);
        break;
      case TopicTypes.ARTICLE:
      case TopicTypes.INFOGRAPHIC:
      case TopicTypes.POLL:
      case TopicTypes.TEST:
        await this.fillTopicTypeFifteenDetails(topic);
        break;
      case TopicTypes.CORPORATE_COURSE:
      case TopicTypes.EXTERNAL_COURSE:
        await this.fillCorporateExternalCourseDetails(topic);
        break;
      case TopicTypes.E_COURSE:
        await this.fillECourseDetails(topic);
        break;
      case TopicTypes.EVENT:
        await this.fillEventDetails(topic);
        break;
      case TopicTypes.VIDEO:
      case TopicTypes.PODCASTS:
        await this.fillFourTopicTypeDetails(topic);
        break;
      case TopicTypes.APPLICATION:
        await this.fillApplicationDetails(topic);
        break;
    }

    await this.clickSubmitBtn();
  }

  private async fillBasicFields({ topicName, eventCheckbox, approveCheckbox, topicType, description, image }: Topic) {
    await this.basicFields.fillTopicName(topicName);
    await this.basicFields.selectTopicType(topicType);
    if (eventCheckbox) await this.basicFields.checkEventCheckbox();
    if (approveCheckbox) await this.basicFields.checkApproveCheckbox();
    await this.basicFields.fillDescription(description);
    if (image) await this.basicFields.uploadImage(image);
  }

  private async fillAdditionalFields(topic: Topic) {
    if (topic.tags) await this.basicFields.fillTags(topic.tags);
    if (topic.skills) await this.basicFields.fillSkills(topic.skills);

    await this.basicFields.selectLanguage(topic.language);
    await this.basicFields.fillCategories(topic.categories);
    await this.basicFields.selectLevel(topic.level);

    if (topic.links) await this.basicFields.fillLinkInput(topic.links);
    if (topic.files) await this.basicFields.uploadFiles(topic.files);
    if (topic.corpAccessCheckbox) await this.basicFields.checkCorpAccessCheckbox();
    if (topic.hasCertificateCheckbox) await this.fillCertificateDetails(topic);
    if (topic.badgeCheckbox) await this.fillBadgeDetails(topic);
  }

  private async fillCertificateDetails({
    certificateName,
    certificateSeries,
    certificateNumbersMax,
    certificateNumbersMin,
  }: Topic) {
    await this.certificateFields.checkHasCertificateCheckbox();
    await this.certificateFields.selectCertificate(certificateName!);
    if (certificateSeries) await this.certificateFields.fillCertificateSeries(certificateSeries);
    if (certificateNumbersMin) await this.certificateFields.fillCertificateNumbersMin(certificateNumbersMin);
    if (certificateNumbersMax) await this.certificateFields.fillCertificateNumbersMax(certificateNumbersMax);
  }

  private async fillBadgeDetails({ badgeName }: Topic) {
    await this.badgeFields.checkBadgeCheckbox();
    await this.badgeFields.selectBadge(badgeName!);
  }

  private async fillBookDetails({
    authors,
    bookPublisher,
    paper,
    addressBook,
    cost,
    year,
    durationH,
    durationM,
  }: BookTopic) {
    if (authors) await this.basicFields.fillAuthorInput(authors);
    if (bookPublisher) await this.basicFields.fillCompanyInput(bookPublisher);
    if (paper) await this.bookFields.checkInPaperCheckbox();
    if (addressBook) await this.bookFields.fillAddressBookInput(addressBook);
    if (cost) await this.basicFields.fillCostInput(cost);
    if (year) await this.basicFields.fillYearInput(year);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
  }

  private async fillApplicationDetails({ cost, durationH, durationM }: ApplicationTopic) {
    if (cost) await this.basicFields.fillCostInput(cost);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
  }

  private async fillCorporateExternalCourseDetails({
    authors,
    cost,
    durationH,
    durationM,
    company,
    type,
    period,
    place,
  }: CorporateCourseTopic | ExternalCourseTopic) {
    if (authors) await this.basicFields.fillAuthorInput(authors);
    if (cost) await this.basicFields.fillCostInput(cost);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
    if (company) await this.basicFields.fillCompanyInput(company);

    if (type === 'Онлайн') {
      await this.eventFields.selectTopicTypeOnlineTab();
      if (period) await this.eventFields.selectPeriodInput(period);
      if (place) await this.eventFields.fillMeetPlaceInput(place);
    }
  }

  private async fillECourseDetails({
    authors,
    period,
    startTimeH,
    startTimeM,
    durationH,
    durationM,
    company,
    place,
  }: ECourseTopic) {
    if (authors) await this.basicFields.fillAuthorInput(authors);
    if (period) await this.eventFields.selectPeriodInput(period);
    if (startTimeH && startTimeM) await this.eCourseFields.fillStartTimeInputs(startTimeH, startTimeM);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
    if (company) await this.basicFields.fillCompanyInput(company);
    if (place) await this.eventFields.fillMeetPlaceInput(place);
  }

  private async fillEventDetails({
    authors,
    cost,
    company,
    comment,
    platform,
    participantsCount,
    startTime,
    endTime,
    startDate,
    corpAccessCheckbox,
    eventName,
    responsiblePersons,
    entrance,
    percent,
    webinarType,
    place,
  }: EventTopic) {
    if (authors) await this.basicFields.fillAuthorInput(authors);
    if (cost) await this.basicFields.fillCostInput(cost);
    if (company) await this.basicFields.fillCompanyInput(company);
    if (comment) await this.eventFields.fillCommentInput(comment);
    if (platform) await this.eventFields.selectPlatform(platform);
    if (participantsCount) await this.eventFields.fillUsersCountInput(participantsCount);
    if (startTime) await this.eventFields.fillEventStartTime(startTime);
    if (endTime) await this.eventFields.fillEventEndTime(endTime);
    if (startDate) await this.eventFields.selectDatePickerDate(startDate);

    if (corpAccessCheckbox) {
      if (eventName) await this.eventFields.fillEventName(eventName);
      if (responsiblePersons) await this.eventFields.fillResponsiblePersonsInput(responsiblePersons);
    }

    if (platform === 'МТС ЛИНК') {
      if (entrance) await this.eventFields.selectEventEntrance(entrance);
      if (percent) await this.eventFields.fillPercentOfPassingInput(percent);
      if (webinarType) await this.eventFields.selectWebinarType(webinarType);
    } else if (place) {
      await this.eventFields.fillEventPlaceTextArea(place);
    }
  }

  private async fillTopicTypeFifteenDetails({
    authors,
    year,
    durationH,
    durationM,
  }: ArticleTopic | InfographicTopic | PollTopic | TestTopic) {
    if (authors) await this.basicFields.fillAuthorInput(authors);
    if (year) await this.basicFields.fillYearInput(year);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
  }

  private async fillFourTopicTypeDetails({ authors, company, durationH, durationM }: VideoTopic | PodcastTopic) {
    if (authors) await this.basicFields.fillAuthorInput(authors);
    if (company) await this.basicFields.fillCompanyInput(company);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
  }
}
