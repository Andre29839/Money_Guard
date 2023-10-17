import styled from 'styled-components';

export const FeedbackFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  margin-top: 20px;

  @media (max-width: 767.9px) {
    width: 280px;
  }
`;

export const FeedbackInput = styled.input`
  resize: none;
  transition: all 0.3s ease-in-out;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid var(--transparency-60);
  font-family: Circe;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.33;
  color: var(--white);
  max-width: 100%;
  margin-bottom: 10px;
  width: 280px;
  line-height: 1.33;
  padding-left: 8px;
  height: 30px;

  &::placeholder {
    color: var(--menu-list);
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: var(--white) !important;
  }

  @media (min-width: 768px) {
    min-height: 27px;
    overflow: hidden;
    width: 100%;
  }

  @media (max-width: 767.9px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const FeedbackTextArea = styled.textarea`
  resize: none;
  transition: all 0.3s ease-in-out;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid var(--transparency-60);
  font-family: Circe;
  font-size: 18px;
  font-weight: 400;
  color: #fbfbfb;
  max-width: 100%;
  margin-bottom: 10px;
  width: 280px;
  padding-left: 8px;
  overflow: auto;

  &::placeholder {
    color: var(--menu-list);
  }

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    &-track {
      background: transparent;
    }
    &-thumb {
      background: var(--menu-list);
      &:hover {
        background: var(--menu-list);
      }
    }
  }

  &:hover {
    -webkit-mask-position: left top;
    mask-position: left top;
  }

  @media (min-width: 768px) {
    min-height: 27px;
    width: 100%;
  }

  @media (max-width: 767.9px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const FeedbackButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Heading = styled.h3`
  color: var(--white);
  text-align: center;
  font-size: 30px;
  font-weight: 400;

  @media screen and (max-width: 767.9px) {
    font-size: 24px;
  }
`;
