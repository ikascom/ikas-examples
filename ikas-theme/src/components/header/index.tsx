import React from "react";
import { observer } from "mobx-react-lite";
import { IkasBaseStore, Image, useTranslation } from "@ikas/storefront";

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

const RightSide = observer((props: HeaderProps) => {
  const store = IkasBaseStore.getInstance();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <S.RightSide>
      <S.FavoriteWrapper>
        <FavoriteSVG />
      </S.FavoriteWrapper>
      <S.AccountWrapper>
        <AccountSVG />
      </S.AccountWrapper>
      <S.CartWrapper>
        <S.CartQuantity>{quantity}</S.CartQuantity>
        <CartSVG />
      </S.CartWrapper>
    </S.RightSide>
  );
});
