import { faker } from '@faker-js/faker/locale/ru';
import testData from '@test-data';

export const bookPayload = () => {
  const link = faker.internet.url();

  return {
    authors: [
      {
        id: testData.structures.authors[0].id,
        name: testData.structures.authors[0].name,
      },
    ],
    addressBook: [
      {
        id: testData.structures.bookAddress[0].id,
        name: testData.structures.bookAddress[0].address,
      },
    ],
    addressesDelete: [],
    addressesAdd: [
      {
        id: testData.structures.bookAddress[0].id,
        name: testData.structures.bookAddress[0].address,
      },
    ],
    tagNames: [testData.structures.tags[0].name],
    skillNames: [testData.structures.skills[0].name],
    qiwi: false,
    qiwiLibrary: true,
    errors: '',
    dates: [],
    scope: 'INTERNAL',
    statusScope: true,
    confirmVisible: '',
    confirmCloseCreate: false,
    imageSrc: '',
    eventName: 'Конференция',
    languageId: 1,
    typeLabelId: 7,
    hasCertificate: true,
    certificateRequest: {
      id: testData.structures.certificate.id,
      series: '1',
      minNumber: '100',
      maxNumber: '1000',
    },
    qiwiLibraryError: false,
    hasBadge: true,
    withSchedule: false,
    typeId: 16,
    subTypeId: null,
    comment: null,
    formChange: true,
    publisher: faker.lorem.words({ min: 5, max: 15 }),
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
    addressBookVisible: true,
    changeAddressList: true,
    cost: faker.number.int({ min: 100, max: 1000 }),
    issued: '1999-01-01',
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
