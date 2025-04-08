import { Page } from '@playwright/test';
import { AdminTopicsPage } from '@core/page-object/pages/admin';
import { Topic } from '@core/types/Topic';
import { AdminApiClient } from '@core/api/clients/admin.client';

export interface TopicFactoryFixture {
  createTopicByUI: (topic: Topic) => Promise<string>;
}

export const topicFactoryFixture = {
  createTopicByUI: async (
    { page, adminApiClient }: { page: Page; adminApiClient: AdminApiClient },
    use: (factory: (topic: Topic) => Promise<string>) => Promise<void>,
  ) => {
    const createdTopics: string[] = [];

    const topicFactory = async (topic: Topic) => {
      const adminTopicsPage = new AdminTopicsPage(page);
      await adminTopicsPage.visit();
      await adminTopicsPage.validateH1Text();
      await adminTopicsPage.clickAddTopicBtn();
      await adminTopicsPage.addEditTopicModal.createTopic(topic);
      const id = await adminTopicsPage.getTopicIdFromResponse(adminTopicsPage.page);
      await adminTopicsPage.validateSuccessNotification();
      await adminTopicsPage.validateFirstTopicLink(id);
      await adminTopicsPage.validateFirstTopicCardName(topic.topicName);
      createdTopics.push(id);
      return id;
    };

    await use(topicFactory);

    await Promise.all(createdTopics.map(topicId => adminApiClient.deleteTopicById(+topicId)));
  },
};
