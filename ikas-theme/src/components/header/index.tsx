import React from "react";
import { observer } from "mobx-react-lite";
import { Image, useTranslation } from "@ikas/storefront";

import { Container } from "../components/container";
import { HeaderProps } from "../__generated__/types";

import FavoriteSVG from "src/components/svg/favorite";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";

import * as S from "./style";

const NS = "header"; // for translations (i18n)

function Header(props: HeaderProps) {
  return (
    <S.Header>
      <Container>
        <S.InnerContainer>
          <LeftSide {...props} />
          <SearchInput {...props} />
          <RightSide {...props} />
        </S.InnerContainer>
      </Container>
    </S.Header>
  );
}

export default observer(Header);

const LeftSide = (props: HeaderProps) => {
  return (
    <S.LeftSide>
      <S.Logo>
        <img src={props.logo.src} />
      </S.Logo>
    </S.LeftSide>
  );
};

const SearchInput = (props: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <S.SearchInputWrapper>
      <S.SearchInput
        type="search"
        placeholder={t(`${NS}:searchInput.placeholder`)}
      />
    </S.SearchInputWrapper>
  );
};

const RightSide = (props: HeaderProps) => {
  return (
    <S.RightSide>
      <S.FavoriteWrapper>
        <FavoriteSVG />
      </S.FavoriteWrapper>
      <S.AccountWrapper>
        <AccountSVG />
      </S.AccountWrapper>
      <S.CartWrapper>
        <CartSVG />
      </S.CartWrapper>
    </S.RightSide>
  );
};
