import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import PrevAndNextButton from '../../../components/PrevAndNextButton';
import TripOrderContext from '../../../contexts/TripsContext';
import { screenNames } from '../../../navigation/screenNames';

const Preview = () => {
  const {
    stateData: { order },
  } = useContext<any>(TripOrderContext);
  let sum = 0;
  const totalPrice = order.dates.forEach((element) => {
    sum += element.people * order.price;
  });

  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 30, marginVertical: 20 }}>{order.title}</Text>
        <Text style={{ fontSize: 25 }}>
          Metoda platnosci: {order.paymentMethod}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 3,
            width: '100%',
          }}>
          {order.dates.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text>{item.date}</Text>
                <Text>{item.people}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text>Podsumowanie</Text>
          <Text>Cena totalna: {sum}</Text>
        </View>
      </View>
      <PrevAndNextButton
        navigatePrev={screenNames.PaymentMethod}
        navigateNext={screenNames.Summary}
      />
    </View>
  );
};

export default Preview;
