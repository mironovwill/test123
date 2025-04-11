import { faker } from '@faker-js/faker/locale/ru';
import { getTomorrowDay } from '@core/helpers';
import testData from '@test-data';

export const eventWithValidationPayload = () => {
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
    dates: [
      {
        startDate: getTomorrowDay({ formattedDate: true }).split('.').reverse().join('-'),
        startTime: '20:00:00',
        endTime: '21:00:00',
        place: faker.lorem.words({ min: 5, max: 15 }),
      },
    ],
    scope: 'INTERNAL',
    statusScope: true,
    confirmVisible: '',
    confirmCloseCreate: false,
    imageSrc: '',
    eventName: faker.lorem.words({ min: 5, max: 15 }),
    languageId: 1,
    typeLabelId: 6,
    hasCertificate: true,
    certificateRequest: {
      id: 104,
      series: '1',
      minNumber: '1',
      maxNumber: '200',
    },
    qiwiLibraryError: false,
    hasBadge: false,
    withSchedule: false,
    name: faker.book.title(),
    typeId: 23,
    webinarPlatform: '1',
    entryPlatform: '1',
    webinarType: 'WEBINAR',
    duration: 125,
    approved: true,
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
    cost: 100,
    publisher: faker.company.name(),
    participantsCount: faker.number.int({ min: 1, max: 1000 }),
    comment: faker.lorem.words({ min: 5, max: 15 }),
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
    subTypeId: null,
    authorNames: [testData.structures.authors[0].name],
  };
};
