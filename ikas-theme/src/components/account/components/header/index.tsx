import React from "react";
import * as S from "./style";

type HeaderProps = {
  title: string;
  rightChild?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ title, rightChild }) => {
  return (
    <S.Header>
      <S.HeaderTitle>{title}</S.HeaderTitle>
      {rightChild && rightChild}
    </S.Header>
  );
};

export default Header;
