import { Field, Form } from 'formik';
import { IoMdMail, IoMdLock } from 'react-icons/io';
import styled from 'styled-components';
import mobile2x from 'images/register-bg/bg-register-mobile@2x.jpg';

export const WrapperForm = styled.div`
  padding: 96px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 320px) and (max-width: 767.9px) {
    height: 100%;
    width: 100%;
    border-radius: ${({ theme }) => theme.radii.normal};
    box-shadow: ${({ theme }) => theme.shadows.primary};
    background-size: cover;
    background-image: url(${mobile2x});
  }
  @media (min-width: 768px) {
    padding: 80px 62px;
    width: 533px;
  }
  border-radius: ${({ theme }) => theme.radii.normal};
  box-shadow: ${({ theme }) => theme.shadows.primary};

  background: radial-gradient(
    circle,
    rgb(64, 46, 155, 0.95) 5%,
    rgb(76, 50, 113, 0.95) 100%
  );
  backdrop-filter: blur(1px);
`;

export const FormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(10)};
`;

export const WrapperField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FieldStyled = styled(Field)`
  margin-top: 40px;
  padding-left: 40px;
  width: 280px;
  height: ${({ theme }) => theme.spacing(9)};
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0);
  color: rgba(255, 255, 255, 0.6);
  @media (min-width: 768px) {
    width: 409px;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: var(--white) !important;
    right: 0;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

export const EmailIcon = styled(IoMdMail)`
  height: 24px;

  color: rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 8px;
  top: 74%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
`;

export const WrapperIcon = styled.div`
  position: relative;
`;
export const WrapperIcon2 = styled.div`
  position: relative;
`;
export const PasswordlIcon = styled(IoMdLock)`
  height: 24px;
  width: 24px;
  color: rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 8px;
  top: 74%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
`;
export const WrapperIcon3 = styled.div`
  position: relative;
`;

export const PasswordlIconLook = styled.div`
  height: 24px;
  width: 24px;
  color: rgba(255, 255, 255, 0.4);
  position: absolute;
  right: 0;
  top: 63%;
`;
