import React from "react";
import { RowContext } from "../row";

import * as S from "./style";

type ColumnProps = {
  span: S.Span;
  children: React.ReactNode;
};

function Column(props: ColumnProps) {
  const { gutter } = React.useContext(RowContext);
  return (
    <S.Columm $gutter={gutter} $span={props.span}>
      {props.children}
    </S.Columm>
  );
}

export default Column;
