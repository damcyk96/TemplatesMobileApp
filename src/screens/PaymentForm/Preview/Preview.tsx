import React from 'react';
import { View, Text } from 'react-native';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import { screenNames } from '../../../navigation/screenNames';

const Preview = () => {
  return (
    <View>
      <Text>Preview</Text>
      <PrevAndNextButton
        navigatePrev={screenNames.PaymentMethod}
        navigateNext={screenNames.Summary}
      />
    </View>
  );
};

export default Preview;
