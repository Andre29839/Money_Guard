import ContainerStyle from './Container.styled';

const Container = ({ children, size }) => {
  return <ContainerStyle size={size}>{children}</ContainerStyle>;
};

export default Container;
