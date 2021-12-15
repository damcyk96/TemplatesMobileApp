import { useQuery, useMutation, useInfiniteQuery } from 'react-query';

import {
  createPost,
  editPost,
  fetchPost,
  fetchPosts,
  fetchPostsWithLimit,
  deletePost,
} from './requests';
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

export const useGetPostsWithLimit = ({ ...options } = {}) =>
  useInfiniteQuery('postsWithLimit', fetchPostsWithLimit, {
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length < 3 ? undefined : pages.length + 1,
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
