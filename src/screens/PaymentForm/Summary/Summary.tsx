import React from 'react';
import { View, Text } from 'react-native';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import { screenNames } from '../../../navigation/screenNames';

const Summary = () => {
  return (
    <View>
      <Text>Summary</Text>
      <PrevAndNextButton last navigatePrev={screenNames.Preview} />
    </View>
  );
};

export default Summary;
