import styled, { css } from "styled-components";

type RowProps = {
  $gutter?: [number] | [number, number];
  $align: React.CSSProperties["alignItems"];
};

export const Row = styled.div<RowProps>`
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
  align-items: ${({ $align }) => $align};

  ${({ $gutter }) => {
    let vertical = 0;
    let horizontal = 0;

    if ($gutter?.length === 1) {
      vertical = $gutter[0];
      horizontal = -$gutter[0];
    }

    if ($gutter?.length === 2) {
      horizontal = -$gutter[0];
      vertical = $gutter[1];
    }

    return css`
      margin-left: ${horizontal / 2}px;
      margin-right: ${horizontal / 2}px;
      /* row-gap: ${vertical}px; */
    `;
  }}
`;
