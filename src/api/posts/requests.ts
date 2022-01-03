import client from '../client';
import { Post, PostQueryKey, PostsWithLimitQueryKey } from '../../types';

type FetchPost = {
  queryKey: PostQueryKey;
};

type FetchPostsWithLimit = {
  queryKey: PostsWithLimitQueryKey;
};

export const fetchPosts = (): Promise<Post[]> => client.get('/posts');

export const fetchPost = ({ queryKey: [, param] }: FetchPost): Promise<Post> =>
  client.get(`/posts/${param.postId}`);

export const createPost = (data: Post) => client.post('posts', data);

export const editPost = (data: Post) => client.put(`/posts/${data.id}`, data);

export const deletePost = (postId: number) => client.delete(`/posts/${postId}`);

export const fetchPostsWithLimit = ({
  pageParam = 1,
}): Promise<{ data: Post[] }> =>
  client.get(`/posts?_page=${pageParam}&_limit=3`);
