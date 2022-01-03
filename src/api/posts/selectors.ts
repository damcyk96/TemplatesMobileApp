import { Post } from '../../types';

export const getPosts = (data: any): Post[] => data.data;

export const getPost = (data: any): Post => data.data;
