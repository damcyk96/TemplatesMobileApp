import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { lightTheme } from '../../theme';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup
    .string()
    .required()
    .min(4, 'Must be longer')
    .max(255, 'Must be shorten'),
  content: yup
    .string()
    .required()
    .min(50, 'Must be longer')
    .max(600, 'Must be shorten'),
  url: yup.string().url().required(),
});

export type FormData = {
  title: string;
  description: string;
  content: string;
  image: string;
};

type Props = {
  onSubmit?: (formData: FormData) => void;
};

const styles = StyleSheet.create({
  formRow: {
    paddingVertical: lightTheme.spaceUnit * 0.5,
  },
});

const PostForm = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      image: '',
    },
  });

  const handleSubmitForm = useCallback(
    (formData: FormData) => {
      onSubmit?.(formData);
    },
    [onSubmit],
  );

  return (
    <View>
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
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
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
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
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
        <Button mode="contained" onPress={handleSubmit(handleSubmitForm)}>
          Sign in
        </Button>
      </View>
    </View>
  );
};

export default PostForm;
