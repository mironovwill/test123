import * as os from 'node:os';

export const allureConfig = {
  detail: false,
  suiteTitle: false,
  metadata: {
    project: 'Cloud',
  },
  links: {
    issue: {
      nameTemplate: 'Issue #%s',
      urlTemplate: 'https://kampus.atlassian.net/browse/KAM-%s',
    },
    tms: {
      nameTemplate: 'TMS #%s',
      urlTemplate: 'https://teoriiotpraktikov.qatools.cloud/project/1/test-cases/%s',
    },
    confluence: {
      nameTemplate: 'Confluence #%s',
      urlTemplate: (v: string) => `https://kampus.atlassian.net/wiki/spaces/KD/pages/${v}`,
    },
  },
  environmentInfo: {
    os_platform: os.platform(),
    os_release: os.release(),
    os_version: os.version(),
    node_version: process.version,
  },
};
