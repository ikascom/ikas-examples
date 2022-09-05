import React from "react";
import * as S from "./style";

export type FormItemStatus = "error" | "success" | "idle" | undefined;

type Props = {
  label?: string;
  help?: React.ReactNode;
  status?: FormItemStatus;
  children: React.ReactNode;
};

function FormItem(props: Props) {
  return (
    <S.FormItemWrapper>
      <S.LabelChildrenWrapper>
        {!!props.label && <S.LabelWrapper>{props.label}</S.LabelWrapper>}
        {props.children}
      </S.LabelChildrenWrapper>
      {!!props.help && <S.Help $status={props.status}>{props.help}</S.Help>}
    </S.FormItemWrapper>
  );
}

export default FormItem;
