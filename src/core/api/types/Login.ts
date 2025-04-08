export type LoginResponse = {
  accessToken: string;
  authorities: string[];
  count: number;
  expiresIn: number;
  paramModal: string[];
  refreshToken: string;
};

export type LoginDto = {
  username: string;
  password: string;
};
