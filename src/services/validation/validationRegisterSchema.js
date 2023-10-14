import * as yup from 'yup';

export const registerSchema = t =>
  yup.object().shape({
    username: yup
      .string()
      .test('trim', t('The field must not start or end with spaces'), value => {
        if (value) {
          return value.trim() === value;
        }
        return true;
      })
      .required(t('required field'))
      .min(2, t('Too Short!'))
      .max(30, t('the name must contain a maximum of 30 characters')),
    email: yup
      .string()
      .email(t('Please enter a valid email address'))
      .test('trim', t('The field must not start or end with spaces'), value => {
        if (value) {
          return value.trim() === value;
        }
        return true;
      })
      .required(t('required field'))
      .max(30, t('the name must contain a maximum of 30 characters')),
    password: yup
      .string()
      .test('trim', t('The field must not start or end with spaces'), value => {
        if (value) {
          return value.trim() === value;
        }
        return true;
      })
      .required(t('required field'))
      .min(6, t('Password must contain at least 6 characters'))
      .max(12, t('Password must contain a maximum of 12 characters'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[!@#$%^&*()_+\-=.<>])[a-zA-Z\d!@#$%^&*()_+\-=.<>]{6,12}$/,
        t(
          'Password must contain at least one uppercase letter, one lowercase letter and one number'
        )
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('Passwords must match'))
      .required(t('Confirm Password is required')),
  });
