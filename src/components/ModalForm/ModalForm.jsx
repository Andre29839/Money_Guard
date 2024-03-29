import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';
import { ButtonIcon, ModalBackdrop, ModalContent } from './ModalForm.styled';

const modalRoot = document.querySelector('#modal-root');

export default function ModalForm({
  children = '',
  handleBackdropClick = () => {},
  handleKeyDown = () => {},
  closeModal = () => {},
}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [handleKeyDown]);

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <ButtonIcon type="button" onClick={closeModal} aria-label="close modal">
          <IoIosClose
            style={{ width: '40px', height: '40px', position: 'relative' }}
          />
        </ButtonIcon>
        {children}
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
}
