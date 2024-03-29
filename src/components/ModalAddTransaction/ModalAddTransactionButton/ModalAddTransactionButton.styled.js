import styled from 'styled-components';

export const CommonBtnStyles = styled.button`
  color: var(--total-white);
  text-align: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  cursor: pointer;
`;

export const AddBtn = styled(CommonBtnStyles)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--button-gradient);
  box-shadow: 1px 9px 15px 0px var(--transparency-20);
  svg {
    width: 28px;
    height: 28px;
  }
  &:focus,
  &:hover {
    border-radius: 50%;
    border: 2px solid yellow;
    transform: scale(1.01);
    box-shadow: 1px 5px 8px 0px rgba(0, 0, 0, 0.5);
  }
`;

export const BtnRightCorner = styled.div`
  position: absolute;

  @media screen and (max-width: 767.9px) {
    right: 0;
    bottom: 20px;
    position: fixed;
  }

  @media screen and (min-width: 768px) {
    right: 12px;
    bottom: 40px;
  }
`;

export const EditBtn = styled(CommonBtnStyles)`
  color: var(--grey);
  background: none;
  padding: 0;
`;
