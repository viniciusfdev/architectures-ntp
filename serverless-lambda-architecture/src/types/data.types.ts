export type Index = string | number;

export type Data = {
  [collection: string]: {
    [attr: string | number]: { id: string | number } & { [attr: string]: any };
  };
};

export type Document = {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
  [attr: string]: any;
};

export interface Post extends Document {
  content: string;
  title: string;
  author?: Index;
}

export interface User extends Document {
  name: string;
  email: string;
}
