import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { ButtonStyled } from './TranslationPanel.styled';

const TranslationPanel = () => {
  const { i18n } = useTranslation();

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <ButtonStyled
        onClick={() => {
          changeLanguage('en');
        }}
        disabled={i18next.language === 'en' || i18next.language === 'en-US'}
      >
        EN
      </ButtonStyled>
      <ButtonStyled
        onClick={() => {
          changeLanguage('ua');
        }}
        disabled={i18next.language === 'ua'}
      >
        UA
      </ButtonStyled>
    </>
  );
};

export default TranslationPanel;
