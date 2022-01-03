import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LoginContext from '../../../contexts/LoginContext';

const PostsList = () => {
  const { username } = useContext(LoginContext);

  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
};

export default PostsList;
