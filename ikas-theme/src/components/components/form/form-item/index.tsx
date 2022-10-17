import { ValidationStatus } from "@ikas/storefront";
import React from "react";
import * as S from "./style";

export type FormItemStatus = ValidationStatus | "idle" | undefined;

type Props = {
  noMargin?: boolean;
  label?: string;
  help?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  status?: FormItemStatus;
  children: React.ReactNode;
};

const FormItem = (props: Props) => {
  return (
    <S.FormItemWrapper
      style={props.style}
      className={props.className}
      $noMargin={!!props.noMargin}
    >
      <S.LabelChildrenWrapper>
        {!!props.label && <S.LabelWrapper>{props.label}</S.LabelWrapper>}
        {props.children}
      </S.LabelChildrenWrapper>
      {!!props.help && <S.Help $status={props.status}>{props.help}</S.Help>}
    </S.FormItemWrapper>
  );
};

export default FormItem;
