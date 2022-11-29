import React, { useContext } from "react";
import { RowContext } from "../row";
import { point } from "src/styles/breakpoints";

import * as S from "./style";

type Points = {
  [key in keyof typeof point]?: S.Span;
};

export type ColumnProps = {
  span: S.Span;
  children: React.ReactNode;
} & Points;

const Column = (props: ColumnProps) => {
  const { gutter } = useContext(RowContext);
  console.log(props);
  return (
    <S.Columm
      $gutter={gutter}
      $span={props.span}
      $sm={props.sm}
      $md={props.md}
      $lg={props.lg}
      $xl={props.xl}
      $xxl={props.xxl}
    >
      {props.children}
    </S.Columm>
  );
};

export default Column;
