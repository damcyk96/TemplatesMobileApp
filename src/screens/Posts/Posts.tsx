import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  Card,
  FAB,
  Title,
  Paragraph,
  Text,
} from 'react-native-paper';

import { useGetPostsWithLimit } from '../../api/posts';
import { screenNames } from '../../navigation/screenNames';
import { lightTheme } from '../../theme';
import { Post } from '../../types';
import LoginContext from '../../contexts/LoginContext';

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
  const { username } = useContext(LoginContext);

  const { navigate } = useNavigation();
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetPostsWithLimit();

  const posts = useMemo(
    () => data?.pages.flatMap((response) => response.data),
    [data],
  );

  const handleOnEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      <View style={style.container}>
        <Text style={{ fontSize: 45 }}>AsyncStorage: {username}</Text>
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
