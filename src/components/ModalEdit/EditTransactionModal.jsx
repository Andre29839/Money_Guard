import { useTranslation } from 'react-i18next';
import { BiPencil } from 'react-icons/bi';
import useToggleModal from 'Hooks/useToggleModal';
import useWindow from 'Hooks/useWindow';
import ModalForm from 'components/ModalForm/ModalForm';
import ModalEdit from './ModalEdit';
import { EditBtn } from 'components/ModalAddTransaction/ModalAddTransactionButton/ModalAddTransactionButton.styled';
import { EditWrapper } from 'components/Table/MobileList.styled';

const EditTransactionModal = ({ item }) => {
  const { isOpen, openModal, closeModal, handleKeyDown, handleBackdropClick } =
    useToggleModal();

  const { isMobile } = useWindow();

  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <EditBtn
        onClick={() => {
          openModal();
        }}
      >
        <EditWrapper>
          <BiPencil />
          {isMobile && t('btnEdit')}
        </EditWrapper>
      </EditBtn>

      {isOpen && (
        <ModalForm
          closeModal={() => closeModal()}
          handleKeyDown={handleKeyDown}
          handleBackdropClick={handleBackdropClick}
        >
          <ModalEdit closeModal={closeModal} item={item} />
        </ModalForm>
      )}
    </div>
  );
};

export default EditTransactionModal;
