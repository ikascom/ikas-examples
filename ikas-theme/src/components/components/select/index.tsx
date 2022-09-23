import React from "react";

import { FormItemStatus } from "../form/form-item";
import MultipleSelect from "./multiple-select";

import * as S from "./style";

type Option = {
  value: string;
  label: string;
};

export type SingleSelectOnChangeParamType = Option["value"];
export type MultipleSelectOnChangeParamType = Option["value"][];
export type SelectOnChangeParamType =
  | SingleSelectOnChangeParamType
  | MultipleSelectOnChangeParamType;

export type Props = {
  name?: string;
  multiple?: JSX.IntrinsicElements["select"]["multiple"];
  value?: JSX.IntrinsicElements["select"]["value"];
  status?: FormItemStatus;
  placeholder?: string;
  options: Option[];
  onChange: (value: SelectOnChangeParamType) => void;
};

function Select(props: Props) {
  const { placeholder, options } = props;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange && props.onChange(event.target.value);
  };

  if (props.multiple) {
    if (!Array.isArray(props.value))
      throw Error("MultipleSelect Value must Array");
    return (
      <MultipleSelect
        placeholder={props.placeholder}
        options={props.options}
        status={props.status}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }

  return (
    <S.Select
      $status={props.status}
      name={props.name}
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
