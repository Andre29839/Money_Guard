import {
  StyledBalance,
  StyledBalanceBox,
  StyledBalanceLabel,
} from './Balance.styled';
import { useSelector } from 'react-redux';
import { selectAuthDataBalance } from 'redux/registerReducers/registerSelector';
import { useTranslation } from 'react-i18next';

export const Balance = () => {
  const { t } = useTranslation();
  const balance = useSelector(selectAuthDataBalance);

  return (
    <StyledBalanceBox>
      <StyledBalanceLabel>{t('balance')}</StyledBalanceLabel>
      <StyledBalance>&#8372;{balance ?? 0}</StyledBalance>
    </StyledBalanceBox>
  );
};

export default Balance;
