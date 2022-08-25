import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const QuantityButtonWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  height: 48px;
  min-width: 100px;
  flex-shrink: 0;

  overflow: hidden;

  ${({ theme }) => css`
    background-color: ${theme.color.inputBackground};
    border: 1px solid ${theme.color.inputBorder};
    color: ${theme.color.inputText};
  `};
`;
const QUANTITY_BUTTON_WIDTH = 35; //px
export const QuantityButton = styled.button`
  width: ${QUANTITY_BUTTON_WIDTH}px;
  height: 100%;
  display: inline-block;

  :focus {
    outline: none;
  }

  :hover,
  :focus-visible {
    background-color: ${({ theme }) => theme.color.inputBorder};
  }

  svg {
    width: 100%;
  }
`;

export const DecreaseButton = styled(QuantityButton)``;
export const Quantity = styled.span`
  display: inline-block;
  text-align: center;
  width: calc(100% - ${QUANTITY_BUTTON_WIDTH * 2}px);
`;
export const IncreaseButton = styled(QuantityButton)``;

export const Icon = styled.span`
  margin-left: 8px;
`;
