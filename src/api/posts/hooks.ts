import { useQuery } from 'react-query';

import { fetchPost, fetchPosts } from './requests';
import { getPost, getPosts } from './selectors';
import { handleSelectors } from '../shared';
import { PostQueryKey } from '../../types';

export const useGetPosts = ({
  selectors = { posts: getPosts },
  ...options
} = {}) =>
  useQuery('posts', fetchPosts, {
    select: handleSelectors(selectors),
    ...options,
  });

export const useGetPost = ({
  postId = 0,
  selectors = { post: getPost },
  ...options
} = {}) => {
  const queryKey: PostQueryKey = ['post', { postId }];

  return useQuery(queryKey, fetchPost, {
    select: handleSelectors(selectors),
    ...options,
  });
};
