import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";

import Checkbox from "src/components/components/checkbox";
import useOnClickOutside from "src/utils/hooks/useOnClickOutside";

import { Props as SelectProps } from "../";

import * as S from "./style";

type Props = {
  value: string[];
} & Pick<SelectProps, "placeholder" | "onChange" | "status" | "options">;

const MultipleSelect = observer(
  ({ placeholder, status, value, options, ...props }: Props) => {
    const customSelectRef = useRef<HTMLDivElement>(null);
    const [showMultipleMenu, setMultipleMenu] = useState(false);
    useOnClickOutside(customSelectRef, () => {
      setMultipleMenu(false);
    });

    return (
      <div ref={customSelectRef}>
        <S.CustomSelect
          as="button"
          $status={status}
          onClick={(event: any) => {
            event.stopPropagation();
            setMultipleMenu((prev) => !prev);
          }}
        >
          {placeholder}
          {`${value.length} value selected`}
        </S.CustomSelect>
        {showMultipleMenu && (
          <S.CustomSelectMenu>
            {options.map((option) => {
              const checked = value.includes(option.value);
              const onChange = () => {
                if (checked) {
                  const newValue = value.filter((id) => id !== option.value);
                  props.onChange && props.onChange(newValue);
                } else {
                  props.onChange && props.onChange([...value, option.value]);
                }
              };
              return (
                <S.CustomSelectMenuOption key={option.value}>
                  <Checkbox checked={checked} onChange={onChange}>
                    {option.label}
                  </Checkbox>
                </S.CustomSelectMenuOption>
              );
            })}
          </S.CustomSelectMenu>
        )}
      </div>
    );
  }
);

export default MultipleSelect;
