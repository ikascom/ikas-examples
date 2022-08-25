import React from "react";

import LoadingSVG from "src/components/svg/loading";

import * as S from "./style";

interface ButtonProps {
  anchor?: boolean;
  type?: JSX.IntrinsicElements["button"]["type"];
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  if (props.anchor) {
    <S.AnchorButton title={props.title} onClick={props.onClick}>
      {props.loading && <Loading />}
      {props.children}
    </S.AnchorButton>;
  }

  return (
    <S.Button
      type={props.type}
      title={props.title}
      disabled={props.disabled}
      $block={!!props.block}
      onClick={props.onClick}
    >
      {props.loading && <Loading />}
      {props.children}
    </S.Button>
  );
}

export default Button;

export const Loading = () => (
  <S.Loading>
    <LoadingSVG />
  </S.Loading>
);
