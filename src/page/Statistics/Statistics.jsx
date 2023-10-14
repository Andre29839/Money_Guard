import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Chart from 'components/Chart/Chart';
import DatePicker from 'components/DataForm/DataForm';
import StatisticTable from 'components/StatisticTable/StatisticTable';
import {
  StatisticsWrapper,
  TitleChart,
  TitleStatistics,
  WrapTable,
} from './Statistics.styled';

const Statistics = () => {
  const { t } = useTranslation();

  const result = useSelector(
    state => state.transactions.summary.categoriesSummary
  );

  const filterExpense = result
    ? result.filter(item => item.type === 'EXPENSE')
    : [];

  return (
    <>
      <StatisticsWrapper>
        <TitleChart>
          <TitleStatistics>{t('stat')}</TitleStatistics>
          <Chart data={filterExpense} />
        </TitleChart>
        <WrapTable>
          <DatePicker />
          <StatisticTable />
        </WrapTable>
      </StatisticsWrapper>
    </>
  );
};

export default Statistics;
