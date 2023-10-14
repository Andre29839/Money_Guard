import { Balance } from 'components/Balance/Balance';
import Currency from 'components/Currency/Currency';
import Navigation from 'components/Navigation/Navigation';
import { StyledNavAndBalanceBox, StyledSideBox } from './SideBar.styled';
import { useLocation } from 'react-router-dom';
import useWindow from 'Hooks/useWindow';

const SideBar = () => {
  const { isMobile } = useWindow();
  const location = useLocation();
  const homeBalance = location.pathname;

  return isMobile ? (
    <StyledSideBox>
      <Navigation />
      {homeBalance === '/home' && <Balance />}
    </StyledSideBox>
  ) : (
    <StyledSideBox>
      <StyledNavAndBalanceBox>
        <Navigation />
        <Balance />
      </StyledNavAndBalanceBox>
      <Currency />
    </StyledSideBox>
  );
};

export default SideBar;
