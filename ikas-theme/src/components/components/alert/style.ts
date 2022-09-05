import styled, { css } from "styled-components";

import { FormAlertType } from ".";

type AlertProps = {
  $status: FormAlertType["status"];
};

export const AlertWrapper = styled.div<AlertProps>`
  position: relative;
  width: 100%;
  padding: 16px;
  padding-right: 20px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 8px;

  ${({ $status, theme }) => {
    if ($status === "error") {
      return css`
        background-color: ${theme.color.red}10;
        border-color: ${theme.color.red};
        color: ${theme.color.red};
      `;
    }

    if ($status === "info") {
      return css`
        background-color: ${theme.color.primaryText}10;
        border-color: ${theme.color.primaryText};
        color: ${theme.color.primaryText};
      `;
    }

    if ($status === "success") {
      return css`
        background-color: ${theme.color.green}10;
        border-color: ${theme.color.green};
        color: ${theme.color.green};
      `;
    }
  }}
`;

export const AlertTitle = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
`;

export const AlertText = styled.div``;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
`;
