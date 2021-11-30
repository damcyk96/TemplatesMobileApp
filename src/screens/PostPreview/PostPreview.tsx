import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Paragraph } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackProps } from '../../types';
import { useGetPost } from '../../api/posts';

type Props = NativeStackScreenProps<AppStackProps, 'PostPreview'>;

const PostPreview = ({ route }: Props) => {
  const { params } = route;
  const { data, isLoading } = useGetPost({ postId: params.postId });
  const post = data?.post;
  return (
    <SafeAreaView>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          !!data && (
            <Card style={style.containter}>
              <Card.Title title={post?.title} style={style.title} />
              <Card.Cover source={{ uri: `${post?.image}` }} />
              <Card.Content>
                <Paragraph>{post?.description}</Paragraph>
                <Paragraph>{post?.content}</Paragraph>
              </Card.Content>
            </Card>
          )
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
