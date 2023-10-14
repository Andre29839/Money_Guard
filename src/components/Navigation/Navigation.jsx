import { useTranslation } from 'react-i18next';
import { IoMdHome } from 'react-icons/io';
import { PiCurrencyDollarSimple } from 'react-icons/pi';
import { SlGraph } from 'react-icons/sl';

import { StyledNavList, ActiveNavLink, StyledSpan } from './Navigation.styled';
import useWindow from 'Hooks/useWindow';

const Navigation = () => {
  const { t } = useTranslation();
  const { isTabletAndDesktop } = useWindow();

  return (
    <nav>
      <StyledNavList>
        <li>
          <ActiveNavLink to="/home">
            <IoMdHome /> <StyledSpan>{t('home')}</StyledSpan>
          </ActiveNavLink>
        </li>
        <li>
          <ActiveNavLink to="/statistic">
            <SlGraph />
            <StyledSpan>{t('stat')}</StyledSpan>
          </ActiveNavLink>
        </li>
        <li>
          <ActiveNavLink $hideIcon={isTabletAndDesktop} to="/currency">
            <PiCurrencyDollarSimple />
          </ActiveNavLink>
        </li>
      </StyledNavList>
    </nav>
  );
};

export default Navigation;
