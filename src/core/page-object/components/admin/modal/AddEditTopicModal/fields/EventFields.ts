import test, { Locator, Page } from '@playwright/test';
import { Button, Input, Select } from '@core/components';

export class EventFields {
  private readonly selectors = {
    meetPlaceInput: this.page.locator('#meetPlaceInput'),
    usersCountInput: this.page.locator('#usersCountInput'),
    commentInput: this.page.locator('#commentInput'),
    periodInput: this.page.locator('#periodInput'),
    eventStartTimeDatePicker: this.page.locator('#datePickerEventStartTime'),
    eventEndTimeDatePicker: this.page.locator('#datePickerEventEndTime'),
    eventPlaceTextarea: this.page.locator('#eventPlaceTextarea'),
    eventAdditionalScheduleBtn: this.page.locator('#additionalScheduleBtn'),
    eventAccountableInput: this.page.locator('#adminTopicAccountableInput'),
    eventNameInput: this.page.locator('[name="eventName"]'),
    topicTypeOnlineTab: this.page.getByText('Онлайн', { exact: true }),
    topicTypeFullTimeTab: this.page.getByText('Очный', { exact: true }),
    platformInput: this.page.getByText('Нет', { exact: true }),
    eventEntranceInput: this.page.getByText('Свободный доступ', { exact: true }),
    eventWebinarTypeInput: this.page.getByText('Вебинар', { exact: true }),
    eventPercentageOfPassingInput: this.page.getByTestId('adminTopicPercentageOfPassingInput'),
    resultList: this.page.locator('.rc-virtual-list-holder-inner'),
  };

  private readonly resultList = new Select({
    page: this.page,
    locator: this.selectors.resultList,
    name: 'Список элементов',
  });

  private readonly meetPlaceInput = new Input({
    page: this.page,
    locator: this.selectors.meetPlaceInput,
    name: 'Место проведения',
  });

  private readonly usersCountInput = new Input({
    page: this.page,
    locator: this.selectors.usersCountInput,
    name: 'Количество участников',
  });

  private readonly commentInput = new Input({
    page: this.page,
    locator: this.selectors.commentInput,
    name: 'Комментарий',
  });

  private readonly periodInput = new Input({
    page: this.page,
    locator: this.selectors.periodInput,
    name: 'Периодичность',
  });

  private readonly eventStartTimeDatePicker = new Input({
    page: this.page,
    locator: this.selectors.eventStartTimeDatePicker,
    name: 'Время начала',
  });

  private readonly eventEndTimeDatePicker = new Input({
    page: this.page,
    locator: this.selectors.eventEndTimeDatePicker,
    name: 'Время окончания',
  });

  private readonly eventPlaceTextarea = new Input({
    page: this.page,
    locator: this.selectors.eventPlaceTextarea,
    name: 'Место проведения',
  });

  private readonly eventAdditionalScheduleBtn = new Button({
    page: this.page,
    locator: this.selectors.eventAdditionalScheduleBtn,
    name: 'Доп. расписание',
  });

  private readonly eventAccountableInput = new Input({
    page: this.page,
    locator: this.selectors.eventAccountableInput,
    name: 'Ответственные лица',
  });

  private readonly eventNameInput = new Input({
    page: this.page,
    locator: this.selectors.eventNameInput,
    name: 'Название мероприятия',
  });

  private readonly topicTypeOnlineTab = new Button({
    page: this.page,
    locator: this.selectors.topicTypeOnlineTab,
    name: 'Онлайн',
  });

  private readonly topicTypeFullTimeTab = new Button({
    page: this.page,
    locator: this.selectors.topicTypeFullTimeTab,
    name: 'Очный',
  });

  private readonly platformInput = new Button({
    page: this.page,
    locator: this.selectors.platformInput,
    name: 'Платформа',
  });

  private readonly eventEntranceInput = new Button({
    page: this.page,
    locator: this.selectors.eventEntranceInput,
    name: 'Свободный доступ',
  });

  private readonly eventWebinarTypeInput = new Button({
    page: this.page,
    locator: this.selectors.eventWebinarTypeInput,
    name: 'Вебинар',
  });

  private readonly eventPercentageOfPassingInput = new Input({
    page: this.page,
    locator: this.selectors.eventPercentageOfPassingInput,
    name: 'Процент прохождения',
  });

  constructor(public page: Page) {}

  async fillMeetPlaceInput(meetPlace: string) {
    await this.meetPlaceInput.fill(meetPlace);
  }

  async selectPeriodInput(period: string) {
    await this.periodInput.click();
    await this.resultList.selectItemByTitle(period);
  }

  async selectTopicTypeOnlineTab() {
    await this.topicTypeOnlineTab.click();
  }

  async selectTopicTypeFullTimeTab() {
    await this.topicTypeFullTimeTab.click();
  }

  async fillCommentInput(comment: string) {
    await this.commentInput.fill(comment);
  }

  async selectPlatform(platform: string) {
    await this.platformInput.click();
    await this.resultList.selectItemByTitle(platform);
  }

  async fillUsersCountInput(usersCount: string) {
    await this.usersCountInput.fill(usersCount);
  }

  async fillResponsiblePersonsInput(responsiblePersons: string[]) {
    for (const person of responsiblePersons) {
      await test.step(`Выбор ответственного лица ${person}`, async () => {
        await this.eventAccountableInput.click();
        await this.eventAccountableInput.fill(person);
        await this.resultList.selectItemByTitle(person);
      });
    }
  }

  async fillEventPlaceTextArea(eventPlace: string) {
    await this.eventPlaceTextarea.fill(eventPlace);
  }

  async fillEventStartTime(date: string) {
    await this.eventStartTimeDatePicker.fill(date);
    await this.page.keyboard.press('Enter');
  }

  async fillEventEndTime(date: string) {
    await this.eventEndTimeDatePicker.fill(date);
    await this.page.keyboard.press('Enter');
  }

  private async isDateDisabled(element: Locator) {
    const classes = await element.getAttribute('class');
    return classes?.includes('ant-picker-cell-disabled');
  }

  async selectDatePickerDate(date: string) {
    await test.step(`В календаре выбрать день: ${date}`, async () => {
      const element = this.page.locator(`(//div[text()=${date}])[1]/..`);

      if (await this.isDateDisabled(element)) {
        await this.page
          .getByRole('button', { name: 'Следующий месяц (PageDown)', exact: true })
          .click();
      }

      await element.click();
    });
  }

  async clickEventAdditionalScheduleBtn() {
    await this.eventAdditionalScheduleBtn.click();
  }

  async selectEventEntrance(entrance: string) {
    await this.eventEntranceInput.click();
    await this.resultList.selectItemByTitle(entrance);
  }

  async fillPercentOfPassingInput(percent: string) {
    await this.eventPercentageOfPassingInput.fill(percent);
  }

  async fillEventName(eventName: string) {
    await this.eventNameInput.fill(eventName);
  }

  async selectWebinarType(webinarType: string) {
    await this.eventWebinarTypeInput.click();
    await this.resultList.selectItemByTitle(webinarType);
  }
}
