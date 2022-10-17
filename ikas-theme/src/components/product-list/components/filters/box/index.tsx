import React from "react";
import { observer } from "mobx-react-lite";
import { IkasApplicableProductFilterValue } from "@ikas/storefront";

import { FiltersWrapper } from "src/components/product-list/components/filters/components/filters-wrapper";

import * as S from "./style";
import { FiltersProps } from "../index/index";

export const BoxFilters = observer((props: FiltersProps) => {
  const { filter, lastChild } = props;
  if (!filter.displayedValues || !filter.displayedValues.length) return null;
  return (
    <FiltersWrapper
      settings={filter.settings}
      title={filter.name}
      noBorder={lastChild}
    >
      <S.BoxWrapper>
        {props.filter.displayedValues.map((value) => (
          <BoxFilter
            key={value.id}
            value={value}
            onClick={(value) => {
              props.filter.onFilterValueClick(value);
            }}
          />
        ))}
      </S.BoxWrapper>
    </FiltersWrapper>
  );
});

type BoxFilterProps = {
  value: IkasApplicableProductFilterValue;
  onClick: (value: IkasApplicableProductFilterValue) => void;
};

const BoxFilter = ({ value, onClick }: BoxFilterProps) => {
  return (
    <S.Box
      $disabled={value.resultCount === 0}
      $selected={value.isSelected}
      onClick={() => onClick(value)}
    >
      {value.name}
    </S.Box>
  );
};

export default observer(BoxFilter);
