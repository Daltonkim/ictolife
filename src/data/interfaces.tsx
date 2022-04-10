export type Post = {
  userId?: string,
  id?: string;
  title: string;
  body: number;
};

export type User = {
  id?: string;
  name: string;
  username: string;
  email: string;
  address: object;

};

export type ReduxData = {
  actionsLoading?: boolean;
  range: {},
  users: User[];
  error?: any;
  posts?: Post[],
  listLoading?: boolean;
};
