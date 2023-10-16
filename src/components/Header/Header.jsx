import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAuthData } from 'redux/registerReducers/registerSelector';
import moneylogo from 'images/logo.svg';
import useToggleModal from 'Hooks/useToggleModal';
import useWindow from 'Hooks/useWindow';
import ModalLogout from 'components/LogOutModal/LogOutModal';
import Container from 'components/Container/Container';
import {
  LogoExit,
  WrapBtn,
  WrapHeader,
  HeaderStyled,
  WrapLogo,
  DivWrapper,
} from './Header.styled';
import TranslationPanel from 'components/TranslationPanel/TranslationPanel';

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
            <DivWrapper>
              <TranslationPanel />
              <WrapBtn>
                <span>
                  {userData?.username
                    ? userData?.username.length > 8 && isMobile
                      ? userData?.username.substring(0, 6) + '...'
                      : userData?.username
                    : 'Anonymous'}
                </span>
                <button onClick={() => openModal()}>
                  <LogoExit />
                  {isMobile || <span>{t('exit')}</span>}
                </button>
              </WrapBtn>
            </DivWrapper>
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
