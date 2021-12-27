import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import LastPostContext from '../../../contexts/LastPostContext';
import { screenNames } from '../../../navigation/screenNames';

const Preview = () => {
  const { lastPost } = useContext(LastPostContext);
  console.log(lastPost);
  return (
    <View>
      <Text style={{ fontSize: 50 }}>{lastPost.title}</Text>
      <PrevAndNextButton
        navigatePrev={screenNames.PaymentMethod}
        navigateNext={screenNames.Summary}
      />
    </View>
  );
};

export default Preview;
