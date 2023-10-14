import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllTransactions,
  selectTransactionsCategories,
} from 'redux/transactionsRedusers/transactionsSelectors';
import { refreshBalanceThunk } from 'redux/registerReducers/registerThunks';
import {
  deleteTransactionsThunk,
  getTransactionsThunk,
} from 'redux/transactionsRedusers/transactionsThunks';

import {
  DeleteBtn,
  TableListContainer,
  StyledTable,
  Thead,
  Th,
  Td,
  TdEdit,
  Tr,
  EditWrapper,
} from './MobileList.styled';
import EditTransactionModal from 'components/ModalEdit/EditTransactionModal';
import { NoTransactionsText } from 'components/TransactionsList/TransactionsList.styled';

const MobileTransactionList = () => {
  const { t } = useTranslation();

  const transactions = useSelector(selectAllTransactions);
  const categories = useSelector(selectTransactionsCategories);
  const dispatch = useDispatch();

  const handleDelete = transactionId => {
    dispatch(deleteTransactionsThunk(transactionId))
      .unwrap()
      .then(() => dispatch(getTransactionsThunk()))
      .then(() => dispatch(refreshBalanceThunk()));
  };

  const gategoryNamesbyId = categories.reduce((res, category) => {
    res[category.id] = t(category.name);
    return res;
  }, {});

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  const transactionSymbol = type =>
    type === 'INCOME' ? '+' : type === 'EXPENSE' ? '-' : '';

  return transactions?.length === 0 ? (
    <table>
      <tbody>
        <tr>
          <NoTransactionsText colSpan="7">
            {t('Your transactions will be here')}
          </NoTransactionsText>
        </tr>
      </tbody>
    </table>
  ) : (
    <>
      <section>
        <TableListContainer>
          <ul>
            {transactions.map(item => (
              <li key={item.id}>
                <StyledTable type={item.type === 'INCOME' ? 1 : 0}>
                  <Thead>
                    <Tr>
                      <Th>{t('date')}</Th>
                      <Th>{t('type')}</Th>
                      <Th>{t('category')}</Th>
                      <Th>{t('comment')}</Th>
                      <Th>{t('sum')}</Th>
                      <Th>
                        <DeleteBtn onClick={() => handleDelete(item.id)}>
                          {t('btnDelete')}
                        </DeleteBtn>
                      </Th>
                    </Tr>
                  </Thead>
                  <tbody>
                    <Tr>
                      <Td>{formatDate(item.transactionDate)}</Td>
                      <Td>{transactionSymbol(item.type)}</Td>
                      <Td>
                        {gategoryNamesbyId[item.categoryId]?.length > 12
                          ? gategoryNamesbyId[item.categoryId].substring(
                              0,
                              12
                            ) + '...'
                          : gategoryNamesbyId[item.categoryId]}
                      </Td>
                      <Td>
                        {item.comment
                          ? item.comment?.length > 8
                            ? item.comment.substring(0, 8) + '...'
                            : item.comment
                          : '-'}
                      </Td>
                      <Td
                        className={
                          item.type === 'INCOME' ? 'income' : 'expense'
                        }
                      >
                        {Math.abs(item.amount).toFixed(2)}
                      </Td>
                      <TdEdit>
                        <EditWrapper>
                          <EditTransactionModal item={item} />
                        </EditWrapper>
                      </TdEdit>
                    </Tr>
                  </tbody>
                </StyledTable>
              </li>
            ))}
          </ul>
        </TableListContainer>
      </section>
    </>
  );
};

export default MobileTransactionList;
