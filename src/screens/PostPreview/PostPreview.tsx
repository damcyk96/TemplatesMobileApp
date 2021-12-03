import React, { useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
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

  return (
    <SafeAreaView>
      <View>
        {!!data && (
          <>
            <View>
              <Text>{data.post.title}</Text>
              <Text>{data.post.description}</Text>
            </View>
            <View>
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

export default PostPreview;
