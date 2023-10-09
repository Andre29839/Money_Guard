import { useSelector } from 'react-redux';
import moneylogo from '../../images/logo.svg';
import {
  LogoExit,
  WrapBtn,
  WrapHeader,
  HeaderStyled,
  WrapLogo,
} from './Header.styled';
import { selectAuthData } from 'redux/registerReducers/registerSelector';
import ModalLogout from 'components/LogOutModal/LogOutModal';
import { useTranslation } from 'react-i18next';
import useToggleModal from 'Hooks/useToggleModal';
import Container from 'components/Container/Container';
import useWindow from 'Hooks/useWindow';

const Header = () => {
  const userData = useSelector(selectAuthData);

  const { isOpen, openModal, closeModal, handleKeyDown, handleBackdropClick } =
    useToggleModal();

  const { isMobile } = useWindow();

  const { t } = useTranslation();

  return (
    <>
      <HeaderStyled>
        <Container>
          <WrapHeader>
            <WrapLogo>
              <img src={moneylogo} alt="MoneyGuard_Logo" />
              <p>Money Guard</p>
            </WrapLogo>
            <WrapBtn>
              <span>{userData?.username}</span>
              <button onClick={() => openModal()}>
                <LogoExit />
                {isMobile || <span>{t('exit')}</span>}
              </button>
            </WrapBtn>
          </WrapHeader>
        </Container>
      </HeaderStyled>
      {isOpen && (
        <ModalLogout
          closeModal={() => closeModal()}
          handleKeyDown={handleKeyDown}
          handleBackdropClick={handleBackdropClick}
        />
      )}
    </>
  );
};

export default Header;
