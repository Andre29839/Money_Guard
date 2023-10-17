import { ButtonStyled } from './Button.styled';

const Button = ({
  onClick = null,
  text,
  type = 'button',
  variant = 'primary',
  disabled,
}) => {
  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
    >
      {text}
    </ButtonStyled>
  );
};
export default Button;
