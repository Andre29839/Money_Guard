import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: transparent;
  color: var(--white);
  border: 1px solid;
  border-radius: 10px;
  text-align: center;
  margin-right: 8px;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  pointer-events: ${props => (props.disabled ? 'none' : null)};
  transition: scale 100ms ease-in-out;
  &:disabled {
    color: var(--transparency-60);
    scale: 0.8;
  }
`;
