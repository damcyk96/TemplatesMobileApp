import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const images = [
  'https://ocdn.eu/pulscms-transforms/1/KHwk9kpTURBXy9mYWRmMzBhNjhmYWZkNzUyY2IxZGIwZjQ3ODRiZGMyMi5qcGeTlQMAzQIFzRPpzQszkwXNAxTNAbyTCaYxMjBhNDgGgaEwAQ/kosciol-mariacki-krakow.jpg',
  'https://www.polska.travel/images/pl-PL/glowne-miasta/krakow/krakow_kazimierz_1170.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhtzX6Lqvdd9gCLmhvP81IwI_GI3F_Aq6Mw&usqp=CAU',
  'https://a.cdn-hotels.com/cos/heroimage/Krakow_0_157441338.jpg?impolicy=fcrop&w=536&h=384&q=high',
  'https://www.tripsavvy.com/thmb/aN2djLguAhDDCv3eQlqPiak5TIk=/4683x3122/filters:fill(auto,1)/tourist-woman-eats-bagel-obwarzanek-traditional-polish-cuisine-snack-on-market-square-in-krakow--travel-europe-1269945175-33c8292aee6246fdae0ab3d7466fd8f8.jpg',
];

const product = {
  title: 'Krakow',
  description: [
    'Fusce sed dolor a enim maximus imperdiet sed sed est. Nunc vulputate erat sodales, blandit ligula nec, lacinia massa. Aenean diam tortor, maximus eu dolor at, mattis pellentesque massa. Phasellus vehicula, eros sed vestibulum porta, magna leo egestas sapien, quis dapibus risus tortor eu orci. Maecenas quis dolor sit amet est malesuada maximus. Cras pulvinar turpis quis purus maximus fringilla. Praesent finibus mauris ac est viverra egestas. Morbi dapibus suscipit varius.',
    'Sed congue nisi vitae turpis efficitur blandit. Donec aliquet facilisis condimentum. Vestibulum sit amet turpis sed leo lobortis vehicula non id mi. Mauris semper turpis sed metus scelerisque, nec auctor nisl facilisis. Vivamus sed iaculis tellus. Donec vel erat et purus hendrerit sagittis et et elit. Proin condimentum augue sit amet convallis viverra. Nunc laoreet, libero sed porttitor porttitor, arcu erat luctus turpis, quis cursus nibh eros pulvinar ipsum.',
  ],
  price: '29.99$',
};
const ProductItem = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={styles.wrapper}>
        <Animated.FlatList
          data={images}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            );
          }}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => {
            return <View style={[styles.dot]} />;
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <BottomSheet
        snapPoints={[height - ITEM_HEIGHT, height]}
        index={0}
        style={{ padding: 20 }}>
        <BottomSheetScrollView style={{ backgroundColor: 'white' }}>
          <Text>{product.title}</Text>
          <Text>{product.price}</Text>
          <View>
            {product.description.map((text, index) => {
              return (
                <Text key={index} style={{ marginVertical: 30 }}>
                  {text}
                </Text>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: '#333',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});

export default ProductItem;
