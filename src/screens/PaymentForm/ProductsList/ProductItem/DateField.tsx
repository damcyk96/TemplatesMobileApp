import React, { useCallback, useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import NumericInput from 'react-native-numeric-input';
import { TripFormData } from '../../../../types';
import TripOrderContext from '../../../../contexts/TripsContext';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../../../../navigation/screenNames';

const DateField = ({ title, price }) => {
  const [visibleButton, setVisibleButton] = useState(false);
  const { navigate } = useNavigation();
  const { control, handleSubmit } = useForm<TripFormData>({
    mode: 'onChange',
    defaultValues: {
      title: title,
      price: price,
      dates: [
        {
          date: '',
          people: 1,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'dates',
    control,
  });

  const { dispatchTripOrderContextActions } = useContext<any>(TripOrderContext);
  const handleOnSubmit = useCallback(
    (formData: TripFormData) => {
      dispatchTripOrderContextActions({ type: 'setOrder', payload: formData });
      navigate(screenNames.PaymentMethod);
    },
    [dispatchTripOrderContextActions, navigate],
  );

  useEffect(() => {
    if (fields.length) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }, [fields]);

  return (
    <View>
      <View>
        <Button
          onPress={() =>
            append({
              date: '',
              people: 1,
            })
          }>
          Add next visit
        </Button>
      </View>
      <View>
        {fields.map((dates, index) => (
          <View key={index} style={{ marginBottom: 50 }}>
            <Controller
              control={control}
              name={`dates.${index}.date`}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  multiline
                  mode="outlined"
                  label="date"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name={`dates.${index}.people`}
              render={({ field: { onChange, value } }) => (
                <NumericInput
                  type="up-down"
                  minValue={1}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Button onPress={() => remove(index)} color="red">
              Delete upper trip
            </Button>
          </View>
        ))}
        <Button
          mode="contained"
          style={
            visibleButton
              ? { display: 'flex', marginBottom: 50 }
              : { display: 'none' }
          }
          onPress={handleSubmit(handleOnSubmit)}>
          Choose payment method
        </Button>
      </View>
    </View>
  );
};

export default DateField;
