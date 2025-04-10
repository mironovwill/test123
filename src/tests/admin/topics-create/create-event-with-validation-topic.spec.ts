import { appFixture as test } from '@core/fixtures';
import { epic, feature } from 'allure-js-commons';
import { calculateTopicDuration } from '@core/helpers';
import { eventWithValidationTopicInfo } from './test-data';

test.describe(
  'Создание и проверка топика с типом "Событие с согласованием"',
  { tag: ['@Smoke', '@Admin', '@Событие с согласованием'] },
  () => {
    const { startTime, endTime, badgeName, authors, links, files, cost, company } =
      eventWithValidationTopicInfo;
    const topicDuration = calculateTopicDuration(startTime!, endTime!);
    let topicId: string;

    test.beforeEach(async ({ createTopicByUI }) => {
      await epic('Панель администратора');
      await feature('Создание и проверка топиков');
      topicId = await createTopicByUI(eventWithValidationTopicInfo);
    });

    test('Проверка топика с типом "Событие с согласованием" @allure.id=195', async ({
      adminTopicPage,
    }) => {
      await adminTopicPage.visitTopic(topicId);
      await adminTopicPage.validateBasicTopicInfo(eventWithValidationTopicInfo, topicId);
      await adminTopicPage.validateTopicInternalUseText();
      await adminTopicPage.validateTopicBadge(badgeName!);
      await adminTopicPage.validateTopicAuthors(authors!);
      await adminTopicPage.validateTopicLinks(links!);
      await adminTopicPage.validateFilesList(files!);
      await adminTopicPage.validateTopicCost(cost!);
      await adminTopicPage.validateTopicCompany(company!);
      await adminTopicPage.validateTopicDuration(topicDuration);
    });
  },
);
