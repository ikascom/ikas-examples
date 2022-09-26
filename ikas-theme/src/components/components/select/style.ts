import styled from "styled-components";
import { FormItemStatus } from "../form/form-item";

type StyledSelectProps = {
  $status: FormItemStatus;
};

export const Select = styled.select<StyledSelectProps>`
  width: 100%;
  min-width: 68px;
  height: 42px;
  padding: 12px 32px 12px 16px;

  color: #000;
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

  border-radius: 12px;

  appearance: none;

  background-size: 16px 16px;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M1 1L7 7L13 1' stroke='%2322252A' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position-x: calc(100% - 16px);
  background-position-y: 50%;
`;
