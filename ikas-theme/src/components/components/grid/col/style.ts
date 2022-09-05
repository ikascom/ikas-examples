import styled, { css } from "styled-components";

export type Span =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

type ColumnProps = {
  $span: Span;
  $gutter?: [number, number];
};

export const Columm = styled.div<ColumnProps>`
  position: relative;
  max-width: 100%;
  min-height: 1px;
  display: block;

  ${({ $span, $gutter }) => {
    const value = 100 / (24 / $span);
    const gutterH = $gutter?.length ? $gutter[0] / 2 : 0;
    return css`
      padding-left: ${gutterH}px;
      padding-right: ${gutterH}px;
      flex: 0 0 ${value}%;
      max-width: ${value}%;
    `;
  }};
`;
