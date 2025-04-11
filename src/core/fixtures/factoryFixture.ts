import { Page } from '@playwright/test';
import {
  AdminTopicLearningPage,
  AdminTopicPage,
  AdminTopicsPage,
} from '@core/page-object/pages/admin';
import { Topic, TopicBlockPlanTypes } from '@core/types';
import { AdminApiClient } from '@core/api/clients/admin.client';

type TopicFactory = (topic: Topic) => Promise<string>;

type BlockPlanFactory = (
  blockPlanName: string,
  blockPlanType: TopicBlockPlanTypes,
  topicId: string,
) => Promise<void>;

export interface TopicFactoryFixture {
  createTopicByUI: TopicFactory;
  createBlockPlanByUI: BlockPlanFactory;
}

export const topicFactoryFixture = {
  createTopicByUI: async (
    { page, adminApiClient }: { page: Page; adminApiClient: AdminApiClient },
    use: (factory: TopicFactory) => Promise<void>,
  ) => {
    const createdTopics: string[] = [];

    const topicFactory = async (topic: Topic): Promise<string> => {
      const adminTopicsPage = new AdminTopicsPage(page);

      await adminTopicsPage.visit();
      await adminTopicsPage.validateH1Text();
      await adminTopicsPage.clickAddTopicBtn();
      await adminTopicsPage.addEditTopicModal.createTopic(topic);

      const id = await adminTopicsPage.getTopicIdFromResponse(adminTopicsPage.page);
      createdTopics.push(id);

      await adminTopicsPage.validateSuccessNotification();
      if (topic.badgeCheckbox) {
        await adminTopicsPage.validateRewardNotification();
      }

      await adminTopicsPage.validateFirstTopicLink(id);
      await adminTopicsPage.validateFirstTopicCardName(topic.topicName);

      return id;
    };

    await use(topicFactory);

    await Promise.all(createdTopics.map(topicId => adminApiClient.deleteTopicById(+topicId)));
  },

  createBlockPlanByUI: async (
    { page, adminApiClient }: { page: Page; adminApiClient: AdminApiClient },
    use: (factory: BlockPlanFactory) => Promise<void>,
  ) => {
    const createdBlockPlans: number[] = [];

    const blockPlanFactory: BlockPlanFactory = async (blockPlanName, blockPlanType, topicId) => {
      const adminTopicLearningPage = new AdminTopicLearningPage(page);
      const adminTopicPage = new AdminTopicPage(page);

      await adminTopicPage.visitTopicLearningTab(topicId);
      await adminTopicLearningPage.createBlockPlan(blockPlanName, blockPlanType);

      const id = await adminTopicLearningPage.getBlockPlanIdFromResponse(
        adminTopicLearningPage.page,
      );
      createdBlockPlans.push(id);

      await adminTopicLearningPage.clickToBlockPlanByName(blockPlanName);
    };

    await use(blockPlanFactory);

    await Promise.all(createdBlockPlans.map(id => adminApiClient.deleteBlockById(+id)));
  },
};
