import { Post } from './posts';

export type AppStackProps = {
  MainDrawer: undefined;
  PostPreview: { postId: number };
  SignIn: undefined;
  CreatePost: undefined;
  EditPost: { post: Post };
};
