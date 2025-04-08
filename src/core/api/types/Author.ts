export type AuthorDto = {
  name: string;
};

export type AuthorResponse = {
  id?: number;
  name: string;
  sharing?: boolean;
  global?: boolean;
  visible?: boolean;
};
