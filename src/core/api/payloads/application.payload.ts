import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const applicationPayload = () => {
  const link = faker.internet.url();

  return {
    authors: [],
    addressBook: [],
    addressesDelete: [],
    addressesAdd: [],
    tagNames: [testData.structures.tags[0].name],
    skillNames: [testData.structures.skills[0].name],
    qiwi: false,
    qiwiLibrary: false,
    errors: '',
    dates: [],
    scope: 'INTERNAL',
    statusScope: true,
    confirmVisible: '',
    confirmCloseCreate: false,
    imageSrc: '',
    eventName: 'Конференция',
    languageId: 1,
    typeLabelId: 14,
    hasCertificate: true,
    certificateRequest: {
      id: testData.structures.certificate.id,
      series: '1',
      minNumber: '100',
      maxNumber: '1000',
    },
    qiwiLibraryError: false,
    hasBadge: false,
    withSchedule: false,
    typeId: 5,
    subTypeId: null,
    comment: null,
    formChange: true,
    name: faker.book.title(),
    description: faker.lorem.words({ min: 5, max: 15 }),
    categoryIds: [testData.structures.topicCategories[0].id],
    levelId: testData.structures.levels[0].id,
    links: [
      {
        name: link,
        url: link,
      },
    ],
    cost: faker.number.int({ min: 100, max: 1000 }),
    duration: 60,
    tags: [
      {
        id: testData.structures.tags[0].id,
        name: testData.structures.tags[0].name,
      },
    ],
    skills: [
      {
        id: testData.structures.skills[0].id,
        name: testData.structures.skills[0].name,
      },
    ],
    webinarCreateEventRequest: [],
    authorNames: [],
  };
};
