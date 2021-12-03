export type Post = {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
};

export type PostFormData = Omit<Post, 'id'>;

export type PostQueryKey = ['post', { postId: number | null }];
