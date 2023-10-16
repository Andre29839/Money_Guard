import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import {
  FeedbackButtonContainer,
  FeedbackFormStyled,
  FeedbackInput,
  FeedbackTextArea,
  Heading,
} from './FeedbackForm.styled';

const FeedbackForm = ({ closeModal }) => {
  const { t } = useTranslation();

  const onSubmit = async e => {
    e.preventDefault();
    const { email, name, feedback } = e.target;
    const clientFeedback = {
      from_name: name.value,
      message: feedback.value,
      from_email: email.value,
    };
    try {
      await emailjs.send(
        'service_tbn0gg8',
        'template_u2mv108',
        clientFeedback,
        'L5YgpcVY1zRAmFrTg'
      );
      toast.success(t('The form has been submitted successfully!'));
    } catch (error) {
      toast.error(`${error}`);
    }
    closeModal();
  };

  return (
    <FeedbackFormStyled onSubmit={onSubmit}>
      <Heading>{t('leave feedback')}</Heading>
      <FeedbackInput
        placeholder={t('email')}
        type="email"
        name="email"
        required
      />
      <FeedbackInput placeholder={t('name')} type="text" name="name" />
      <FeedbackTextArea
        placeholder={t('feedback')}
        name="feedback"
        autoComplete="off"
        required
      />
      <FeedbackButtonContainer>
        <Button type="submit" variant="primary" text={t('send')} />
        <Button
          type="button"
          variant="secondary"
          onClick={() => closeModal()}
          text={t('cancel')}
        />
      </FeedbackButtonContainer>
    </FeedbackFormStyled>
  );
};

export default FeedbackForm;
