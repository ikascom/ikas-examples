import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { IkasNavigationLink, Link, useStore } from "@ikas/storefront";

import UIStore from "src/store/ui-store";

import { HeaderProps } from "src/components/__generated__/types";
import FavoriteSVG from "src/components/svg/favorite";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import LocalizationBar from "../components/localization-bar";
import { SearchInput } from "src/components/header/desktop";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";

import IOMenuSVG from "./svg/io-menu";
import IOCloseSVG from "./svg/io-close";

import * as S from "./style";

function MobileHeader(props: HeaderProps) {
  return (
    <>
      {props.showLocalization && <LocalizationBar {...props.localization} />}
      <S.Header>
        <S.Row>
          <LeftSide {...props} />
          <RightSide {...props} />
        </S.Row>
        <SearchInput {...props} />
        <Sidenav {...props} />
      </S.Header>
      <MaxQuantityPerCartModal />
    </>
  );
}

export default observer(MobileHeader);

const LeftSide = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  return (
    <S.LeftSide>
      <S.SidenavButton onClick={uiStore.toggleSidenav}>
        <IOMenuSVG />
      </S.SidenavButton>
      <Link passHref href="/">
        <a>
          <S.Logo>
            <img src={props.logo.src} />
          </S.Logo>
        </a>
      </Link>
    </S.LeftSide>
  );
});

const Sidenav = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  return (
    <>
      {uiStore.sidenavVisible && (
        <S.SidenavOverlay onClick={() => uiStore.toggleSidenav()} />
      )}
      <S.Sidenav $visible={uiStore.sidenavVisible}>
        <S.SidenavHeader>
          <S.SidenavCloseButton onClick={uiStore.toggleSidenav}>
            <IOCloseSVG />
          </S.SidenavCloseButton>
        </S.SidenavHeader>
        <Navigation {...props} />
      </S.Sidenav>
    </>
  );
});

const Navigation = (props: HeaderProps) => {
  return (
    <S.Navigation>
      <S.NavigationList>
        {props.links?.map((link, index) => (
          <NavigationListItem key={index} link={link} />
        ))}
      </S.NavigationList>
    </S.Navigation>
  );
};

const NavigationListItem = ({ link }: { link: IkasNavigationLink }) => {
  const [showSubLinks, setSubLinks] = useState(false);

  return (
    <S.NavigationListItem>
      <S.NavigationListItemTitle>
        <Link href={link.href} passHref>
          {link.label}
        </Link>
        {!!link.subLinks.length && (
          <S.NavigationListItemChildButton
            onClick={() => setSubLinks((prev) => !prev)}
          >
            {showSubLinks ? "-" : "+"}
          </S.NavigationListItemChildButton>
        )}
      </S.NavigationListItemTitle>
      {!!link.subLinks.length && showSubLinks && (
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
  );
};

const RightSide = observer((props: HeaderProps) => {
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <S.RightSide>
      <Link href="/account/favorite-products" passHref>
        <S.FavoriteWrapper as="a">
          <FavoriteSVG />
        </S.FavoriteWrapper>
      </Link>
      <Link href="/account" passHref>
        <S.AccountWrapper as="a">
          <AccountSVG />
        </S.AccountWrapper>
      </Link>
      <Link href="/cart" passHref>
        <S.CartWrapper as="a">
          <S.CartQuantity>{quantity}</S.CartQuantity>
          <CartSVG />
        </S.CartWrapper>
      </Link>
    </S.RightSide>
  );
});
