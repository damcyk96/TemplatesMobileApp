import { useQuery, useMutation } from 'react-query';

import {
  createPost,
  editPost,
  fetchPost,
  fetchPosts,
  deletePost,
} from './requests';
import { getPost, getPosts } from './selectors';
import { handleSelectors } from '../shared';
import { PostQueryKey, PostsWithLimitQueryKey } from '../../types';

export const useGetPosts = ({
  selectors = { posts: getPosts },
  ...options
} = {}) =>
  useQuery('posts', fetchPosts, {
    select: handleSelectors(selectors),
    ...options,
  });

export const useGetPostWithLimits = ({
  page = 1,
  limit = 3,
  selectors = { post: getPosts },
  ...options
} = {}) => {
  const queryKey: PostsWithLimitQueryKey = ['postsWithLimit', { page, limit }];

  return useQuery(queryKey, fetchPosts, {
    select: handleSelectors(selectors),
    ...options,
  });
};
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

export const useCreatePost = (options = {}) =>
  useMutation(createPost, {
    mutationKey: 'createPost',
    ...options,
  });

export const useEditPost = (options = {}) =>
  useMutation(editPost, {
    mutationKey: 'editPost',
    ...options,
  });

export const useDeletePost = (options = {}) =>
  useMutation(deletePost, {
    mutationKey: 'deletePost',
    ...options,
  });
