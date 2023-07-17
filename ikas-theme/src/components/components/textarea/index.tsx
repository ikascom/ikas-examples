import React from "react";
import { FormItemStatus } from "../form/form-item";
import * as S from "./style";

type Props = {
  status?: FormItemStatus;
} & JSX.IntrinsicElements["textarea"];

const Textarea = (props: Props) => {
  const { status, ref, ...restProps } = props;

  return (
    <>
      <S.Textarea $status={status} {...restProps}></S.Textarea>
      {!!restProps.maxLength && typeof restProps.value === "string" && (
        <S.Length>
          {restProps.value?.length || "0"} / {restProps.maxLength}
        </S.Length>
      )}
    </>
  );
};

export default Textarea;
