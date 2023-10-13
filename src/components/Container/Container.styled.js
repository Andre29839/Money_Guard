import styled from 'styled-components';

export const size = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1280px',
};

export const breakpoints = {
  tablet: `min-width: ${size.tablet}`,
  desktop: `min-width: ${size.desktop}`,
};

const ContainerStyle = styled.div`
  min-width: ${size.mobile};
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  @media screen and (${breakpoints.tablet}) {
    padding: 0 32px;
  }
`;

export default ContainerStyle;
