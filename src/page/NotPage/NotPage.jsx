import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import picture from '../../images/money-pig.webp';
import { NotPageSection, NotPageStyled, ImgPig } from './NotPage.styled';

const NotPage = () => {
  const { t } = useTranslation();

  return (
    <NotPageSection>
      <NotPageStyled className="text404">
        <p>{t('Oops! 404 page not found')}</p>
        <Link to={'/'} className="link404">
          {t('GO HOME?')}
        </Link>
      </NotPageStyled>
      <div>
        <ImgPig src={picture} alt="logoImg" width="300" />
      </div>
    </NotPageSection>
  );
};

export default NotPage;
