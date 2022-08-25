import React from "react";
import * as S from "./style";

type Props = {
  checked?: boolean;
  children?: React.ReactNode;
  onChange: (checked: boolean) => void;
};

function Checkbox(props: Props) {
  return (
    <S.Wrapper>
      <S.HiddenCheckbox
        type="checkbox"
        className="visually-hidden"
        checked={!!props.checked}
        onChange={(event) => props.onChange(!!event.target.checked)}
      />
      <S.CustomCheckboxInnerWrapper>
        <S.CustomCheckbox>{!!props.checked && <CheckSVG />}</S.CustomCheckbox>
      </S.CustomCheckboxInnerWrapper>
      {!!props.children && props.children}
    </S.Wrapper>
  );
}

export default Checkbox;

const CheckSVG = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 12 16"
    height="18"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"
    ></path>
  </svg>
);
