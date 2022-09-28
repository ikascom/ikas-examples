import styled, { css } from "styled-components";
import { ButtonSize, ButtonType } from ".";

type ButtonProps = {
  $block?: boolean;
  $size: ButtonSize;
  $buttonType: ButtonType;
};

export const Button = styled.button<ButtonProps>`
  text-align: center;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $buttonType, theme }) => {
    if ($buttonType === "primary") {
      return css`
        color: ${theme.color.button};
        background-color: ${theme.color.buttonBg};
        border: 1px solid ${theme.color.buttonBg};
      `;
    }

    return css`
      color: ${theme.color.secondaryButton};
      background-color: ${theme.color.secondaryButtonBg};
      border: 1px solid ${theme.color.secondaryButton};
      transition-property: color, background-color, border;
      transition-timing-function: ease-in-out;
      transition-duration: 300ms;

      :hover,
      :focus {
        color: ${theme.color.secondaryButtonBg};
        background-color: ${theme.color.secondaryButton};
        border: 1px solid ${theme.color.secondaryButtonBg};
      }
    `;
  }}

  ${({ $size }) => {
    if ($size === "small") {
      return css`
        font-size: 12px;
        line-height: 16px;
      `;
    }

    if ($size === "middle") {
      return css`
        font-size: 16px;
        line-height: 28px;
      `;
    }

    if ($size === "large") {
      return css`
        font-size: 18px;
        line-height: 30px;
      `;
    }
  }}

  ${({ $block }) => $block && `width: 100%;`};

  padding: 10px 24px;
  border-radius: 12px;

  :hover,
  :focus {
    opacity: 0.9;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const AnchorButton = Button.withComponent("a");

export const Loading = styled.span`
  display: inline-block;
  margin-right: 8px;
`;
