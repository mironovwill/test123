import { Page, test } from '@playwright/test';
import { Input, Typography } from '@core/components';

export class ArticleFields {
  private readonly selectors = {
    topicLearningArticleInput: this.page.locator('//div[@data-placeholder="Поле ввода"]'),
    topicLearningArticleValue: this.page.locator('//div[@data-placeholder="Поле ввода"]/p'),
  };

  private readonly blockPlanArticleInput = new Input({
    page: this.page,
    locator: this.selectors.topicLearningArticleInput,
    name: 'Поле ввода статьи',
  });

  private readonly articleValue = new Typography({
    page: this.page,
    locator: this.selectors.topicLearningArticleValue,
    name: 'Поле ввода статьи',
  });

  constructor(public page: Page) {}

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ FILLS                                                    ║
  //    ╚══════════════════════════════════════════════════════════╝

  async fillArticleInput(value: string) {
    await this.blockPlanArticleInput.click();

    await test.step(`Заполнить поле статьи значением - "${value}"`, async () => {
      await this.page.evaluate(([value]) => navigator.clipboard.writeText(value), [value]);
      const handle = await this.page.evaluateHandle(() => navigator.clipboard.readText());
      await handle.jsonValue();
      await this.page.locator('html').press('Meta+v');
    });
  }

  //    ╔══════════════════════════════════════════════════════════╗
  //    ║ VALIDATE                                                 ║
  //    ╚══════════════════════════════════════════════════════════╝

  async validateArticleValue(value: string) {
    await this.articleValue.shouldHaveText(value);
  }
}
