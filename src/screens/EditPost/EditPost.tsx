import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackProps, PostFormData } from '../../types';
import PostForm from '../../components/PostForm';
import { useEditPost } from '../../api/posts';
import { screenNames } from '../../navigation/screenNames';

type Props = NativeStackScreenProps<AppStackProps, 'EditPost'>;

const EditPost = ({ route }: Props): JSX.Element => {
  const { params } = route;
  const { navigate } = useNavigation();

  const { mutate: editPost } = useEditPost({
    onSuccess: () => {
      navigate(screenNames.PostPreview, { postId: params.post.id });
    },
  });

  const onSubmit = useCallback(
    (formData: PostFormData) => {
      editPost({
        id: params.post.id,
        ...formData,
      });
    },
    [editPost, params],
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <PostForm
          onSubmit={onSubmit}
          buttonText="Edit post"
          defaultValues={params.post}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPost;
