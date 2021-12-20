import React from 'react';
import { View, Text } from 'react-native';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import { screenNames } from '../../../navigation/screenNames';

const ProductsList = () => {
  return (
    <View>
      <Text>ProductsList</Text>
      <PrevAndNextButton first navigateNext={screenNames.PaymentMethod} />
    </View>
  );
};

export default ProductsList;
