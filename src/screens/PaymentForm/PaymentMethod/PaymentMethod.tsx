import React, { FC } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useGetPaymentMethods } from '../../../api/paymentMethods';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import { screenNames } from '../../../navigation/screenNames';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const { width, height } = Dimensions.get('screen');

const FLATLIST_HEIGHT = (height * 3) / 5;

const PaymentMethod: FC = () => {
  const { isLoading, data } = useGetPaymentMethods();
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  console.log(data?.paymentMetods);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <AnimatedFlatlist
          alwaysBounceVertical={false}
          horizontal
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'flex-start',
            height: FLATLIST_HEIGHT,
          }}
          pagingEnabled
          snapToInterval={width}
          data={data?.paymentMetods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => <Item wholeItem={item} scrollX={scrollX} />}
        />
      </View>
      <PrevAndNextButton
        navigatePrev={screenNames.ProductsList}
        navigateNext={screenNames.Preview}
      />
    </>
  );
};

const Item = ({
  wholeItem,
  scrollX,
}: {
  wholeItem: { item: any; index: number };
  scrollX: SharedValue<number>;
}) => {
  const { index, item } = wholeItem;
  const CARD_WIDTH = width;
  const CARD_HEIGHT = FLATLIST_HEIGHT;
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  console.log(item.title);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, inputRange, [0.7, 0.85, 0.7]),
        },
        {
          translateX: interpolate(scrollX.value, inputRange, [-100, 0, 100]),
        },
      ],
    };
  });

  return (
    <SharedElement id={`item.${item.id}.photo`}>
      <Animated.Image
        style={[
          animatedContainerStyle,
          { width: CARD_WIDTH, height: CARD_HEIGHT - 50, borderRadius: 20 },
        ]}
        source={{ uri: item.image }}
      />
      <Animated.View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button mode="contained" style={{ width: '50%' }}>
          {item.title}
        </Button>
      </Animated.View>
    </SharedElement>
  );
};

export default PaymentMethod;
