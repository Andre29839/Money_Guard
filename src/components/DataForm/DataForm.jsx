import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { getTransactionsStatisticThunk } from 'redux/transactionsRedusers/transactionsThunks';
import { SelectBox, customSelect } from './DataForm.styled';
import { useTranslation } from 'react-i18next';

const DatePicker = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const { t } = useTranslation();

  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const handleMonthChange = selectedOption => {
    setMonth(selectedOption.value);
  };

  const handleSelectYear = selectedOption => {
    setYear(selectedOption.value);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        getTransactionsStatisticThunk({
          month: Number(month),
          year: Number(year),
        })
      );
    }, 1500);
  }, [dispatch, month, year]);

  const months = [
    { value: 1, label: t('january') },
    { value: 2, label: t('february') },
    { value: 3, label: t('march') },
    { value: 4, label: t('april') },
    { value: 5, label: t('may') },
    { value: 6, label: t('june') },
    { value: 7, label: t('july') },
    { value: 8, label: t('august') },
    { value: 9, label: t('september') },
    { value: 10, label: t('october') },
    { value: 11, label: t('november') },
    { value: 12, label: t('december') },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, index) => {
    const year = currentYear - index;
    return { value: year, label: year.toString() };
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const currentMonthObject = months.find(month => month.value === currentMonth);

  return (
    <SelectBox>
      <Select
        options={months}
        styles={customSelect}
        onChange={handleMonthChange}
        placeholder={currentMonthObject.label}
        isSearchable={false}
      />
      <Select
        options={years}
        styles={customSelect}
        onChange={handleSelectYear}
        placeholder={currentYear}
        isSearchable={false}
      />
    </SelectBox>
  );
};

export default DatePicker;
