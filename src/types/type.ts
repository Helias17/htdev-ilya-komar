export type FormData = {
  post: string;
  author: string;
  timezone: string;
};

export type PostType = FormData & {
  date: Record<string, any>;
};
