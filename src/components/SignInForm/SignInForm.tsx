import React, { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import { lightTheme } from '../../theme';
import { screenNames } from '../../navigation/screenNames';
import LoginContext from '../../contexts/LoginContext';

export type FormData = {
  username: string;
};

const styles = StyleSheet.create({
  formRow: {
    paddingVertical: lightTheme.spaceUnit * 0.5,
  },
});

const SignInForm = ({}: Props) => {
  const { setUsername, username } = useContext(LoginContext);
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
    },
  });

  const handleSubmitForm = useCallback(
    (formData: FormData) => {
      setUsername(formData.username);
      navigate(screenNames.PostsList);
    },
    [setUsername],
  );

  return (
    <View>
      <View style={styles.formRow}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.username}
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

export default SignInForm;
