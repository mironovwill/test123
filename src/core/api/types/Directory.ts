export type FunctionDto = {
  name: string;
};

export type FunctionResponse = FunctionDto & {
  id: number;
  companyId: number;
};

export type DepartmentDto = {
  name: string;
};

export type DepartmentResponse = DepartmentDto & {
  id: number;
  companyId: number;
  limitCost: number;
};
