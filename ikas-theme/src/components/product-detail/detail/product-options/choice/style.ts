// Option Box

import styled, { css } from "styled-components";

export const OptionBox = styled.button<{
  $selected: boolean;
}>`
  padding: 7px 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border-radius: 12px;
  background-color: #fff;
  font-weight: 500;
  margin-bottom: 20px;

  font-size: ${({ theme }) => theme.fontSize.sm};
  ${({ theme, $selected }) => css`
    color: ${theme.color.primaryText};
    border: 2px solid
      ${$selected ? theme.color.primaryText : theme.color.border};
  `};

  :focus {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.border};
  }
`;

export const OptionBoxPrice = styled.span`
  color: ${({ theme }) => theme.color.secondaryText};
  margin-left: 4px;
`;
