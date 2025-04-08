export interface UserDto {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  login?: string;
  password: string;
  phone: string;
  roleId: number;
  department?: number;
  function?: string;
  position?: number;
  location?: string;
  subCompany?: string;
  managerId?: number;
  createSk: boolean;
  companyId: number;
}

export interface UserResponse extends UserDto {
  id: number;
  login: string;
  photoUuid: string | null;
  localPhotoUuid: string | null;
  about: string | null;
  company: string;
  guid: string;
  googleId: string | null;
  parentRoleId: number | null;
  locked: boolean;
  account: number;
  lastIncome: string;
  status: string;
  type: string;
  createdDate: string;
  created: number;
  planned: number;
  finished: number;
  score: number;
  authorities: string[];
  managers: {
    id: number;
    userId: number;
    login: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    fullName: string;
  }[];
  inPlan: boolean;
  trackInPlan: boolean;
  notifyEnable: boolean;
  haveEmployees: boolean;
  trajectoryEnable: boolean;
  blockingDate: string | null;
  functionInternalDto: {
    id: number;
    name: string;
    companyId: number;
  };
  departmentInternalDto: {
    id: number;
    name: string;
    companyId: number;
    limitCost: number;
  };
  language: string;
  startOfJob: string | null;
  purpose: string | null;
  personalNumber: string | null;
  domainCompany: {
    id: number;
    shortName: string;
    logo: string;
    colour: string;
    hasUserFunction: boolean;
    hasUserPosition: boolean;
    hasUserDepartment: boolean;
    defaultLanguage: string;
    profileEdit: boolean;
    hasMentors: boolean;
    hasShop: boolean;
    banner: string | null;
  };
  career: string | null;
  awareness: number;
  involvement: number;
  mentalFlexibility: number;
  diffAwareness: number;
  diffInvolvement: number;
  diffMentalFlexibility: number;
  member: string | null;
  lastLogin: string | null;
  mentor: boolean;
  hasReward: boolean;
  rewards: string | null;
  userPlanType: string | null;
  firstLogin: boolean;
}
