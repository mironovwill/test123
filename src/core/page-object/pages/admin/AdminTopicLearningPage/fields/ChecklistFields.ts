import { expect, Page, test } from '@playwright/test';
import { Button, Input } from '@core/components';

export class ChecklistFields {
  private readonly selectors = {
    descriptionInput: this.page.getByTestId('assesorChecklistDescriptionInput'),
    itemValueInput: this.page.getByTestId('assesorChecklistItemValueInput'),
    addNewItemBtn: this.page.getByTestId('adminTopicsLearningAddNewChecklist'),
  };

  private readonly descriptionInput = new Input({
    page: this.page,
    locator: this.selectors.descriptionInput,
    name: 'Описание чек-листа:',
  });

  private readonly addNewItemBtn = new Button({
    page: this.page,
    locator: this.selectors.addNewItemBtn,
    name: '+ Добавить пункт',
  });

  private readonly itemValueInput = new Input({
    page: this.page,
    locator: this.selectors.itemValueInput,
    name: 'Значение пункта:',
  });

  constructor(public page: Page) {}

  private async clickAddNewItemBtn() {
    await this.addNewItemBtn.click();
  }

  private async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async fillChecklist(description: string, firstItemValue: string, secondItemValue: string) {
    await test.step('Заполнить блок "Чеклист" данными', async () => {
      await this.fillDescription(description);
      const firstItemValueInput = this.itemValueInput.locator.first();
      const lastItemValueInput = this.itemValueInput.locator.last();

      await firstItemValueInput.fill(firstItemValue);
      await this.clickAddNewItemBtn();
      await lastItemValueInput.fill(secondItemValue);
    });
  }

  private async validateDescription(value: string) {
    await this.descriptionInput.shouldHaveText(value);
  }

  async validateChecklist(description: string, firstItemValue: string, secondItemValue: string) {
    await this.validateDescription(description);
    await test.step('Проверить данные в пунктах чеклиста', async () => {
      const firstItemValueLocator = this.itemValueInput.locator.first();
      const lastItemValueLocator = this.itemValueInput.locator.last();

      await expect(firstItemValueLocator).toHaveText(firstItemValue);
      await expect(lastItemValueLocator).toHaveText(secondItemValue);
    });
  }
}
