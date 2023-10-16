import {
  StyledBalance,
  StyledBalanceBox,
  StyledBalanceLabel,
} from './Balance.styled';
import { useSelector } from 'react-redux';
import { selectAuthDataBalance } from 'redux/registerReducers/registerSelector';
import { useTranslation } from 'react-i18next';
import useWindow from 'Hooks/useWindow';

export const Balance = () => {
  const { t } = useTranslation();
  const balance = useSelector(selectAuthDataBalance);
  const { isTablet, isDesktop } = useWindow();

  let displayBalance = balance;
  let maxLength = isDesktop ? 20 : isTablet ? 15 : 12;
  if (balance && balance.toString().length > maxLength) {
    displayBalance = balance.toString().substring(0, maxLength - 2) + '...';
  }

  return (
    <StyledBalanceBox>
      <StyledBalanceLabel>{t('balance')}</StyledBalanceLabel>
      <StyledBalance>&#8372;{displayBalance ?? 0}</StyledBalance>
    </StyledBalanceBox>
  );
};

export default Balance;
