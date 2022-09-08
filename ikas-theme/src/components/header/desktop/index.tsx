import React from "react";
import { observer } from "mobx-react-lite";
import { useStore, useTranslation, Link } from "@ikas/storefront";

import { Container } from "src/components/components/container";
import { HeaderProps } from "src/components/__generated__/types";

import FavoriteSVG from "src/components/svg/favorite";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";

import { NS } from "../";

import * as S from "./style";

function DesktopHeader(props: HeaderProps) {
  return (
    <S.Header>
      <Container>
        <S.InnerContainer>
          <LeftSide {...props} />
          <CenterSide {...props} />
          <RightSide {...props} />
        </S.InnerContainer>
      </Container>
    </S.Header>
  );
}

export default observer(DesktopHeader);

const LeftSide = (props: HeaderProps) => {
  return (
    <S.LeftSide>
      <S.Logo>
        <img src={props.logo.src} />
      </S.Logo>
    </S.LeftSide>
  );
};

const CenterSide = (props: HeaderProps) => {
  return (
    <S.CenterSide>
      <Navigation {...props} />
      <SearchInput {...props} />
    </S.CenterSide>
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
