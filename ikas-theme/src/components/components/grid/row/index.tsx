import React, { createContext, useMemo } from "react";
import type { Context } from "react";

import * as S from "./style";

type RowProps = {
  /**
   * [horizotanl, vertical]
   * [horizontal+vertical (both)]
   */
  gutter?: number | [number] | [number, number];
  children: React.ReactNode;
};

function Row(props: RowProps) {
  const gutter: [number, number] | [number] = Array.isArray(props.gutter)
    ? props.gutter || [0, 0]
    : [props.gutter || 0, props.gutter || 0];
  const [gutterH = 0, gutterV = 0] = gutter;
  const rowContext = useMemo(
    () => ({ gutter: [gutterH, gutterV] as [number, number] }),
    [gutterH, gutterV]
  );

  return (
    <RowContext.Provider value={rowContext}>
      <S.Row $gutter={gutter}>{props.children}</S.Row>
    </RowContext.Provider>
  );
}

export default Row;

export interface RowContextState {
  gutter?: [number, number];
}
export const RowContext: Context<RowContextState> = createContext({});
