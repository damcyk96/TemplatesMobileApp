import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';
import { useGetTrips } from '../../../api/trips';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import { screenNames } from '../../../navigation/screenNames';

const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const ProductsList = () => {
  const { navigate } = useNavigation();

  const { data, isLoading } = useGetTrips();
  console.log(data);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={{ alignItems: 'center' }}>
          {data?.trips.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 14 }}
                onPress={() =>
                  navigate(screenNames.ProductItem, { tripId: item.id })
                }>
                <SharedElement id={`item.${item.id}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 14,
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                    }}
                    source={{ uri: item.images[0] }}
                    resizeMode="cover"
                  />
                </SharedElement>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 10,
                    borderTopRightRadius: 50,
                    backgroundColor: 'red',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', paddingLeft: 6 }}>
                      <SharedElement id={`item.${item.id}.title`}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 'bold',
                            lineHeight: 28,
                          }}>
                          {item.title}
                        </Text>
                      </SharedElement>
                      <SharedElement id={`item.${item.id}.subtitle`}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            lineHeight: 18,
                          }}>
                          {item.subtitle}
                        </Text>
                      </SharedElement>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ marginBottom: 30 }}>
        <PrevAndNextButton navigateNext={screenNames.PaymentMethod} first />
      </View>
    </View>
  );
};

export default ProductsList;
