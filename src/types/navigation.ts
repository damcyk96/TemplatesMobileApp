import { Post } from './posts';

export type AppStackProps = {
  MainDrawer: undefined;
  PostPreview: { postId: number };
  SignIn: undefined;
  CreatePost: undefined;
  EditPost: { post: Post };
};

export type PaymentStackProps = {
  MainDrawer: undefined;
  PaymentMethod: undefined;
  Preview: undefined;
  ProductsList: undefined;
  Summary: undefined;
};
