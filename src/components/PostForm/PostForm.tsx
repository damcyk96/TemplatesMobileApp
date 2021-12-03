import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PostFormData } from '../../types';
import { lightTheme } from '../../theme';

type Props = {
  buttonText: string;
  defaultValues?: PostFormData;
  onSubmit?: (formData: PostFormData) => void;
};

const styles = StyleSheet.create({
  container: {
    padding: lightTheme.spaceUnit,
  },
  formRow: {
    paddingVertical: lightTheme.spaceUnit * 0.5,
  },
});

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  content: yup.string().required(),
  image: yup.string().required(),
});

const PostForm = ({
  buttonText,
  defaultValues,
  onSubmit,
}: Props): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      title: '',
      image: '',
      description: '',
      content: '',
    },
  });
  console.log(isValid);
  console.log();
  const handleOnSubmit = useCallback(
    (formData: PostFormData) => {
      onSubmit?.(formData);
    },
    [onSubmit],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.title}
            />
          )}
        />
      </View>
      <View style={styles.formRow}>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              mode="outlined"
              label="image"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.image}
            />
          )}
        />
      </View>
      <View style={styles.formRow}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              mode="outlined"
              label="description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.description}
            />
          )}
        />
      </View>
      <View style={styles.formRow}>
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              mode="outlined"
              label="content"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.content}
            />
          )}
        />
      </View>
      <View style={styles.formRow}>
        <Button
          mode="contained"
          onPress={handleSubmit(handleOnSubmit)}
          disabled={!isValid}>
          {buttonText}
        </Button>
      </View>
    </View>
  );
};

export default PostForm;
