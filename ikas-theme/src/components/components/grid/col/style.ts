import { mediaQuery, point } from "src/styles/breakpoints";
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

type Points = {
  [key in keyof typeof point as `$${key}`]?: Span;
};

type ColumnProps = {
  $span: Span;
  $gutter?: [number, number];
} & Points;

const getColumCSS = (span: Span, gutter?: [number, number]) => {
  const value = 100 / (24 / span);
  const gutterH = gutter?.length ? gutter[0] / 2 : 0;
  return css`
    padding-left: ${gutterH}px;
    padding-right: ${gutterH}px;
    flex: 0 0 ${value}%;
    max-width: ${value}%;
  `;
};

export const Columm = styled.div<ColumnProps>`
  position: relative;
  max-width: 100%;
  min-height: 1px;
  display: block;

  ${(props) => getColumCSS(props.$span, props.$gutter)};
  ${(props) => css`
    ${props.$xxl &&
    css`
      ${mediaQuery.xxl} {
        ${getColumCSS(props.$xxl, props.$gutter)};
      } ;
    `};
    ${props.$xl &&
    css`
      ${mediaQuery.xl} {
        ${getColumCSS(props.$xl, props.$gutter)};
      } ;
    `};
    ${props.$lg &&
    css`
      ${mediaQuery.lg} {
        ${getColumCSS(props.$lg, props.$gutter)};
      } ;
    `};
    ${props.$md &&
    css`
      ${mediaQuery.md} {
        ${getColumCSS(props.$md, props.$gutter)};
      } ;
    `};
    ${props.$sm &&
    css`
      ${mediaQuery.sm} {
        ${getColumCSS(props.$sm, props.$gutter)};
      } ;
    `};
  `};
`;
