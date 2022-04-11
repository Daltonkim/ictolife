export type Post = {
  userId: number,
  id?: number;
  title: string;
  body: string;
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
  newPostIndex?: any,
  page: number;
  users: User[];
  userId?: number;
  error?: any;
  posts: Post[],
  listLoading?: boolean;
};
