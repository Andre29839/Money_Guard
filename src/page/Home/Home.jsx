import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getTransactionCategoriesThunk,
  getTransactionsThunk,
} from 'redux/transactionsRedusers/transactionsThunks';
import TransactionsList from 'components/TransactionsList/TransactionsList';
import MobileTransactionList from 'components/Table/MobileList';
import {
  MobileTransactionListWrapper,
  TransactionsListWrapper,
} from 'components/TransactionsList/TransactionsList.styled';
import ModalAddTransactionButton from 'components/ModalAddTransaction/ModalAddTransactionButton/ModalAddTransactionButton';

import { SectionHome } from 'components/Table/MobileList.styled';

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionCategoriesThunk());
    dispatch(getTransactionsThunk());

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767); // Размер для маленьких экранов из медиа-запроса
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return (
    <SectionHome>
      <TransactionsListWrapper className={isMobileView ? 'mobile' : 'desktop'}>
        <TransactionsList />
      </TransactionsListWrapper>
      <MobileTransactionListWrapper
        className={isMobileView ? 'desktop' : 'mobile'}
      >
        <MobileTransactionList />
      </MobileTransactionListWrapper>

      <ModalAddTransactionButton />
    </SectionHome>
  );
};

export default Home;
