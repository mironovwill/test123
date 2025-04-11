import { Page } from '@playwright/test';
import { Button, Modal } from '@core/components';
import { BadgeFields, BasicFields, CertificateFields, EventFields } from './fields';
import { ApplicationTopic, EventTopic, Topic, TopicTypes } from '@core/types';

export class AddEditTopicModal {
  readonly basicFields: BasicFields;
  readonly badgeFields: BadgeFields;
  readonly certificateFields: CertificateFields;
  readonly eventFields: EventFields;

  constructor(public page: Page) {
    this.basicFields = new BasicFields(page);
    this.badgeFields = new BadgeFields(page);
    this.certificateFields = new CertificateFields(page);
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
      case TopicTypes.EVENT:
        await this.fillEventDetails(topic);
        break;
      case TopicTypes.APPLICATION:
        await this.fillApplicationDetails(topic);
        break;
    }

    await this.clickSubmitBtn();
  }

  private async fillBasicFields({
    topicName,
    eventCheckbox,
    approveCheckbox,
    topicType,
    description,
    image,
  }: Topic) {
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
    if (topic.badgeCheckbox) await this.fillBadgeDetails(topic);
    if (topic.corpAccessCheckbox) await this.basicFields.checkCorpAccessCheckbox();
    if (topic.hasCertificateCheckbox) await this.fillCertificateDetails(topic);
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
    if (certificateNumbersMin)
      await this.certificateFields.fillCertificateNumbersMin(certificateNumbersMin);
    if (certificateNumbersMax)
      await this.certificateFields.fillCertificateNumbersMax(certificateNumbersMax);
  }

  private async fillBadgeDetails({ badgeName }: Topic) {
    await this.badgeFields.checkBadgeCheckbox();
    await this.badgeFields.selectBadge(badgeName!);
  }

  private async fillApplicationDetails({ cost, durationH, durationM }: ApplicationTopic) {
    if (cost) await this.basicFields.fillCostInput(cost);
    if (durationH) await this.basicFields.fillHoursInput(durationH);
    if (durationM) await this.basicFields.fillMinutesInput(durationM);
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
    if (participantsCount) await this.eventFields.fillUsersCountInput(participantsCount);

    if (platform) await this.eventFields.selectPlatform(platform);
    if (startTime) await this.eventFields.fillEventStartTime(startTime);
    if (endTime) await this.eventFields.fillEventEndTime(endTime);
    if (startDate) await this.eventFields.selectDatePickerDate(startDate);

    if (corpAccessCheckbox) {
      if (eventName) await this.eventFields.fillEventName(eventName);
      if (responsiblePersons)
        await this.eventFields.fillResponsiblePersonsInput(responsiblePersons);
    }

    if (platform === 'МТС ЛИНК') {
      if (entrance) await this.eventFields.selectEventEntrance(entrance);
      if (percent) await this.eventFields.fillPercentOfPassingInput(percent);
      if (webinarType) await this.eventFields.selectWebinarType(webinarType);
    }

    if (place) await this.eventFields.fillEventPlaceTextArea(place);
  }
}
