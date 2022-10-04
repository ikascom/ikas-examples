import styled, { css } from "styled-components";

export const CollapseHeader = styled.summary<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  ${({ $active }) =>
    $active &&
    css`
      margin-bottom: 20px;
    `};
`;

export const CollapseIcon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;
