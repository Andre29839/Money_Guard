import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import {
  Section,
  StyledTable,
  StyledWrap,
  TdCategory,
  TdSum,
  ThCategory,
  ThSum,
  Thead,
  Total,
  TotalExpense,
  Transaction,
  TransactionColor,
  WrapIncome,
  WrapSummary,
} from './StatisticTable.styled';

const StatisticTable = () => {
  const { t } = useTranslation();

  const sumOfCategories = useSelector(
    state => state.transactions.summary.categoriesSummary
  );

  const incomeSum = useSelector(
    state => state.transactions.summary.incomeSummary
  );

  const expenseSum = useSelector(
    state => state.transactions.summary.expenseSummary
  );

  const colorStatistics = {
    'Main expenses': '#FED057',
    Products: '#FFD8D0',
    Car: '#FD9498',
    'Self care': '#C5BAFF',
    'Child care': '#6E78E8',
    'Household products': '#4A56E2',
    Education: '#81E1FF',
    Leisure: '#24CCA7',
    'Other expenses': '#00AD84',
    Entertainment: '#FF69B4',
    Income: '#FFB627',
  };

  return (
    sumOfCategories && (
      <Section>
        <StyledWrap>
          <StyledTable>
            <Thead>
              <tr>
                <ThCategory>{t('category')}</ThCategory>
                <ThSum>{t('sum')}</ThSum>
              </tr>
            </Thead>
            <tbody>
              {sumOfCategories.map(category => {
                return (
                  category.name !== 'Income' && (
                    <tr key={nanoid()}>
                      <TdCategory>
                        <TransactionColor
                          color={colorStatistics[category.name]}
                        ></TransactionColor>
                        <span>{t(category.name)}</span>
                      </TdCategory>
                      <TdSum>{category.total}</TdSum>
                    </tr>
                  )
                );
              })}
            </tbody>
          </StyledTable>
        </StyledWrap>
        <div>
          <WrapSummary>
            <Transaction>{t('expense')}:</Transaction>
            <TotalExpense>{expenseSum}</TotalExpense>
          </WrapSummary>
          <WrapIncome>
            <Transaction>{t('income')}:</Transaction>
            <Total>{incomeSum}</Total>
          </WrapIncome>
        </div>
      </Section>
    )
  );
};

export default StatisticTable;
