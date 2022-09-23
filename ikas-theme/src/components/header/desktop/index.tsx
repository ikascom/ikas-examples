import React from "react";
import { observer } from "mobx-react-lite";
import { useStore, useTranslation, Link } from "@ikas/storefront";

import { Container } from "src/components/components/container";
import { HeaderProps } from "src/components/__generated__/types";

import FavoriteSVG from "src/components/svg/favorite";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import LocalizationBar from "../components/localization-bar";

import { NS } from "../";

import * as S from "./style";

function DesktopHeader(props: HeaderProps) {
  return (
    <>
      {props.showLocalization && <LocalizationBar {...props.localization} />}
      <S.Header>
        <Container>
          <S.InnerContainer>
            <LeftSide {...props} />
            <Center {...props} />
            <RightSide {...props} />
          </S.InnerContainer>
        </Container>
      </S.Header>
    </>
  );
}

export default observer(DesktopHeader);

const LeftSide = (props: HeaderProps) => {
  return (
    <S.LeftSide>
      <Link href="/">
        <S.Logo>
          <img src={props.logo.src} />
        </S.Logo>
      </Link>
    </S.LeftSide>
  );
};

const Center = (props: HeaderProps) => {
  return (
    <S.Center>
      <Navigation {...props} />
      <SearchInput {...props} />
    </S.Center>
  );
};

const Navigation = (props: HeaderProps) => {
  return (
    <S.Navigation>
      <S.NavigationList>
        {props.links?.map((link, index) => (
          <S.NavigationListItem key={index}>
            <Link href={link.href} passHref>
              {link.label}
            </Link>
            {!!link.subLinks.length && (
              <S.NavigationItemDropdown>
                <S.NavigationItemDropdownList>
                  {link.subLinks.map((subLink, subIndex) => (
                    <S.NavigationItemDropdownListItem key={subIndex}>
                      <Link href={subLink.href} passHref>
                        {subLink.label}
                      </Link>
                    </S.NavigationItemDropdownListItem>
                  ))}
                </S.NavigationItemDropdownList>
              </S.NavigationItemDropdown>
            )}
          </S.NavigationListItem>
        ))}
      </S.NavigationList>
    </S.Navigation>
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
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <S.RightSide>
      <S.FavoriteWrapper>
        <FavoriteSVG />
      </S.FavoriteWrapper>
      <Link href="/account" passHref>
        <S.AccountWrapper as="a">
          <AccountSVG />
        </S.AccountWrapper>
      </Link>
      <S.CartWrapper>
        <S.CartQuantity>{quantity}</S.CartQuantity>
        <CartSVG />
      </S.CartWrapper>
    </S.RightSide>
  );
});
