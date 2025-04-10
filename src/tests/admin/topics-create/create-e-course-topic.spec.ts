import { appFixture as test } from '@core/fixtures';
import { eCourseTopicInfo } from './test-data';

const { authors, company, place } = eCourseTopicInfo;
let topicId: string;

test.describe(
  `Создание и проверка топика с типом "Электронный курс"`,
  { tag: ['@Regress', '@Admin', '@Электронный курс'] },
  () => {
    test.beforeEach(async ({ createTopicByUI }) => {
      topicId = await createTopicByUI(eCourseTopicInfo);
    });

    test(`Проверка топика с типом "Электронный курс" @allure.id=191"`, async ({
      adminTopicPage,
    }) => {
      await adminTopicPage.visitTopic(topicId);
      await adminTopicPage.validateBasicTopicInfo(eCourseTopicInfo, topicId);
      await adminTopicPage.validateAdditionalTopicInfo(eCourseTopicInfo);
      await adminTopicPage.validateTopicAuthors(authors!);
      //TODO: Стиль, время начала, длительность
      await adminTopicPage.validateTopicCompany(company!);
      await adminTopicPage.validateMeetPlace(place!);
    });
  },
);
