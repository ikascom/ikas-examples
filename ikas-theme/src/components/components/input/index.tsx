import React from "react";
import { FormItemStatus } from "../form/form-item/";
import * as S from "./style";

export type Props = {
  status?: FormItemStatus;
} & JSX.IntrinsicElements["input"];

function Input(props: Props) {
  const { status, ref, ...restProps } = props;

  return (
    <>
      <S.Input $status={status} {...restProps} />
      {!!restProps.maxLength && typeof restProps.value === "string" && (
        <S.Length>
          {restProps.value?.length || "0"} / {restProps.maxLength}
        </S.Length>
      )}
    </>
  );
}

export default Input;

type DatePickerProps = {
  status: FormItemStatus;
} & JSX.IntrinsicElements["input"];

export function DatePicker({
  ref,
  status,
  type,
  ...restProps
}: DatePickerProps) {
  return <S.DatePicker $status={status} type="date" {...restProps} />;
}
