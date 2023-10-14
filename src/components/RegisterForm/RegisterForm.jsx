import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { registerSchema } from 'services/validation/validationRegisterSchema';
import { usePasswordToggle } from 'Hooks/usePasswordToggle';
import { registerThunk } from 'redux/registerReducers/registerThunks';

import { FormError } from 'components/FormError/FormError';
import { Logo } from 'components/Logo/Logo';
import { TogglePasswordIcon } from 'components/TogglePasswordVisibility/TogglePasswordVisibility';
import { ConfirmPasswordIndicator } from 'components/ConfirmPasswordIndicator/ConfirmPasswordIndicator';
import Button from 'components/Button/Button';
import { IndicatorPasswordStrength } from 'components/IndicatorPasswordStrength/IndicatorPasswordStrength';

import {
  LinkStyled,
  NameRegisterIcon,
  WrapperFormReg,
} from './RegisterForm.styled';
import {
  EmailIcon,
  FieldStyled,
  FormStyled,
  PasswordlIcon,
  WrapperButton,
  WrapperField,
  WrapperIcon,
  WrapperIcon2,
  WrapperIcon3,
} from 'components/LoginForm/LoginForm.styled';

export const RegisterForm = () => {
  const { showPasswords, togglePasswordVisibility } = usePasswordToggle([
    'password1',
    'password2',
  ]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (value, { resetForm }) => {
    const { username, email, password } = value;
    dispatch(registerThunk({ username, email, password }))
      .unwrap()
      .then(data => {
        resetForm();
        toast.success(`${t('Hi')}! ${data.user.username}, ${t('thanks')}!`);
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  };

  return (
    <WrapperFormReg>
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <FormStyled autoComplete="off">
            <WrapperField>
              <WrapperIcon>
                <FieldStyled
                  type="text"
                  name="username"
                  placeholder={t('First name')}
                  autoComplete="off"
                  required
                />
                <NameRegisterIcon />
              </WrapperIcon>
              <FormError name="username" touched={touched} errors={errors} />
              <WrapperIcon>
                <FieldStyled
                  type="email"
                  name="email"
                  placeholder={t('email')}
                  autoComplete="off"
                  required
                />
                <EmailIcon size={24} />
              </WrapperIcon>
              <FormError name="email" touched={touched} errors={errors} />

              <WrapperIcon3>
                <WrapperIcon2>
                  <FieldStyled
                    type={showPasswords.password1 ? 'text' : 'password'}
                    name="password"
                    title={t(
                      'Enter the password more difficult, letter, digit, capital letter.'
                    )}
                    placeholder={t('password')}
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  <PasswordlIcon />
                </WrapperIcon2>
                <TogglePasswordIcon
                  showPassword={showPasswords.password1}
                  onToggle={() => togglePasswordVisibility('password1')}
                />
              </WrapperIcon3>
              <IndicatorPasswordStrength values={values} />
              <FormError name="password" touched={touched} errors={errors} />
              <WrapperIcon3>
                <WrapperIcon2>
                  <FieldStyled
                    type={showPasswords.password2 ? 'text' : 'password'}
                    name="confirmPassword"
                    title={t(
                      'Enter the password more difficult, letter, digit, capital letter.'
                    )}
                    placeholder={t('Confirm Password')}
                    autoComplete="off"
                    required
                  />
                  <PasswordlIcon />
                </WrapperIcon2>
                <TogglePasswordIcon
                  showPassword={showPasswords.password2}
                  onToggle={() => togglePasswordVisibility('password2')}
                />
              </WrapperIcon3>
              <ConfirmPasswordIndicator
                values={values}
                passwordsMatch={
                  values.password === values.confirmPassword &&
                  values.confirmPassword !== ''
                }
              />
              <FormError name="confirmPassword" />
            </WrapperField>
            <WrapperButton>
              <Button type="submit" text={t('register')} />
            </WrapperButton>
          </FormStyled>
        )}
      </Formik>
      <LinkStyled to="/login">{t('login btn')}</LinkStyled>
    </WrapperFormReg>
  );
};
