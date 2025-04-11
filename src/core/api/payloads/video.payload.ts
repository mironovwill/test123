import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const videoPayload = () => {
  const link = faker.internet.url();

  return {
    authors: [
      {
        id: testData.structures.authors[0].id,
        name: testData.structures.authors[0].name,
      },
    ],
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
    typeLabelId: 12,
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
    name: faker.book.title(),
    typeId: 4,
    subTypeId: null,
    comment: null,
    formChange: true,
    description: faker.lorem.words({ min: 5, max: 15 }),
    categoryIds: [testData.structures.topicCategories[0].id],
    levelId: testData.structures.levels[0].id,
    links: [
      {
        name: link,
        url: link,
      },
    ],
    publisher: faker.company.name(),
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
    authorNames: [testData.structures.authors[0].name],
  };
};
