import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';
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

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem('formData')) || {}
  );

  const recaptchaRef = useRef();

  function onChange() {
    setIsCaptchaSuccess(true);
  }

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const onSubmit = async e => {
    e.preventDefault();

    const token = recaptchaRef.current.getValue();

    const { email, name, feedback } = e.target;

    if (!validator.isEmail(email.value)) {
      toast.error(t('Please enter a valid email address'));
      return;
    }

    const clientFeedback = {
      from_name: name.value || 'Anonymous',
      message: feedback.value,
      from_email: email.value,
      'g-recaptcha-response': token,
    };

    try {
      await emailjs.send(
        'service_tbn0gg8',
        'template_u2mv108',
        clientFeedback,
        '3NrST3daT3p5P6S28'
      );
      toast.success(t('The form has been submitted successfully!'));
      setFormData({});
      localStorage.removeItem('formData');
      e.target.reset();
    } catch (error) {
      toast.error(`${error.message}`);
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
        value={formData.email || ''}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <FeedbackInput
        placeholder={t('name')}
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <FeedbackTextArea
        placeholder={t('feedback')}
        name="feedback"
        autoComplete="off"
        required
        value={formData.feedback || ''}
        onChange={e => setFormData({ ...formData, feedback: e.target.value })}
      />
      <FeedbackButtonContainer>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LdD4KkoAAAAAJszmvMtzsv-uFc3T5YbcMAZv_mt"
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="primary"
          text={t('send')}
          disabled={!isCaptchaSuccessful}
        />
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
