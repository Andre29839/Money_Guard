import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencySelector } from 'redux/currencyRedusers/currencySelectors';
import { currencyThunk } from 'redux/currencyRedusers/currencyThunk';
import diagrame from 'images/chart/chart-tablet.png';
import useWindow from 'Hooks/useWindow';
import {
  StyledBox,
  StyledImg,
  StyledTBody,
  StyledTable,
  StyledTd,
  StyledTdBox,
  StyledTh,
  StyledThBox,
  WrapperCurrency,
  Usd,
  Eur,
} from './Currency.styled';

const Currency = () => {
  const [currency, setCurrency] = useState([]);
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(currencySelector);
  const token = useSelector(state => state.auth.token);

  const { t } = useTranslation();
  const { isDesktop } = useWindow();

  const currencyChart = useSelector(currencySelector);
  const usdPurch = currencyChart[0]?.rateBuy.toFixed(2);
  const eurPurch = currencyChart[1]?.rateBuy.toFixed(2);

  const updateLastUpdatedTime = () => {
    const newTime = Date.now();
    localStorage.setItem('lastUpdatedTime', newTime);
  };

  useEffect(() => {
    if (!token) return;
    const lastUpdatedTime = localStorage.getItem('lastUpdatedTime');

    const isHourPassed = () => {
      const oneHourUpdate = 60 * 60 * 1000;
      return Date.now() - Number(lastUpdatedTime) >= oneHourUpdate;
    };

    if (isHourPassed() || !lastUpdatedTime) {
      dispatch(currencyThunk());
      setCurrency(selectedCurrency);
      updateLastUpdatedTime();
    } else {
      setCurrency(selectedCurrency);
    }
  }, [dispatch, selectedCurrency, token]);

  return (
    <WrapperCurrency>
      <StyledBox>
        <StyledTable>
          <StyledThBox>
            <StyledTh>{t('currency')}</StyledTh>
            <StyledTh>{t('purchase')}</StyledTh>
            <StyledTh>{t('sale')}</StyledTh>
          </StyledThBox>
          <StyledTBody>
            {currency?.length &&
              currency.map(el => {
                return (
                  <StyledTdBox key={nanoid()}>
                    <StyledTd>{el.currencyName}</StyledTd>
                    <StyledTd>{parseFloat(el.rateBuy).toFixed(2)}</StyledTd>
                    <StyledTd>{parseFloat(el.rateSell).toFixed(2)}</StyledTd>
                  </StyledTdBox>
                );
              })}
            {isDesktop && (
              <>
                <Usd>{usdPurch}</Usd>
                <Eur>{eurPurch}</Eur>
              </>
            )}
          </StyledTBody>
        </StyledTable>
        <StyledImg src={diagrame} alt="chart" />
      </StyledBox>
    </WrapperCurrency>
  );
};

export default Currency;
