import React from "react";
import { observer } from "mobx-react-lite";
import { IkasApplicableProductFilterValue } from "@ikas/storefront";

import { FiltersWrapper } from "../components/filters-wrapper";
import { FilterCheckbox } from "../components/filter-checkbox";
import { FiltersProps } from "../index/index";

export const ListFilters = observer(({ filter, lastChild }: FiltersProps) => {
  if (!filter.displayedValues || !filter.displayedValues.length) return null;
  return (
    <FiltersWrapper
      settings={filter.settings}
      title={filter.name}
      noBorder={lastChild}
    >
      {filter.displayedValues.map((value) => (
        <ListFilter
          key={value.id}
          value={value}
          onClick={(value) => filter.onFilterValueClick(value)}
        />
      ))}
    </FiltersWrapper>
  );
});

type ListFilterProps = {
  value: IkasApplicableProductFilterValue;
  onClick: (value: IkasApplicableProductFilterValue) => void;
};

const ListFilter = ({ value, onClick }: ListFilterProps) => {
  return (
    <FilterCheckbox
      checked={value.isSelected}
      onChange={() => onClick(value)}
      label={value.name}
      resultCount={value.resultCount ?? 0}
    />
  );
};

export default observer(ListFilter);
