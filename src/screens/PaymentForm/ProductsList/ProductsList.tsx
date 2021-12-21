import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import { screenNames } from '../../../navigation/screenNames';

const data = [
  {
    id: '1',
    title: 'Krakow, Polska',
    description: 'Stare miasto lorem ipsum',
    image_url:
      'https://www.polska.travel/images/pl-PL/glowne-miasta/krakow/krakow_rynek_2_1170.jpg',
  },

  {
    id: '2',
    title: 'Warszawa, Polska',
    description: 'Stolica Polski',
    image_url:
      'https://www.euractiv.pl/wp-content/uploads/sites/6/2019/07/kamil-gliwinski-xcPw1-5OHTk-unsplash-800x450.jpg',
  },
  {
    id: '3',
    title: 'Praga, Czechy',
    description: 'Jakis obrazek Pragi',
    image_url:
      'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
];

const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const ProductsList = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Scrollable content */}
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={{ alignItems: 'center' }}>
          {data.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 14 }}
                onPress={() =>
                  navigation.navigate(screenNames.ProductItem, { item })
                }>
                <SharedElement id={`item.${item.id}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 14,
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                    }}
                    source={{ uri: item.image_url }}
                    resizeMode="cover"
                  />
                </SharedElement>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 10,
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
                      <SharedElement id={`item.${item.id}.description`}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            lineHeight: 18,
                          }}>
                          {item.description}
                        </Text>
                      </SharedElement>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <PrevAndNextButton navigateNext={screenNames.PaymentMethod} first />
      </View>
    </View>
  );
};

export default ProductsList;
