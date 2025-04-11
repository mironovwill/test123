export type UserData = {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  roleId: string;
  department?: string;
  function?: string;
  position?: string;
  location?: string;
  subCompany?: string;
  manager?: string;
  managerId?: number;
  createSk?: boolean;
  companyId?: number;
};
