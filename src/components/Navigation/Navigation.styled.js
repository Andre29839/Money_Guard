import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavList = styled.ul`
  gap: 32px;
  padding: 0;
  display: inline-block;
  max-width: max-content;

  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin-top: 12px;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: ${props => props.gap || '12px'};

    margin: 0;

    list-style: none;
    padding: 0;
    padding-left: 19px;
    padding-top: 40px;
    padding-bottom: 36px;
  }
`;

export const StyledNavLink = styled(NavLink)`
  width: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  color: var(--white);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: calc(18 / 27);

  svg {
    display: ${props => (props.$hideIcon ? 'none' : 'block')};
    width: 44px;
    height: 44px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    path {
      fill: #2e225f;
    }
  }

  @media (min-width: 768px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }

  &:active,
  &:hover {
    font-weight: 700;
    svg {
      background-color: rgba(74, 86, 226, 0.5);
      filter: drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5));
      path {
        fill: #fff;
        fill-opacity: 1;
      }
    }
  }
`;

export const StyledNavListMob = styled.ul`
  gap: 32px;
  padding: 0;
  display: inline-block;
  max-width: max-content;

  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  list-style: none;
  @media (max-width: 767.9px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

export const ActiveNavLink = styled(StyledNavLink)`
  &.active {
    span {
      font-weight: 700;
    }
    svg {
      background-color: rgba(74, 86, 226, 0.5);
      filter: drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5));
      path {
        fill: #fff;
        fill-opacity: 1;
      }
    }
  }
`;

export const StyledSpan = styled.span`
  display: none;
  @media (min-width: 768px) {
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: var(--white);

    &:hover,
    &:focus {
      font-weight: 700;
    }
  }
`;
