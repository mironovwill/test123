import { faker } from '@faker-js/faker/locale/ru';
import { getTomorrowDay } from '@core/helpers';
import testData from '@test-data';

export const eventMtsLinkPayload = () => {
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
        startTime: '21:00:00',
        endTime: '22:00:00',
        place: faker.lorem.words({ min: 5, max: 15 }),
      },
    ],
    scope: 'INTERNAL',
    statusScope: true,
    confirmVisible: '',
    confirmCloseCreate: false,
    imageSrc: '',
    eventName: 'Конференция',
    languageId: 1,
    typeLabelId: 6,
    hasCertificate: true,
    certificateRequest: {
      id: testData.structures.certificate.id,
      series: faker.number.int({ min: 100, max: 10000 }),
      minNumber: faker.number.int({ min: 100, max: 1000 }),
      maxNumber: faker.number.int({ min: 1000, max: 2000 }),
    },
    qiwiLibraryError: false,
    hasBadge: false,
    withSchedule: false,
    name: faker.book.title(),
    typeId: 8,
    webinarPlatform: '2',
    entryPlatform: '1',
    webinarType: 'WEBINAR',
    duration: 60,
    description: faker.lorem.words({ min: 5, max: 15 }),
    formChange: true,
    categoryIds: [testData.structures.topicCategories[0].id],
    levelId: testData.structures.levels[0].id,
    links: [
      {
        name: link,
        url: link,
      },
    ],
    cost: faker.number.int({ min: 100, max: 10000 }),
    publisher: faker.lorem.words({ min: 5, max: 15 }),
    comment: faker.lorem.words({ min: 5, max: 15 }),
    percentSitIn: faker.number.int({ min: 1, max: 100 }),
    topicLimit: faker.number.int({ min: 1, max: 100 }),
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
    webinarCreateEventRequest: [
      {
        startsAt: getTomorrowDay({ formattedDate: true }).split('.').reverse().join('-') + 'T21:00',
        endsAt: getTomorrowDay({ formattedDate: true }).split('.').reverse().join('-') + 'T22:00',
        access: 1,
        plannedInvolvement: faker.number.int({ min: 1, max: 100 }),
        name: faker.lorem.words({ min: 5, max: 15 }),
        webinarType: 'WEBINAR',
      },
    ],
    subTypeId: null,
    authorNames: [testData.structures.authors[0].name],
  };
};
