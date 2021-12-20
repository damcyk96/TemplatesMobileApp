import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator, Card, Title, Paragraph } from 'react-native-paper';

import { useGetPosts } from '../../../api/posts';
import { lightTheme } from '../../../theme';
import { Post } from '../../../types';

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

const PostsList = () => {
  // const { data, isLoading } = useGetPosts();

  // if (isLoading) {
  //   return <ActivityIndicator size="large" />;
  // }

  return (
    <View>
      <Text>test</Text>
      {/* {!!data && (
          <FlatList
            data={data.posts}
            renderItem={({ item, index }: ListProps) => (
              <Card key={index} style={styles.postCard} data-testid={index}>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        )} */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
});
export default PostsList;
