import React from "react";

import * as S from "./style";

type Props = {
  color: string;
  bgColor: string;
  borderColor: string;
  lineColor: string;
  text: string;
  subText: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const SocialLoginButton = (props: Props) => {
  const {
    color,
    bgColor,
    borderColor,
    lineColor,
    text,
    subText,
    icon,
    onClick,
  } = props;

  return (
    <S.Button
      type="button"
      $bgColor={bgColor}
      $color={color}
      $borderColor={borderColor}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <S.Icon>{icon}</S.Icon>
      <S.Line $bgColor={lineColor} />
      <S.Content>
        <S.Text>{text}</S.Text>
        <S.SubText>{subText}</S.SubText>
      </S.Content>
    </S.Button>
  );
};

export default SocialLoginButton;
