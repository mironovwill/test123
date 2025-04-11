const adminApiConfig = {
  baseUrl: `${process.env.KAMPUS_ADMIN_BASE_URL}/${process.env.API_PREFIX}/${process.env.API_VERSION}`,
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
      category: '/topic/category?isGlobal=false',
      level: '/topic/level',
      visibility: (id: number, isVisible = false) => `/topic/${id}/visible?isVisible=${isVisible}`,
    },
    authors: {
      base: '/author',
      byId: (id: number) => `/author?id=${id}`,
    },
    language: {
      base: '/language',
    },
    book: {
      address: '/book/address',
    },
    tags: {
      base: '/tag',
    },
    skills: {
      base: '/skill',
    },
    user: {
      position: '/user/position',
      department: '/user/department',
    },
  },
};

export { adminApiConfig };
