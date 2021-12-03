import React, { useCallback } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Paragraph, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { AppStackProps } from '../../types';
import { useGetPost } from '../../api/posts';
import { screenNames } from '../../navigation/screenNames';

type Props = NativeStackScreenProps<AppStackProps, 'PostPreview'>;

const PostPreview = ({ route }: Props) => {
  const { params } = route;

  const { navigate } = useNavigation();
  const { data, isLoading, refetch } = useGetPost({ postId: params.postId });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  const post = data?.post;
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
              <Button
                onPress={() =>
                  navigate(screenNames.EditPost, { post: data.post })
                }>
                Edit Post
              </Button>
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
});

export default PostPreview;
