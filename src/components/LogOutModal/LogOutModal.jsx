import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logOutThunk } from 'redux/registerReducers/registerThunks';
import moneylogo from 'images/logo.svg';
import Button from 'components/Button/Button';
import {
  BackdropLogOut,
  BtnWrapper,
  ModalLogOut,
  WrapLogo,
} from './LogOutModal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function ModalLogout({
  handleBackdropClick = () => {},
  handleKeyDown = () => {},
  closeModal = () => {},
}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handlerLogout = () => {
    dispatch(logOutThunk());
    dispatch(closeModal);
    toast.success(t('logout success'));
  };

  return createPortal(
    <BackdropLogOut onClick={handleBackdropClick}>
      <ModalLogOut>
        <WrapLogo>
          <img src={moneylogo} alt="MoneyGuard Logo" />
          <h3>Money Guard</h3>
        </WrapLogo>
        <p>{t('logout text')}</p>
        <BtnWrapper>
          <Button
            type="button"
            onClick={handlerLogout}
            variant="primary"
            text={t('logout')}
          />
          <Button
            type="button"
            onClick={closeModal}
            variant="secondary"
            text={t('cancel')}
          />
        </BtnWrapper>
      </ModalLogOut>
    </BackdropLogOut>,
    modalRoot
  );
}
