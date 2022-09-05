import styled, { css } from "styled-components";
import { FormItemStatus } from "../form/form-item";

type StyledInputProps = {
  $status: FormItemStatus;
};

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  height: 52px;
  padding: 0 8px;

  background-color: ${({ theme, $status }) => {
    if ($status === "error") {
      return theme.color.red + "25";
    }
    return theme.color.inputBackground;
  }};

  border: 1px solid
    ${({ theme, $status }) => {
      if ($status === "error") {
        return theme.color.red;
      }

      return theme.color.inputBorder;
    }};

  ${({ theme }) => {
    return css`
      color: ${theme.color.inputText};
      font-size: ${theme.fontSize.sm};
      border-radius: ${theme.inputBorderRadius};
    `;
  }};
`;

export const Length = styled.div`
  margin-top: 4px;
  ${({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    color: ${theme.color.secondaryText};
    text-align: right;
  `}
`;

export const DatePicker = styled.input<StyledInputProps>`
  padding: 0 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-radius: ${({ theme }) => theme.inputBorderRadius};

  width: 100%;
  height: 42px;

  background-color: ${({ theme, $status }) => {
    if ($status === "error") {
      return theme.color.red + "25";
    }
    return theme.color.inputBackground;
  }};

  border: 1px solid
    ${({ theme, $status }) => {
      if ($status === "error") {
        return theme.color.red;
      }

      return theme.color.inputBorder;
    }};

  :disabled {
    background-color: ${({ theme }) => theme.color.inputBorder};
  }
`;
