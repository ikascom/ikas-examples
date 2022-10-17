import styled, { css } from "styled-components";
import { FormItemStatus } from "../form/form-item";

type WrapperProps = {
  $status: FormItemStatus;
};

export const Wrapper = styled.label<WrapperProps>`
  position: relative;
  display: flex;
  align-items: center;

  ${({ $status, theme }) =>
    $status === "error" &&
    css`
      color: ${theme.color.red};
    `};
`;

export const CustomCheckboxInnerWrapper = styled.span<{ $mr: boolean }>`
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.color.inputText};
  ${({ $mr }) => $mr && `margin-right: 8px;`}
`;

type CustomCheckboxProps = {
  $status: FormItemStatus;
};

export const CustomCheckbox = styled.span<CustomCheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 2px;
  color: ${({ theme }) => theme.color.checkbox};
  border: 1px solid ${({ theme }) => theme.color.checkboxBorder};
  background-color: ${({ theme }) => theme.color.checkboxBg};

  ${({ $status, theme }) =>
    $status === "error" &&
    css`
      color: ${theme.color.red};
      border-color: ${theme.color.red};
    `};

  border-radius: 2px;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  :hover + span,
  :focus-within + span {
    box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
    border-radius: 2px;
  }
`;
