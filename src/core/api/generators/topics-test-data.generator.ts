import { AdminApiClient } from '@core/api/clients/admin.client';
import {
  bookPayload,
  videoPayload,
  applicationPayload,
  articlePayload,
  baseEventPayload,
  eventWithValidationPayload,
  eventMtsLinkPayload,
  eCoursePayload,
} from '@core/api/payloads';

/**
 * Генерирует тестовые данные для топиков
 * @param adminApiClient - клиент админского API
 * @returns объект с созданными топиками и их ID
 */
export const generateTopicsTestData = async (adminApiClient: AdminApiClient) => {
  try {
    // Создаем топики параллельно для оптимизации
    const [
      bookTopic,
      videoTopic,
      articleTopic,
      applicationTopic,
      baseEventTopic,
      eventWithValidationTopic,
      eventMtsLinkTopic,
      eCourseTopic,
    ] = await Promise.all([
      adminApiClient.createTopic(bookPayload()),
      adminApiClient.createTopic(videoPayload()),
      adminApiClient.createTopic(articlePayload()),
      adminApiClient.createTopic(applicationPayload()),
      adminApiClient.createTopic(baseEventPayload()),
      adminApiClient.createTopic(eventWithValidationPayload()),
      adminApiClient.createTopic(eventMtsLinkPayload()),
      adminApiClient.createTopic(eCoursePayload()),
    ]);

    const topicsIds = [
      eventMtsLinkTopic.id,
      bookTopic.id,
      videoTopic.id,
      articleTopic.id,
      applicationTopic.id,
      baseEventTopic.id,
      eventWithValidationTopic.id,
      eCourseTopic.id,
    ];

    // Меняем видимость топиков последовательно
    await Promise.all(topicsIds.map(topicId => adminApiClient.changeTopicVisibility(topicId)));

    return {
      bookTopic,
      videoTopic,
      articleTopic,
      applicationTopic,
      baseEventTopic,
      eventWithValidationTopic,
      topicsIds,
      eventMtsLinkTopic,
      eCourseTopic,
    };
  } catch (error) {
    console.error('Ошибка при генерации тестовых данных:', error);
    throw error;
  }
};
