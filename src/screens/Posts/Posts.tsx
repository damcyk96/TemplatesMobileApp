import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useGetPosts } from '../../api/posts';
import { screenNames } from '../../navigation/screenNames';
import { lightTheme } from '../../theme';

const Posts = () => {
  const { navigate } = useNavigation();
  const { data, isLoading } = useGetPosts();
  // use theme
  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {!!data &&
              data.posts.map((post, index) => (
                <View
                  key={index}
                  style={
                    index === data.posts.length - 1
                      ? style.mb0
                      : style.container
                  }>
                  <TouchableOpacity
                    onPress={() =>
                      navigate(screenNames.PostPreview, { postId: post.id })
                    }>
                    <Card.Content>
                      <Title>{post.title}</Title>
                      <Paragraph>{post.description}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: `${post.image}` }} />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: lightTheme.spaceUnit * 3,
  },
  mb0: {
    marginBottom: 0,
  },
});

export default Posts;
