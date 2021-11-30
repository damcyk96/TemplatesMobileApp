import * as yup from 'yup';

const userFormSchema = yup.object().shape({
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

export { userFormSchema };
