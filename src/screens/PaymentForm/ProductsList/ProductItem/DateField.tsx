import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import NumericInput from 'react-native-numeric-input';
import { TripFormData } from '../../../../types';

type Props = {
  control?: Control<TripFormData>;
  errors?: FieldErrors<TripFormData>;
  defaultValues?: TripFormData;
};

const DateField = ({ defaultValues }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TripFormData>({
    mode: 'onChange',
    defaultValues: defaultValues || {
      title: '',
      image: '',
      description: '',
      content: '',
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'dates',
  });
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [choosenDate, setChoosenDate] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setChoosenDate(true);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button mode="contained" onPress={showDatePicker}>
          Choose date and people!
        </Button>
      </View>
      <View>
        {fields.map((dates, index) => (
          <View key={index}>
            <Controller
              control={control}
              name={`dates.${index}.day`}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  dateFormat="dayofweek day month"
                  style={{ height: 100, width: 300 }}
                />
              )}
            />
            <Controller
              control={control}
              name={`dates.${index}.day`}
              render={({ field: { onChange, value } }) => (
                <NumericInput
                  type="up-down"
                  minValue={1}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Button
              onPress={() =>
                append({
                  day: Date.now(),
                  people: 1,
                })
              }>
              Add next visit
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DateField;
