import React from "react";

import Checkbox from "src/components/components/checkbox";
import * as S from "./style";

type FilterCheckboxProps = {
  checked: boolean;
  label: string;
  resultCount: number;
  onChange: () => void;
};

export const FilterCheckbox = ({
  checked,
  label,
  resultCount,
  onChange,
}: FilterCheckboxProps) => {
  return (
    <Checkbox checked={checked} onChange={onChange}>
      <S.FilterCheckboxLabel $isSelected={checked}>
        {label} ({resultCount})
      </S.FilterCheckboxLabel>
    </Checkbox>
  );
};
