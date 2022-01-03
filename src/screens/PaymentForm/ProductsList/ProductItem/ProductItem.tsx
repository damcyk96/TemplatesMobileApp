import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { ActivityIndicator } from 'react-native-paper';
import { useGetTrip } from '../../../../api/trips';
import { AppStackProps } from '../../../../types';
import DateField from './DateField';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

type Props = NativeStackScreenProps<AppStackProps, 'ProductDetail'>;

const ProductItem = ({ route }: Props) => {
  const { params } = route;
  const { data, isLoading } = useGetTrip({ tripId: params.tripId });
  const scrollY = useRef(new Animated.Value(0)).current;

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={styles.wrapper}>
        <Animated.FlatList
          data={data?.trip.images}
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
          {/* zrobic active dot */}
          {data?.trip.images.map((_, index) => {
            return <View style={styles.dot} key={index} />;
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
        style={{ padding: 30 }}>
        <BottomSheetScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={{ marginTop: 20, fontSize: 25, fontWeight: 'bold' }}>
              {data?.trip.title}
            </Text>
            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>
              {data?.trip.price}
            </Text>
          </View>
          <View>
            {data?.trip.description.map((text, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    marginVertical: 30,
                    fontSize: 15,
                    fontWeight: '500',
                    lineHeight: 20,
                  }}>
                  {text}
                </Text>
              );
            })}
          </View>
          <View>
            <DateField title={data?.trip.title} price={data?.trip.price} />
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
    borderColor: 'white',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});

export default ProductItem;
