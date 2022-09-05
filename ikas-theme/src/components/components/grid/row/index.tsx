import type { Context } from "react";
import React, { createContext } from "react";

import * as S from "./style";

type RowProps = {
  /**
   * [horizotanl, vertical]
   * [horizontal+vertical (both)]
   */
  gutter: [number] | [number, number];
  children: React.ReactNode;
};

function Row(props: RowProps) {
  const [gutterH = 0, gutterV = 0] = props.gutter;
  const rowContext = React.useMemo(
    () => ({ gutter: [gutterH, gutterV] as [number, number] }),
    [gutterH, gutterV]
  );

  return (
    <RowContext.Provider value={rowContext}>
      <S.Row $gutter={props.gutter}>{props.children}</S.Row>
    </RowContext.Provider>
  );
}

export default Row;

export interface RowContextState {
  gutter?: [number, number];
}
export const RowContext: Context<RowContextState> = createContext({});
