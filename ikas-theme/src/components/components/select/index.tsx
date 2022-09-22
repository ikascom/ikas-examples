import React from "react";
import { FormItemStatus } from "../form/form-item";

import * as S from "./style";

type Option = {
  value: string;
  label: string;
};

export type SelectOnChangeParamType = Option["value"];

type Props = {
  value?: JSX.IntrinsicElements["select"]["value"];
  placeholder?: string;
  status?: FormItemStatus;
  options: Option[];
  multiple?: JSX.IntrinsicElements["select"]["multiple"];
  onChange?: (value: SelectOnChangeParamType) => void;
};

function Select(props: Props) {
  const { placeholder, options } = props;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange && props.onChange(event.target.value);
  };

  return (
    <S.Select
      multiple={!!props.multiple}
      $status={props.status}
      value={props.value}
      onChange={onChange}
    >
      {!!placeholder && (
        <option disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          aria-selected={props.value === option.value}
        >
          {option.label}
        </option>
      ))}
    </S.Select>
  );
}

export default Select;
