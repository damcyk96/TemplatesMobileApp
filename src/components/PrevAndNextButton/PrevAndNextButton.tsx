import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  last?: boolean | undefined;
  first?: boolean | undefined;
  navigateNext?: any;
  navigatePrev?: any;
};

const PrevAndNextButton = ({
  last,
  first,
  navigateNext,
  navigatePrev,
}: Props) => {
  const { navigate } = useNavigation();

  if (first) {
    return (
      <View style={style.wrapper}>
        <Button
          mode="contained"
          color="green"
          style={style.buttonLastOrFirst}
          onPress={() => navigate(navigateNext)}>
          Next step
        </Button>
      </View>
    );
  }

  if (last) {
    return (
      <View style={style.wrapper}>
        <Button
          mode="contained"
          color="red"
          style={style.buttonLastOrFirst}
          onPress={() => navigate(navigatePrev)}>
          Previous step
        </Button>
      </View>
    );
  }
  return (
    <View style={style.wrapper}>
      <Button
        mode="contained"
        color="red"
        style={style.button}
        onPress={() => navigate(navigatePrev)}>
        Previous step
      </Button>
      <Button
        mode="contained"
        color="green"
        style={style.button}
        onPress={() => navigate(navigateNext)}>
        Next step
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    width: '50%',
  },
  buttonLastOrFirst: {
    width: '80%',
  },
});

export default PrevAndNextButton;
