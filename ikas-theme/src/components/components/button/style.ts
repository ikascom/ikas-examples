import styled, { css } from "styled-components";
import { ButtonSize } from ".";

type ButtonProps = { $block?: boolean; $size: ButtonSize };

export const Button = styled.button<ButtonProps>`
  text-align: center;
  font-weight: 500;
  background-color: ${({ theme }) => theme.color.buttonBg};
  color: ${({ theme }) => theme.color.button};
  display: inline-flex;
  align-items: center;
  justify-content: center;

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

  :hover {
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
