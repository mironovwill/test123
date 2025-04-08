import { test as base } from '@playwright/test';
import { ContextFixture, contextFixture } from './contextFixture';
import { AdminPagesFixture, adminPagesFixture } from './adminPagesFixture';
import { TopicFactoryFixture, topicFactoryFixture } from './factoryFixture';
import { combineFixtures } from '@core/helpers';
import { UserPagesFixture, userPagesFixture } from './userPagesFixture';

export const appFixture = base.extend<
  ContextFixture & AdminPagesFixture & TopicFactoryFixture & UserPagesFixture
>(
  combineFixtures({
    ...contextFixture,
    ...adminPagesFixture,
    ...topicFactoryFixture,
    ...userPagesFixture,
  }),
);
