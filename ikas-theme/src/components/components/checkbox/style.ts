import styled from "styled-components";

export const Wrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

export const CustomCheckboxInnerWrapper = styled.span`
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.color.inputText};
`;

export const CustomCheckbox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  background-color: ${({ theme }) => theme.color.inputBackground};
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  :hover + span,
  :focus-within + span {
    box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
  }
`;
