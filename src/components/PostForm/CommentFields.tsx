import React from 'react';
import {
  Control,
  Controller,
  useFieldArray,
  FieldErrors,
} from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { lightTheme } from '../../theme';
import { PostWithCommentsFormData } from '../../types';

type Props = {
  control: Control<PostWithCommentsFormData>;
  errors?: FieldErrors<PostWithCommentsFormData>;
};

const CommentFields = ({ control }: Props): JSX.Element => {
  const { fields, append, remove } = useFieldArray({
    name: 'comments',
    control,
  });

  return (
    <View>
      <Text>Comments</Text>
      <View>
        <Button onPress={() => append({ content: '' })}>Add new comment</Button>
      </View>
      <View>
        {fields.map((comments, index) => (
          <View key={index} style={styles.formRow}>
            <Controller
              control={control}
              name={`comments.${index}.content`}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  mode="outlined"
                  label="Comment content"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Button onPress={() => remove(index)} color="red">
              Delete comment
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CommentFields;

const styles = StyleSheet.create({
  container: {
    padding: lightTheme.spaceUnit,
  },
  formRow: {
    paddingVertical: lightTheme.spaceUnit * 0.5,
  },
});
