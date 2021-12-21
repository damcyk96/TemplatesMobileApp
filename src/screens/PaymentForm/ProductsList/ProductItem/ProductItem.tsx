import React from 'react';
import { Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { Button } from 'react-native-paper';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const ProductItem = ({ navigation, route }) => {
  const { item } = route.params;

  if (!item) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SharedElement id={`item.${item.id}.image_url`}>
        <Image
          source={{ uri: item.image_url }}
          style={{
            width: '100%',
            height: ITEM_HEIGHT,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          resizeMode="cover"
        />
      </SharedElement>

      <ScrollView
        indicatorStyle="white"
        style={{
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{ paddingVertical: 20 }}>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            lineHeight: 24,
            marginBottom: 4,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Button onPress={() => navigation.goBack()}>Back</Button>
      </ScrollView>
    </View>
  );
};

ProductItem.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `item.${item.id}.title`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${item.id}.description`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${item.id}.iconName`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default ProductItem;
