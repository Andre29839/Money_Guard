import { IoExitOutline } from 'react-icons/io5';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
  background: var(--header-color);
  box-shadow: var(--header-shadow);
  margin: 0 auto;
  padding: 12px 0;
  width: 100%;

  @media only screen and (min-width: 768px) {
    padding: 16px 0px;
  }
`;

export const DivWrapper = styled.div`
  min-width: 192px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const WrapHeader = styled.div`
  display: flex;

  align-items: center;
  width: 280px;
  margin: 0 auto;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    width: 688px;
  }

  @media only screen and (min-width: 1280px) {
    width: 1200px;
    justify-content: space-between;
  }
`;

export const WrapLogo = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: auto;

  img {
    width: 17px;
    height: 17px;
    margin-bottom: 4px;
  }

  p {
    font-size: 13px;
    color: var(--white);
    font-weight: 400;
  }

  @media only screen and (min-width: 768px) {
    padding-left: 0px;
    width: 150px;
    height: 48px;
    text-align: center;

    p {
      font-size: 17px;
    }

    @media only screen and (min-width: 1280px) {
      img {
        width: 23px;
        height: 22px;
      }
    }
  }
`;

export const WrapBtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  span {
    color: var(--white-60);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  button {
    display: flex;
    font-size: 100%;
    background-color: transparent;
    color: var(--white-60);
    align-items: center;
    vertical-align: sub;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  div {
    height: 30px;
    width: 1px;
    background-color: var(--white-60);
    margin-right: 6px;
  }

  @media only screen and (min-width: 768px) {
    span {
      margin-right: 8px;
    }

    button {
      height: 32px;
      border-left: 1px solid var(--white-60);
      color: var(--white-60);
    }
  }
`;

export const LogoExit = styled(IoExitOutline)`
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: currentColor;
  transform: scaleY(1.4);
  vertical-align: sub;

  @media only screen and (min-width: 768px) {
    margin-left: 6px;
    margin-right: 8px;
  }

  @media only screen and (min-width: 1280px) {
    transform: scaleY(1.5);
  }
`;
