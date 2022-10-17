import React, { useContext } from "react";
import { RowContext } from "../row";

import * as S from "./style";

type ColumnProps = {
  span: S.Span;
  children: React.ReactNode;
};

const Column = (props: ColumnProps) => {
  const { gutter } = useContext(RowContext);
  return (
    <S.Columm $gutter={gutter} $span={props.span}>
      {props.children}
    </S.Columm>
  );
};

export default Column;
