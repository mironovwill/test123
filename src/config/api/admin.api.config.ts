const apiBaseUrl = `${process.env.KAMPUS_ADMIN_BASE_URL}/${process.env.API_PREFIX}/${process.env.API_VERSION}`;

const adminApiConfig = {
  baseUrl: apiBaseUrl,
  endpoints: {
    auth: {
      register: '/register/any',
      login: '/login',
    },
    functions: {
      base: '/functionInternal',
      byId: (id: number) => `/functionInternal?id=${id}`,
    },
    departments: {
      base: '/departmentInternal',
      byId: (id: number) => `/departmentInternal?id=${id}`,
    },
    certificates: {
      base: '/certificate',
      template: '/certificate/template',
      byId: (id: number) => `/certificate/${id}`,
    },
    rewards: {
      base: '/reward',
      byId: (id: number) => `/reward/${id}`,
    },
    students: {
      lockedForLogin: '/user/lockedForLogin',
    },
    topics: {
      base: '/topic',
      byId: (id: number) => `/topic/${id}`,
    },
    authors: {
      base: '/author',
      byId: (id: number) => `/author?id=${id}`,
    },
  },
};

export { adminApiConfig };
