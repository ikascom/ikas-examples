import React from "react";
import { observer } from "mobx-react-lite";

import { FiltersMainTitle } from "../components/filters/components/filters-main-title";
import { Categories } from "../components/categories";
import { Filters } from "../components/filters/index/index";

import { ProductListProps } from "..";

import * as S from "./style";

const Left = (props: ProductListProps) => {
  return (
    <S.Left>
      <FiltersMainTitle {...props} />
      <Categories {...props} />
      <Filters {...props} />
    </S.Left>
  );
};
export default observer(Left);
