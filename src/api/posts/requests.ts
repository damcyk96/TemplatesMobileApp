import client from '../client';
import { Post, PostQueryKey } from '../../types';

type FetchPost = {
  queryKey: PostQueryKey;
};

export const fetchPosts = (): Promise<Post[]> => client.get('/posts');

export const fetchPost = ({ queryKey: [, param] }: FetchPost): Promise<Post> =>
  client.get(`/posts/${param.postId}`);

export const createPost = (data: Post) => client.post('posts', data);

export const editPost = (data: Post) => client.put(`/posts/${data.id}`, data);
