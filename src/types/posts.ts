export type Post = {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
};

export type PostFormData = Omit<Post, 'id'>;

export type PostQueryKey = ['post', { postId: number | null }];

export type PostsWithLimitQueryKey = [
  'postsWithLimit',
  {
    page: number | null;
    limit: number | null;
    keepPreviousData: boolean | null;
  },
];
