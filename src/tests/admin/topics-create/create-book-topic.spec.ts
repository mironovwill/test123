import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import { bookTopicInfo } from './test-data/book.test-data';

test.describe(
  'Создание и проверка топика с типом "Книга"',
  { tag: ['@Regress', '@Admin', '@Книга'] },
  () => {
    let topicId: string;

    test.beforeEach(async ({ createTopicByUI }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      topicId = await createTopicByUI(bookTopicInfo);
    });

    test('Проверка топика с типом "Книга" @allure.id=174', async ({ adminTopicPage }) => {
      await test.step('Проверка основной информации топика', async () => {
        await adminTopicPage.visitTopic(topicId);
        await adminTopicPage.validateBasicTopicInfo(bookTopicInfo, topicId);
        await adminTopicPage.validateAdditionalTopicInfo(bookTopicInfo);
        await adminTopicPage.validateTopicAuthors(bookTopicInfo.authors!);
        await adminTopicPage.validateTopicPublisher(bookTopicInfo.bookPublisher!);
        await adminTopicPage.validateBookInPaper(bookTopicInfo.paper!);
        await adminTopicPage.validateTopicCost(bookTopicInfo.cost!);
        await adminTopicPage.validateTopicYear(bookTopicInfo.year!);
        await adminTopicPage.validateTopicDuration(
          bookTopicInfo.durationH,
          bookTopicInfo.durationM,
        );
      });
    });
  },
);
