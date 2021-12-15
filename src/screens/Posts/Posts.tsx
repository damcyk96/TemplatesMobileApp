import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Card,
  FAB,
  Title,
  Paragraph,
} from 'react-native-paper';

import { useGetPostsWithLimit } from '../../api/posts';
import { screenNames } from '../../navigation/screenNames';
import { lightTheme } from '../../theme';
import { Post } from '../../types';

type ListProps = {
  item: Post;
  index: number;
};

const styles = StyleSheet.create({
  postCard: {
    marginBottom: lightTheme.spaceUnit * 4,
  },
  fab: {
    backgroundColor: lightTheme.colors.primary,
    position: 'absolute',
    margin: lightTheme.spaceUnit * 3,
    right: 0,
    bottom: 0,
  },
});

const Posts = () => {
  const { navigate } = useNavigation();
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useGetPostsWithLimit();

  const posts = useMemo(
    () => data?.pages.flatMap((response) => response.data),
    [data],
  );

  const handleOnEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView>
      <View style={style.container}>
        {!!data && (
          <FlatList
            data={posts}
            ListFooterComponent={() => (
              <>{isFetchingNextPage && <ActivityIndicator size="large" />}</>
            )}
            onEndReached={handleOnEndReached}
            renderItem={({ item, index }: ListProps) => (
              <Card key={index} style={styles.postCard}>
                <TouchableOpacity
                  onPress={() =>
                    navigate(screenNames.PostPreview, { postId: item.id })
                  }>
                  <Card.Cover source={{ uri: item.image }} />
                  <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            )}
          />
        )}
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigate(screenNames.CreatePost)}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
});
export default Posts;
