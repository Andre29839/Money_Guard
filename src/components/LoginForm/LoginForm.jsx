import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { usePasswordToggle } from 'Hooks/usePasswordToggle';
import { logInThunk } from 'redux/registerReducers/registerThunks';
import { loginSchema } from 'services/validation/validationLoginSchema';
import { Logo } from 'components/Logo/Logo';
import { FormError } from 'components/FormError/FormError';
import { TogglePasswordIcon } from 'components/TogglePasswordVisibility/TogglePasswordVisibility';
import { LinkStyled } from 'components/RegisterForm/RegisterForm.styled';
import Button from 'components/Button/Button';
import {
  EmailIcon,
  FieldStyled,
  FormStyled,
  PasswordlIcon,
  WrapperButton,
  WrapperField,
  WrapperForm,
  WrapperIcon,
  WrapperIcon2,
  WrapperIcon3,
} from './LoginForm.styled';

export const LoginForm = () => {
  const { showPasswords, togglePasswordVisibility } = usePasswordToggle([
    'password1',
    'password2',
  ]);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (value, { resetForm }) => {
    dispatch(logInThunk(value))
      .unwrap()
      .then(data => {
        resetForm();
        toast.success(
          `${t('well done')}, ${data.user.username}! ${t('login')}`
        );
      })
      .catch(error => {
        toast.error(t('login error'));
      });
  };

  return (
    <WrapperForm>
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema(t)}
        onSubmit={handleSubmit}
      >
        <FormStyled>
          <WrapperField>
            <WrapperIcon>
              <FieldStyled
                type="email"
                name="email"
                title={t('login title email')}
                placeholder={t('email')}
                autoComplete="off"
                required
              />
              <EmailIcon size={24} />
            </WrapperIcon>
            <FormError name="email" />
            <WrapperIcon3>
              <WrapperIcon2>
                <FieldStyled
                  type={showPasswords.password1 ? 'text' : 'password'}
                  name="password"
                  title={t('login title password')}
                  placeholder={t('password')}
                  autoComplete="off"
                  required
                />
                <PasswordlIcon />
              </WrapperIcon2>
              <TogglePasswordIcon
                showPassword={showPasswords.password1}
                onToggle={() => togglePasswordVisibility('password1')}
              />
            </WrapperIcon3>
            <FormError name="password" />
          </WrapperField>
          <WrapperButton>
            <Button variant="primary" type="submit" text={t('login btn')} />
          </WrapperButton>
        </FormStyled>
      </Formik>
      <LinkStyled to="/register">{t('register')}</LinkStyled>
    </WrapperForm>
  );
};
