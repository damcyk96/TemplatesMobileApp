import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';

const DateField = () => {
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
          Choose date!
        </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          dateFormat="dayofweek day month"
          style={{ flex: 1 }}
        />
      )}
      <View>{choosenDate && <Button>Add next visit</Button>}</View>
    </View>
  );
};

export default DateField;
