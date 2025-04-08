import path from 'node:path';
import { expect, Page, test } from '@playwright/test';
import { Button, Checkbox, Input, Select } from '@core/components';
import { TopicBlockPlanTypes } from '@core/types/Topic';

export const enum AnswerTypes {
  OneAnswer = 'Один вариант ответа',
  TwoAnswers = 'Несколько вариантов ответа',
  OpenAnswer = 'Открытый',
  MatchingAnswers = 'Сопоставление',
}

interface BasicAnswer {
  answer: string;
  correct: boolean;
  imgUuid?: string;
}

interface BasicTest {
  question: string;
  coverImage?: string;
  answerType: AnswerTypes.OneAnswer | AnswerTypes.TwoAnswers;
  answers: BasicAnswer[];
}

interface OpenedTest {
  question: string;
  coverImage?: string;
  answerType: AnswerTypes.OpenAnswer;
}

interface MatchingAnswers {
  left: {
    content: string | null;
    image?: string;
  };
  right: {
    content: string | null;
    image?: string;
  };
}

interface MatchingTest {
  question: string;
  coverImage?: string;
  imagesMatching?: boolean;
  answerType: AnswerTypes.MatchingAnswers;
  matchingAnswers: MatchingAnswers[];
}

export type TestEntity = BasicTest | MatchingTest | OpenedTest;

export interface Test {
  blockPlanName: string;
  blockPlanType: TopicBlockPlanTypes.TEST;
  timeout?: string;
  mixAnswers?: boolean;
  mixQuestions?: boolean;
  allowAnswersCount?: string;
  poll?: boolean;
  test: TestEntity;
}

export class TestFields {
  private readonly selectors = {
    addQuestionBtn: this.page.locator('#addQuestionBtn'),
    importQuestionsBtn: this.page.locator('#importQuestionBtn'),
    addQuestionFromRandomizerBtn: this.page.locator('#addQuestionFromBankBtn'),
    externalResultsCheckbox: this.page.getByTestId('hideExtendedResultsCheckbox'),
    randomizerCheckbox: this.page.locator('//input[@name="randomizer"]'),
    mixAnswersCheckbox: this.page.getByTestId('mixAnswers'),
    mixQuestionsCheckbox: this.page.getByTestId('mixQuestions'),
    isPollCheckbox: this.page.getByTestId('pollCheckbox'),
    needReviewCheckbox: this.page.getByTestId('needReviewCheckbox'),
    passInput: this.page.getByTestId('adminLearningTestPassInput'),
    allowAnswersCountInput: this.page.getByTestId('allowedCount'),
    timeDatePickerInput: this.page.locator('#adminTopicLearningTestTimeDatepicker'),
    answerType: this.page.getByTestId('responseTypeDropDown'),
    answerTypeList: this.page.locator('//span[@data-qa="responseTypeDropDown-list"]/div[2]/div/div/div'),
    questionTextarea: this.page.getByTestId('questionTextInput'),
    addMoreAnswerBtn: this.page.getByTestId('adminTopicsLearningTestAddMoreAnswer'),
    openAnswerHasAttachmentCheckBox: this.page.getByTestId('adminTopicsLearningHasAttachmentCheckbox'),
    answersCollapse: this.page.getByTestId('adminLearningTestAnswersCollapse'),
    topicImageCropSubmitBtn: this.page.getByTestId('saveImageBtn'),
    answerInput: (i: number) => `//textarea[@data-qa="answerInput-${i}"]`,
    correctAnswerCheckbox: (i: number) => `(//input[@data-qa="correctAnswerCheckbox"])[${i + 1}]`,
    imgUuidInput: '#imgUuid',
    imgUuidRightInput: '#imgUuid-left-0',
    imgUuidLeftInput: '#imgUuid-right-0',
    rightAnswerInput: (i: number) => `//textarea[@data-qa="answerInput-right-${i}"]`,
    leftAnswerInput: (i: number) => `//textarea[@data-qa="answerInput-left-${i}"]`,
    addPairBtn: this.page.getByTestId('adminTopicsLearningTestAddPair'),
  };

  private readonly addPairBtn = new Button({
    page: this.page,
    locator: this.selectors.addPairBtn,
    name: '+ Добавить пару',
  });

  private readonly testAnswersCollapse = new Button({
    page: this.page,
    locator: this.selectors.answersCollapse,
    name: 'Список вопросов',
  });

  private readonly addOneMoreAnswerBtn = new Button({
    page: this.page,
    locator: this.selectors.addMoreAnswerBtn,
    name: '+ Добавить вариант ответа',
  });

  private readonly answerTypeDropDown = new Input({
    page: this.page,
    locator: this.selectors.answerType,
    name: 'Тип ответа',
  });

  private readonly answerTypeDropDownList = new Select({
    page: this.page,
    locator: this.selectors.answerTypeList,
    name: 'список типов ответа',
  });

  private readonly questionTextarea = new Input({
    page: this.page,
    locator: this.selectors.questionTextarea,
    name: 'Вопрос',
  });

  private readonly timeDatePickerInput = new Input({
    page: this.page,
    locator: this.selectors.timeDatePickerInput,
    name: 'Ограничения по времени',
  });

  private readonly addQuestionBtn = new Button({
    page: this.page,
    locator: this.selectors.addQuestionBtn,
    name: '+ Добавить вопрос',
  });

  private readonly importQuestionsBtn = new Button({
    page: this.page,
    locator: this.selectors.importQuestionsBtn,
    name: '+ Импорт вопросов',
  });

  private readonly addQuestionFromRandomizerBtn = new Button({
    page: this.page,
    locator: this.selectors.addQuestionFromRandomizerBtn,
    name: '+ Добавить вопрос из “Банка вопросов”',
  });

  private readonly externalResultsCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.externalResultsCheckbox,
    name: 'Расширенные результаты',
  });

  private readonly randomizerCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.randomizerCheckbox,
    name: 'Рандомайзер',
  });

  private readonly mixAnswersCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.mixAnswersCheckbox,
    name: 'Перемешать ответы',
  });

  private readonly mixQuestionsCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.mixQuestionsCheckbox,
    name: 'Перемешать вопросы',
  });

  private readonly isPollCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.isPollCheckbox,
    name: 'Опрос',
  });

  private readonly needReviewCheckbox = new Checkbox({
    page: this.page,
    locator: this.selectors.needReviewCheckbox,
    name: 'Требует ревью',
  });

  private readonly testPassInput = new Input({
    page: this.page,
    locator: this.selectors.passInput,
    name: 'Проходной балл',
  });

  private readonly allowAnswersCountInput = new Input({
    page: this.page,
    locator: this.selectors.allowAnswersCountInput,
    name: 'Количество прохождений',
  });

  private readonly topicImageCropSubmitBtn = new Button({
    page: this.page,
    locator: this.selectors.topicImageCropSubmitBtn,
    name: 'Сохранить изображение',
  });

  constructor(public page: Page) {}

  async clickAddQuestionBtn() {
    await this.addQuestionBtn.click();
  }

  async selectAnswerType(answerType: string) {
    await this.answerTypeDropDown.click();
    await this.answerTypeDropDownList.selectItemByTitle(answerType);
  }

  async fillQuestionTextarea(question: string) {
    await this.questionTextarea.fill(question);
  }

  async validateQuestionTextarea(question: string) {
    await this.questionTextarea.shouldHaveText(question);
  }

  async fillTimeout(timeout: string) {
    await this.timeDatePickerInput.fill(timeout);
  }

  async fillAllowAnswersCount(count: string) {
    await this.allowAnswersCountInput.fill(count);
  }

  async validateTimeout(timeout: string) {
    await this.timeDatePickerInput.shouldHaveValue(timeout);
  }

  async validateAllowAnswersCount(count: string) {
    await this.allowAnswersCountInput.shouldHaveValue(count);
  }

  async checkMixAnswersCheckbox() {
    await this.mixAnswersCheckbox.check();
  }

  async checkMixQuestionsCheckbox() {
    await this.mixQuestionsCheckbox.check();
  }

  async checkIsPollCheckbox() {
    await this.isPollCheckbox.check();
  }

  async validateMixAnswersCheckbox() {
    await this.mixAnswersCheckbox.shouldBeChecked();
  }

  async validateMixQuestionsCheckbox() {
    await this.mixQuestionsCheckbox.shouldBeChecked();
  }

  async validateIsPollCheckbox() {
    await this.isPollCheckbox.shouldBeChecked();
  }

  async fillTestOptions(test: Test) {
    await this.clickAddQuestionBtn();

    if (test.timeout) {
      await this.fillTimeout(test.timeout);
    }

    if (test.mixAnswers) {
      await this.checkMixAnswersCheckbox();
    }

    if (test.mixQuestions) {
      await this.checkMixQuestionsCheckbox();
    }

    if (test.allowAnswersCount) {
      await this.fillAllowAnswersCount(test.allowAnswersCount);
    }

    if (test.poll) {
      await this.checkIsPollCheckbox();
    }
  }

  async validateTestOptions(test: Test) {
    if (test.timeout) {
      await this.validateTimeout(test.timeout);
    }

    if (test.mixAnswers) {
      await this.validateMixAnswersCheckbox();
    }

    if (test.mixQuestions) {
      await this.validateMixQuestionsCheckbox();
    }

    if (test.allowAnswersCount) {
      await this.validateAllowAnswersCount(test.allowAnswersCount);
    }

    if (test.poll) {
      await this.validateIsPollCheckbox();
    }
  }

  async createTest(tests: TestEntity) {
    await this.selectAnswerType(tests.answerType);
    await this.fillQuestionTextarea(tests.question);

    if (tests.coverImage) {
      await this.uploadImage(tests.coverImage, this.selectors.imgUuidInput);
    }

    switch (tests.answerType) {
      case AnswerTypes.TwoAnswers:
      case AnswerTypes.OneAnswer:
        await this.handleBasicChoices(tests as BasicTest);
        break;
      case AnswerTypes.OpenAnswer:
        break;
      case AnswerTypes.MatchingAnswers:
        await this.handleMatchingAnswers(tests as MatchingTest);
        break;
      default:
        throw new Error('Unsupported answer type');
    }
  }

  private async uploadImage(imageName: string, selector: string) {
    const imagePath = path.resolve(__dirname, `../../../../assets/${imageName}`);
    await this.page.locator(selector).first().setInputFiles(imagePath);
    await this.topicImageCropSubmitBtn.click();
  }

  private async fillMatchingAnswers(answers: MatchingAnswers[]) {
    for (const [index, answer] of answers.entries()) {
      await test.step(`Заполнение ответа №${index + 1}`, async () => {
        await this.fillSingleAnswer(
          answer.left,
          this.selectors.imgUuidLeftInput,
          this.selectors.leftAnswerInput(index),
        );
        await this.fillSingleAnswer(
          answer.right,
          this.selectors.imgUuidRightInput,
          this.selectors.rightAnswerInput(index),
        );
      });
    }
  }

  private async fillSingleAnswer(
    answerPart: { content: string | null; image?: string },
    imageSelector: string,
    textSelector: string,
  ) {
    if (answerPart.content !== null) {
      if (answerPart.image) {
        await this.uploadImage(answerPart.image, imageSelector);
      } else {
        const answerLocator = this.page.locator(textSelector).first();
        await answerLocator.fill(answerPart.content);
      }
    }
  }

  private async handleMatchingAnswers(matchingTest: MatchingTest) {
    const initialAnswersCount = 2;
    const answersToAdd = Math.max(0, matchingTest.matchingAnswers.length - initialAnswersCount);

    for (let i = 0; i < answersToAdd; i++) {
      await this.addPairBtn.click();
    }

    await this.fillMatchingAnswers(matchingTest.matchingAnswers);
  }

  private async handleBasicChoices(basicTest: BasicTest) {
    const initialAnswersCount = 2;
    const answersToAdd = Math.max(0, basicTest.answers.length - initialAnswersCount);

    for (let i = 0; i < answersToAdd; i++) {
      await this.addOneMoreAnswerBtn.click();
    }

    await this.fillAnswers(basicTest.answers);
  }

  async validateTestBlock(testEntity: TestEntity) {
    await test.step(`Проверка корректности данных в тесте с типом - ${testEntity.answerType}`, async () => {
      await this.collapseAllQuestions();
      await this.validateQuestionTextarea(testEntity.question);

      switch (testEntity.answerType) {
        case AnswerTypes.TwoAnswers:
        case AnswerTypes.OneAnswer:
          await this.validateBasicTest(testEntity.answers);
          break;
        case AnswerTypes.OpenAnswer:
          break;
        case AnswerTypes.MatchingAnswers:
          await this.validateMatchingTest(testEntity.matchingAnswers);
          break;
        default:
          throw new Error('Unsupported answer type');
      }
    });
  }

  private async validateBasicTest(answers: BasicAnswer[]) {
    for (const [index, answer] of answers.entries()) {
      await test.step(`Ответ под номером ${index + 1} имеет значением - "${answer.answer}" `, async () => {
        await expect(this.page.locator(this.selectors.answerInput(index))).toHaveText(answer.answer);
      });

      if (answer.correct) {
        await test.step(`Значение "${answer.answer}" указано как правильный ответ`, async () => {
          await expect(this.page.locator(this.selectors.correctAnswerCheckbox(index))).toBeChecked();
        });
      }
    }
  }

  private async validateMatchingTest(answers: MatchingAnswers[]) {
    for (const [index, answer] of answers.entries()) {
      await test.step(`Проверка соответствия ответа №${index + 1}`, async () => {
        if (!answer.left.image && answer.left.content !== null) {
          const leftAnswerLocator = this.page.locator(this.selectors.leftAnswerInput(index)).first();
          await expect(leftAnswerLocator).toHaveText(answer.left.content as string);
        }

        if (!answer.right.image && answer.right.content !== null) {
          const rightAnswerLocator = this.page.locator(this.selectors.rightAnswerInput(index)).first();
          await expect(rightAnswerLocator).toHaveText(answer.right.content as string);
        }
      });
    }
  }

  private async collapseAllQuestions() {
    const questions = await this.testAnswersCollapse.locator.all();

    for (const [index] of questions.entries()) {
      await this.testAnswersCollapse.locator.nth(index).click();
    }
  }

  private async fillAnswers(answers: BasicAnswer[]) {
    for (const [index, answer] of answers.entries()) {
      await test.step(`Заполнение ответа №${index + 1} значением - "${answer.answer}"`, async () => {
        const answerLocator = this.page.locator(this.selectors.answerInput(index)).first();
        await answerLocator.fill(answer.answer);

        if (answer.imgUuid) {
          await this.uploadImage(answer.imgUuid, this.selectors.imgUuidInput);
        }

        if (answer.correct) {
          await test.step(`Отметить ответ "${answer.answer}" как правильный`, async () => {
            await this.page.locator(this.selectors.correctAnswerCheckbox(index)).check();
          });
        }
      });
    }
  }
}
