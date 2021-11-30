export type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
};

export type PostQueryKey = ['post', { postId: number | null }];
