import React from "react";
import { FormItemStatus } from "../form/form-item";
import * as S from "./style";

type Props = {
  checked?: boolean;
  status?: FormItemStatus;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
};

const Checkbox = (props: Props) => {
  return (
    <S.Wrapper $status={props.status}>
      <S.HiddenCheckbox
        type="checkbox"
        className="visually-hidden"
        checked={!!props.checked}
        onChange={(event) =>
          props.onChange && props.onChange(!!event.target.checked)
        }
      />
      <S.CustomCheckboxInnerWrapper $mr={!!props.children}>
        <S.CustomCheckbox $status={props.status}>
          {!!props.checked && <CheckSVG />}
        </S.CustomCheckbox>
      </S.CustomCheckboxInnerWrapper>
      {!!props.children && props.children}
    </S.Wrapper>
  );
};

export default Checkbox;

const CheckSVG = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 4.42857L4.36842 7L9 1"
      stroke="#22252A"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
