import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const TestComponent = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);
  return (
    <View testID="post-container">
      {/* {posts.map(({ title }, index) => (
        <Text key={index} testID="post-item">
          {title}
        </Text>
      ))} */}
      <FlatList
        data={posts}
        renderItem={({ post, index }) => (
          <Text key={index} testID="post-item">
            {post}
          </Text>
        )}
      />
    </View>
  );
};

export default TestComponent;
