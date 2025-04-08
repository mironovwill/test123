import { Page } from '@playwright/test';

export class Chapters {
  private readonly selectors = {
    topicLearningAddChapterBtn: this.page.getByTestId('adminTopicLearningAddChapter'),
    topicLearningChapterEllipsisListBtn: this.page.getByTestId('adminLearningChapterDropdownMenu'),
    topicLearningChapterEllipsisListRenameBtn: this.page.getByTestId('adminLearningChapterDropdownMenuRenameBtn'),
    topicLearningChapterEllipsisListDeleteBtn: this.page.getByTestId('adminLearningChapterDropdownMenuDeleteBtn'),
    topicLearningChapterEditModalRenameInput: this.page.getByTestId('chapterNameChangeInput'),
    topicLearningChapterEditModalSubmitBtn: this.page.getByTestId('submitChapterNameChangeBtn'),
  };

  constructor(public page: Page) {}
}
