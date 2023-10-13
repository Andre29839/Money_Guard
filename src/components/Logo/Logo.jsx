import React from 'react';
import moneyGuardLogo from 'images/logo.svg';
import { LogoForm, TitleLogo, WrapperLogo } from './Logo.styled';

export const Logo = () => {
  return (
    <WrapperLogo>
      <LogoForm src={moneyGuardLogo} alt="MoneyGuard Logo" />
      <TitleLogo>Money Guard</TitleLogo>
    </WrapperLogo>
  );
};
