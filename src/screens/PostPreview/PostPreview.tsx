import React, { useCallback } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Paragraph, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { AppStackProps } from '../../types';
import { useDeletePost, useGetPost } from '../../api/posts';
import { screenNames } from '../../navigation/screenNames';
import { lightTheme } from '../../theme';

type Props = NativeStackScreenProps<AppStackProps, 'PostPreview'>;

const PostPreview = ({ route }: Props) => {
  const { params } = route;

  const { navigate } = useNavigation();
  const { data, isLoading, refetch } = useGetPost({ postId: params.postId });
  const post = data?.post;

  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      navigate(screenNames.Posts);
    },
  });

  const onPressDelete = useCallback(() => {
    deletePost(params.postId);
  }, [deletePost, params.postId]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <SafeAreaView>
      <View>
        {!!data && (
          <>
            <View>
              <Card style={style.containter}>
                <Card.Title title={post?.title} style={style.title} />
                <Card.Cover source={{ uri: `${post?.image}` }} />
                <Card.Content>
                  <Paragraph>{post?.description}</Paragraph>
                  <Paragraph>{post?.content}</Paragraph>
                </Card.Content>
              </Card>
              <View style={style.containerWithButton}>
                <Button
                  style={style.button}
                  mode="contained"
                  onPress={() =>
                    navigate(screenNames.EditPost, { post: data.post })
                  }>
                  Edit Post
                </Button>
                <Button
                  onPress={onPressDelete}
                  style={style.button}
                  mode="contained"
                  color="red">
                  Delete Post
                </Button>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  containter: {
    display: 'flex',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    color: 'red',
  },
  containerWithButton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: lightTheme.spaceUnit * 4,
  },
  button: {
    width: '50%',
    display: 'flex',
  },
});

export default PostPreview;
