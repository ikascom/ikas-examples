import styled, { css } from "styled-components";
import { FormItemStatus } from "../form/form-item";

type StyledTextareaProps = {
  $status: FormItemStatus;
};

export const Textarea = styled.textarea<StyledTextareaProps>`
  border-radius: 12px;
  padding: 8px;
  min-height: 100px;
  resize: vertical;
  width: 100%;

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

  ${({ theme }) => css`
    color: ${theme.color.inputText};
  `};
`;

export const Length = styled.div`
  margin-top: 4px;
  ${({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    color: ${theme.color.secondaryText};
    text-align: right;
  `}
`;
