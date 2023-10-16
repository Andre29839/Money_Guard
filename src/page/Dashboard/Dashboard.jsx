import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import SideBar from 'components/SideBar/SideBar';
import ModalForm from 'components/ModalForm/ModalForm';
import FeedbackForm from 'components/FeedbackForm/FeedbackForm';
import useToggleModal from 'Hooks/useToggleModal';

import { Box, FeedbackButton } from 'page/Dashboard/Dashboard.styled';
import Button from 'components/Button/Button';

function DashboardPage() {
  const { t } = useTranslation();

  const { isOpen, openModal, closeModal, handleKeyDown, handleBackdropClick } =
    useToggleModal();
  return (
    <div>
      <Header />
      <Box>
        <SideBar />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
      <Button
        variant="feedback"
        onClick={() => openModal()}
        text={t('feedback')}
      />

      {isOpen && (
        <ModalForm
          closeModal={() => closeModal()}
          handleKeyDown={handleKeyDown}
          handleBackdropClick={handleBackdropClick}
        >
          <FeedbackForm closeModal={closeModal} />
        </ModalForm>
      )}
    </div>
  );
}

export default DashboardPage;
