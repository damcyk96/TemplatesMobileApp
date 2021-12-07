import React, { useCallback, useState, useEffect } from 'react';
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
} from 'react-native-paper';

import { useGetPostWithLimits } from '../../api/posts';
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
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const { navigate } = useNavigation();
  const { data, isLoading, refetch } = useGetPostWithLimits({
    page: page,
    keepPreviousData: true,
  });

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
        {!!data && (
          <FlatList
            data={data.post}
            onEndReached={() => {
              if (posts) {
                setPage((prevValue) => prevValue + 1);
                refetch();
              }
            }}
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
