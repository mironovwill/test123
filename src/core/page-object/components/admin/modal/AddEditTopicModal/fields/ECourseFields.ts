import { Page } from '@playwright/test';
import { Input } from '@core/components';

export class ECourseFields {
  private readonly selectors = {
    startTimeHInput: this.page.getByTestId('adminTopicStartTimeHoursInput'),
    startTimeMInput: this.page.getByTestId('adminTopicStartTimeMinutesInput'),
  };

  private readonly startTimeHInput = new Input({
    page: this.page,
    locator: this.selectors.startTimeHInput,
    name: 'Время начала (часы)',
  });

  private readonly startTimeMInput = new Input({
    page: this.page,
    locator: this.selectors.startTimeMInput,
    name: 'Время начала (минуты)',
  });

  constructor(public page: Page) {}

  async fillStartTimeHInput(hours: string) {
    await this.startTimeHInput.fill(hours);
  }

  async fillStartTimeMInput(minutes: string) {
    await this.startTimeMInput.fill(minutes);
  }

  async fillStartTimeInputs(h: string, m: string) {
    await this.fillStartTimeHInput(h);
    await this.fillStartTimeMInput(m);
  }
}
